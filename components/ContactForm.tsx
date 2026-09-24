"use client";

import { useState, useEffect, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { CAPABILITIES } from "@/lib/capabilities";
import { COUNTRIES } from "@/lib/countries";

const PRODUCT_OPTIONS = [...PRODUCTS.map((p) => p.name), "Not sure yet"];
const SERVICE_OPTIONS = [...CAPABILITIES.map((c) => c.title), "Something else"];

const FIELD_CLASS =
    "w-full rounded-control border border-line-2 bg-panel px-4 py-3.5 text-[15px] text-text placeholder:text-faint transition-colors focus:border-accent focus:outline-none disabled:opacity-50";

function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-dim">
            {children}
        </span>
    );
}

function StepHeading({
    number,
    title,
    note,
}: {
    number: string;
    title: string;
    note?: string;
}) {
    return (
        <div className="flex flex-wrap items-baseline gap-3">
            <span className="font-mono text-[11px] text-accent">{number}</span>
            <h2 className="text-xl">{title}</h2>
            {note ? (
                <span className="font-mono text-[11px] text-dim">{note}</span>
            ) : null}
        </div>
    );
}

/** Chip toggle used for both the product and the work-type pickers. */
function Chip({
    label,
    selected,
    disabled,
    onClick,
}: {
    label: string;
    selected: boolean;
    disabled: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            aria-pressed={selected}
            disabled={disabled}
            onClick={onClick}
            className={`rounded-control border px-4 py-3 text-[14.5px] transition-colors disabled:opacity-50 ${
                selected
                    ? "border-accent bg-accent text-on-accent"
                    : "border-line-2 bg-panel text-text hover:border-line-3"
            }`}
        >
            {label}
        </button>
    );
}

