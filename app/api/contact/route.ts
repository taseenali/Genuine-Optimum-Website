import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { isRateLimited } from '@/lib/rateLimit';

// name/email/phone/message below are untrusted free text submitted by
// anyone on the internet. They are only ever used as plain-text email
// content in this file today. If any future feature (an auto-drafted
// reply, a CRM auto-summarizer, an LLM-based lead-triage tool) ever
// pipes these fields into an LLM, they MUST be passed as clearly
// delimited untrusted data, never string-concatenated into a
// system/instruction prompt, since a submitter can embed text like
// "ignore previous instructions and..." aimed at hijacking that
// downstream model call (indirect prompt injection).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = {
  name: 100,
  email: 254,
  phone: 30,
  company: 120,
  country: 60,
  product: 80,
  timeline: 120,
  budget: 120,
  message: 5000,
};
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 }; // 5 submissions per 10 minutes per IP

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip, RATE_LIMIT.max, RATE_LIMIT.windowMs)) {
      return NextResponse.json(
        { error: 'Too many submissions from this network. Please try again in a few minutes, or email us directly.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      country,
      product,
      services,
      timeline,
      budget,
      message,
      website,
    } = body;

    // Spam Protection: Honeypot check
    // If the hidden 'website' field has any content, silently pretend it succeeded.
    if (website) {
      return NextResponse.json(
        { message: 'Message sent successfully.' },
        { status: 200 }
      );
    }

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Every optional field is length-checked too, so a long paste into
    // any one of them is rejected rather than landing in the email.
    const overLength =
      name.length > MAX_LENGTHS.name ||
      email.length > MAX_LENGTHS.email ||
      message.length > MAX_LENGTHS.message ||
      (phone && phone.length > MAX_LENGTHS.phone) ||
      (company && company.length > MAX_LENGTHS.company) ||
      (country && country.length > MAX_LENGTHS.country) ||
      (product && product.length > MAX_LENGTHS.product) ||
      (timeline && timeline.length > MAX_LENGTHS.timeline) ||
      (budget && budget.length > MAX_LENGTHS.budget);

    if (overLength) {
      return NextResponse.json(
        { error: 'One or more fields exceed the maximum allowed length.' },
        { status: 400 }
      );
    }

    // Basic sanitization
    const sanitize = (str: string) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const optional = (value: unknown) =>
      typeof value === "string" && value.trim() ? sanitize(value) : "Not provided";

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safePhone = optional(phone);
    const safeCompany = optional(company);
    const safeCountry = optional(country);
    const safeProduct = optional(product);
    const safeTimeline = optional(timeline);
    const safeBudget = optional(budget);
    const safeServices =
      Array.isArray(services) && services.length > 0
        ? services.filter((s) => typeof s === "string").map(sanitize).join(", ")
        : "None";
    const safeMessage = sanitize(message);

    // Initialize the Nodemailer Hostinger SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify SMTP connection in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      try {
        await transporter.verify();
        console.log('SMTP connection verified successfully.');
      } catch (verifyError) {
        console.error('SMTP Verification failed:', verifyError);
        // We log the error but we won't crash the request yet, let sendMail attempt
      }
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to the admin
      replyTo: safeEmail,         // Set reply address to the sender
      subject: `New enquiry from ${safeName}${safeProduct !== "Not provided" ? ` — ${safeProduct}` : ""}`,
      text: `
New Contact Form Submission

CONTACT
Name:     ${safeName}
Email:    ${safeEmail}
Phone:    ${safePhone}
Company:  ${safeCompany}
Country:  ${safeCountry}

INTEREST
Product:  ${safeProduct}
Services: ${safeServices}
Timeline: ${safeTimeline}
Budget:   ${safeBudget}

PROJECT
${safeMessage}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    const smtpError = error as { message?: string; code?: string; response?: string; command?: string };
    // Only log explicit failure details to server console to avoid exposing SMTP to the client
    console.error("SMTP ERROR:", {
      message: smtpError.message,
      code: smtpError.code,
      response: smtpError.response,
      command: smtpError.command
    });

    // A failed send would otherwise only show up in server logs, silently
    // losing the lead. If configured, mirror the failure to a webhook
    // (Slack incoming webhook or Discord webhook both accept this payload
    // shape) so the founder gets a real-time alert instead of relying on
    // periodic log-checking.
    await notifyDeliveryFailure(smtpError);

    // Provide a generic, graceful error to the frontend
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}

async function notifyDeliveryFailure(smtpError: { message?: string; code?: string }) {
  const webhookUrl = process.env.ALERT_WEBHOOK_URL;
  if (!webhookUrl) return;

  const text = `Genuine Optimum contact form: a lead's email failed to send. ${smtpError.code ?? ""} ${smtpError.message ?? ""}`.trim();

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Slack expects `text`, Discord expects `content`. Sending both
      // keys works for either provider without needing to know which one
      // is configured.
      body: JSON.stringify({ text, content: text }),
    });
  } catch (webhookError) {
    console.error("ALERT WEBHOOK ERROR:", webhookError);
  }
}
