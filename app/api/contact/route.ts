import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, services, message, website } = body;

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

    // Basic sanitization
    const sanitize = (str: string) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safePhone = phone ? sanitize(phone) : "Not provided";
    const safeServices = services && services.length > 0 ? services.join(", ") : "None";
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
      subject: `New Contact Form Submission from ${safeName}`,
      text: `
New Contact Form Submission

Name: ${safeName}
Email: ${safeEmail}
Phone: ${safePhone}
Services: ${safeServices}

Message:
${safeMessage}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully.' },
      { status: 200 }
    );
  } catch (error: any) {
    // Only log explicit failure details to server console to avoid exposing SMTP to the client
    console.error("SMTP ERROR:", {
      message: error.message,
      code: error.code,
      response: error.response,
      command: error.command
    });

    // Provide a generic, graceful error to the frontend
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