export default function ContactForm() {
    const searchParams = useSearchParams();

    const [product, setProduct] = useState<string | null>(null);
    const [services, setServices] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        country: "",
        message: "",
        timeline: "",
        budget: "",
        website: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
        "idle"
    );
    const [errorMessage, setErrorMessage] = useState("");

    // A visitor arriving from a product page's CTA lands with that product
    // already selected, so the referral signal is not lost.
    useEffect(() => {
        const slug = searchParams.get("product");
        const match = PRODUCTS.find((p) => p.slug === slug);
        if (match) setProduct(match.name);
    }, [searchParams]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const toggleService = (service: string) => {
        setServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (status === "loading") return;
        setStatus("loading");
        setErrorMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, product, services }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong");

            setStatus("success");
            setFormData({
                name: "",
                email: "",
                company: "",
                country: "",
                message: "",
                timeline: "",
                budget: "",
                website: "",
            });
            setProduct(null);
            setServices([]);
        } catch (error) {
            setStatus("error");
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Failed to send message. Please try again."
            );
        }
    };

    const busy = status === "loading";

    return (
        <form onSubmit={handleSubmit} className="flex max-w-[760px] flex-col gap-10">
            {/* Spam honeypot: hidden from people, tempting to bots. */}
            <input
                type="text"
                id="website"
                value={formData.website}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
            />

            {/* 01 — Who you are */}
            <fieldset className="m-0 flex flex-col gap-4 border-0 p-0">
                <StepHeading number="01" title="Who you are" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                        <FieldLabel>Name *</FieldLabel>
                        <input
                            type="text"
                            id="name"
                            required
                            maxLength={100}
                            value={formData.name}
                            onChange={handleChange}
                            disabled={busy}
                            placeholder="Your name"
                            className={FIELD_CLASS}
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <FieldLabel>Email *</FieldLabel>
                        <input
                            type="email"
                            id="email"
                            required
                            maxLength={254}
                            value={formData.email}
                            onChange={handleChange}
                            disabled={busy}
                            placeholder="you@company.com"
                            className={FIELD_CLASS}
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <FieldLabel>Company</FieldLabel>
                        <input
                            type="text"
                            id="company"
                            maxLength={120}
                            value={formData.company}
                            onChange={handleChange}
                            disabled={busy}
                            placeholder="Optional"
                            className={FIELD_CLASS}
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <FieldLabel>Country</FieldLabel>
                        <select
                            id="country"
                            value={formData.country}
                            onChange={handleChange}
                            disabled={busy}
                            className={`${FIELD_CLASS} appearance-none`}
                        >
                            <option value="">Select a country</option>
                            {COUNTRIES.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </fieldset>

            {/* 02 — Product interest */}
            <fieldset className="m-0 flex flex-col gap-4 border-0 p-0">
                <StepHeading
                    number="02"
                    title="Interested in one of our products?"
                    note="optional"
                />
                <div className="flex flex-wrap gap-2.5">
                    {PRODUCT_OPTIONS.map((label) => (
                        <Chip
                            key={label}
                            label={label}
                            selected={product === label}
                            disabled={busy}
                            onClick={() =>
                                setProduct((current) =>
                                    current === label ? null : label
                                )
                            }
                        />
                    ))}
                </div>
            </fieldset>

            {/* 03 — Work type */}
            <fieldset className="m-0 flex flex-col gap-4 border-0 p-0">
                <StepHeading
                    number="03"
                    title="What kind of work do you need?"
                    note="optional · pick any"
                />
                <div className="flex flex-wrap gap-2.5">
                    {SERVICE_OPTIONS.map((label) => (
                        <Chip
                            key={label}
                            label={label}
                            selected={services.includes(label)}
                            disabled={busy}
                            onClick={() => toggleService(label)}
                        />
                    ))}
                </div>
            </fieldset>

            {/* 04 — The project */}
            <fieldset className="m-0 flex flex-col gap-4 border-0 p-0">
                <StepHeading number="04" title="Tell us about the project" />
                <p className="max-w-[60ch] text-[14.5px] leading-relaxed text-dim">
                    What the system needs to do, what exists today, where the data
                    lives, and any deadline you&apos;re working to. Rough notes are fine.
                </p>
                <label className="flex flex-col gap-2">
                    <span className="sr-only">Project details</span>
                    <textarea
                        id="message"
                        required
                        rows={7}
                        maxLength={5000}
                        value={formData.message}
                        onChange={handleChange}
                        disabled={busy}
                        placeholder="We run 40 trucks and everything sits in spreadsheets and WhatsApp…"
                        className={`${FIELD_CLASS} resize-y leading-relaxed`}
                    />
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                        <FieldLabel>Timeline</FieldLabel>
                        <input
                            type="text"
                            id="timeline"
                            maxLength={120}
                            value={formData.timeline}
                            onChange={handleChange}
                            disabled={busy}
                            placeholder="Optional, e.g. live by January"
                            className={FIELD_CLASS}
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <FieldLabel>Budget range</FieldLabel>
                        <input
                            type="text"
                            id="budget"
                            maxLength={120}
                            value={formData.budget}
                            onChange={handleChange}
                            disabled={busy}
                            placeholder="Optional"
                            className={FIELD_CLASS}
                        />
                    </label>
                </div>
            </fieldset>

            {status === "success" ? (
                <p
                    role="status"
                    className="border border-accent/40 bg-accent/10 px-4 py-3.5 font-mono text-[12.5px] text-accent"
                >
                    Thanks — we reply within one business day.
                </p>
            ) : null}

            {status === "error" ? (
                <p
                    role="alert"
                    className="border border-red-500/30 bg-red-500/10 px-4 py-3.5 text-sm text-red-300"
                >
                    {errorMessage}
                </p>
            ) : null}

            <div className="flex items-center gap-5 pt-1">
                <button
                    type="submit"
                    disabled={busy}
                    className="rounded-control bg-accent px-8 py-4 text-[15px] font-medium text-on-accent transition-colors hover:bg-accent-hi disabled:opacity-60"
                >
                    {busy ? "Sending…" : "Send it over"}
                </button>
            </div>
        </form>
    );
}
