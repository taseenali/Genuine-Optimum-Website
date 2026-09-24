/**
 * The three products Genuine Optimum owns and runs.
 *
 * This is the single source for the nav dropdown, the home page
 * list, the footer, each product page, and the contact form's
 * product chips, so adding a fourth product means editing this
 * file and nothing else.
 */

export interface ProductSection {
    /** Mono kicker above the section heading. */
    eyebrow: string;
    heading: string;
    /** Optional lead paragraph under the heading. */
    intro?: string;
}

export interface ProductFeature {
    title: string;
    description: string;
}

export interface ProductStep {
    /** Left-hand marker: "01", or a phase label like "WEEK 1". */
    marker: string;
    title: string;
    description: string;
}

export interface DemoClip {
    /** Caption under the clip. */
    label: string;
    /** File under /public/videos. Absent until the capture exists. */
    src?: string;
    /** Poster frame under /public. Absent until the capture exists. */
    poster?: string;
}

export interface Product {
    slug: string;
    name: string;
    /** Mono line above the product title: sector and scope. */
    context: string;
    /** Set on the one product that leads the range. */
    flagship?: boolean;
    /** One line, used in the nav dropdown and footer. */
    tagline: string;
    /** Two or three lines, used on the home page list. */
    summary: string;
    /** Large lead paragraph on the product page hero. */
    lead: string;
    /** Who it is for, shown opposite the lead. */
    audience: string;
    primaryCta: string;
    /** Main demo recording. Absent until the capture exists. */
    demo: {
        heading: string;
        /** Chrome label above the video, e.g. a sandbox URL. */
        chrome: string;
        src?: string;
        poster?: string;
        /** Shorter supporting clips under the main demo. */
        clips: DemoClip[];
    };
    features: { section: ProductSection; items: ProductFeature[] };
    mechanics: { section: ProductSection; steps: ProductStep[] };
    cta: { heading: string; body: string; action: string };
}

export const PRODUCTS: Product[] = [
    {
        slug: "dispatch-os",
        name: "Dispatch OS",
        context: "Logistics · United States",
        flagship: true,
        tagline: "Load, driver, and document board for US truck dispatchers.",
        summary:
            "Loads, drivers, and documents on one board for US truck dispatchers, with routine coordination handled by agents.",
        lead:
            "One board for loads, drivers, and paperwork, with the routine coordination handled by agents instead of phone calls.",
        audience:
            "Built for small and mid-size US carriers and dispatch offices moving 20 to 500 loads a week. Runs alongside your existing TMS or replaces it.",
        primaryCta: "Watch the demo",
        demo: {
            heading: "See it running",
            chrome: "app.dispatchos.io — sandbox account, no signup",
            clips: [
                { label: "Booking a load and assigning a driver" },
                { label: "Rate confirmations and BOLs read automatically" },
                { label: "Agent check calls and status updates" },
            ],
        },
        features: {
            section: {
                eyebrow: "What's inside",
                heading: "The parts a dispatcher touches",
            },
            items: [
                {
                    title: "Load board",
                    description:
                        "Every load from tender to invoice in one view, with margin visible per lane.",
                },
                {
                    title: "Driver comms",
                    description:
                        "SMS and voice threads attached to the load, not scattered across phones.",
                },
                {
                    title: "Document capture",
                    description:
                        "Rate cons, BOLs, and PODs read on arrival and filed against the right load.",
                },
                {
                    title: "Agent check calls",
                    description:
                        "Automated status calls to drivers and shippers, logged as structured updates.",
                },
                {
                    title: "Settlements",
                    description:
                        "Driver pay, accessorials, and deductions calculated from the load record.",
                },
                {
                    title: "Reporting",
                    description:
                        "Revenue per truck, deadhead, and on-time percentage, refreshed live.",
                },
            ],
        },
        mechanics: {
            section: {
                eyebrow: "Under the hood",
                heading: "How it works",
                intro:
                    "Nothing about the AI is magic, and none of it acts without a record you can audit.",
            },
            steps: [
                {
                    marker: "01",
                    title: "Documents in",
                    description:
                        "Email, fax, and photo uploads are parsed into structured load data, with low-confidence fields flagged for a human.",
                },
                {
                    marker: "02",
                    title: "One record per load",
                    description:
                        "Calls, messages, documents, and status changes all attach to the same load, so nothing lives only in someone's inbox.",
                },
                {
                    marker: "03",
                    title: "Agents handle the routine",
                    description:
                        "Check calls, ETA confirmations, and document chasing run automatically. Anything unusual escalates to a dispatcher with the context attached.",
                },
                {
                    marker: "04",
                    title: "Integrations",
                    description:
                        "ELD, load boards, QuickBooks, and factoring providers connect through the API, so Dispatch OS can sit next to what you already run.",
                },
            ],
        },
        cta: {
            heading: "Walk your own loads through it.",
            body:
                "Send a week of real paperwork and we'll set up a sandbox with your data before you commit to anything.",
            action: "Request a walkthrough",
        },
    },
    {
        slug: "ai-voice-agent",
        name: "AI Voice Agent",
        context: "Voice AI · inbound & outbound",
        tagline: "Answers, qualifies, and books calls in natural speech.",
        summary:
            "Answers the phone, qualifies the caller, books the appointment, and hands off to a human with full context.",
        lead:
            "Answers the phone in natural speech, qualifies the caller, books the appointment, and hands to a human the moment it should.",
        audience:
            "Deployed for clinics, home services, and dispatch offices where missed calls are lost revenue. Runs on your existing number.",
        primaryCta: "Hear a call",
        demo: {
            heading: "A real call, start to finish",
            chrome: "recorded with consent",
            clips: [
                { label: "Booking an urgent appointment" },
                { label: "Handing off to a human mid-call" },
                { label: "Outbound reminder and confirmation" },
            ],
        },
        features: {
            section: { eyebrow: "What it does", heading: "On every call" },
            items: [
                {
                    title: "Natural turn-taking",
                    description:
                        "Interruptions, hesitation, and background noise handled without the robotic pauses.",
                },
                {
                    title: "Booking & rescheduling",
                    description:
                        "Reads live availability from your calendar and writes the appointment back.",
                },
                {
                    title: "Qualification",
                    description:
                        "Asks the questions your intake form asks, in the order that makes sense out loud.",
                },
                {
                    title: "Human handoff",
                    description:
                        "Transfers with a summary when the caller asks, or when confidence drops.",
                },
                {
                    title: "Outbound follow-up",
                    description:
                        "Reminder, confirmation, and no-show recovery calls on a schedule you set.",
                },
                {
                    title: "Logged and reviewable",
                    description:
                        "Recording, transcript, and structured outcome on every call, searchable later.",
                },
            ],
        },
        mechanics: {
            section: {
                eyebrow: "Getting live",
                heading: "Two weeks, typically",
                intro:
                    "Most of that is listening to your existing calls so the agent sounds like your front desk, not like a demo.",
            },
            steps: [
                {
                    marker: "WEEK 1",
                    title: "Script and calendar wiring",
                    description:
                        "We review recorded calls, agree the flows and escalation rules, and connect your phone system and scheduler.",
                },
                {
                    marker: "WEEK 2",
                    title: "Shadow mode",
                    description:
                        "The agent takes overflow calls only, while you review every transcript and we tune the awkward ones.",
                },
                {
                    marker: "ONGOING",
                    title: "Full hours, monitored",
                    description:
                        "Answer rate, booking rate, and handoff reasons reported weekly, with prompts updated as your services change.",
                },
            ],
        },
        cta: {
            heading: "Point it at your overflow line first.",
            body:
                "A pilot runs on the calls you're currently missing, so there's nothing to lose while you judge it.",
            action: "Request a pilot",
        },
    },
    {
        slug: "construction-finance-suite",
        name: "Construction Finance Suite",
        context: "Construction · finance & operations",
        tagline: "Budgets, expenses, and inventory across build projects.",
        summary:
            "Budgets against actuals, expenses, inventory, and approvals across every build project in one place.",
        lead:
            "Budgets against actuals, expenses, inventory, and approvals across every project, instead of a spreadsheet per site.",
        audience:
            "Built for contractors and developers running several builds at once, where cost overruns are found weeks after they happen.",
        primaryCta: "Watch the demo",
        demo: {
            heading: "See it running",
            chrome: "demo project — Harbour Point, 42 units",
            clips: [
                { label: "Committed, spent, and remaining per cost code" },
                { label: "Receipt photographed on site, coded and approved" },
                { label: "Material stock and transfers between sites" },
            ],
        },
        features: {
            section: { eyebrow: "Modules", heading: "What it covers" },
            items: [
                {
                    title: "Budgets",
                    description:
                        "Cost codes, revisions, and variance against the original estimate.",
                },
                {
                    title: "Expenses",
                    description:
                        "Receipts, petty cash, and card spend captured on site and coded once.",
                },
                {
                    title: "Purchase approvals",
                    description:
                        "Requests routed by amount and project, with an audit trail per decision.",
                },
                {
                    title: "Inventory",
                    description:
                        "Material stock per store and site, with transfers and wastage recorded.",
                },
                {
                    title: "Subcontractors",
                    description:
                        "Contracts, progress claims, retention, and payment status in one place.",
                },
                {
                    title: "Reporting",
                    description:
                        "Cash flow forecast, cost-to-complete, and per-project profitability.",
                },
            ],
        },
        mechanics: {
            section: {
                eyebrow: "The problem it solves",
                heading: "Overruns found late",
            },
            steps: [
                {
                    marker: "01",
                    title: "Spend recorded where it happens",
                    description:
                        "Site staff photograph a receipt and pick a cost code. No month-end pile of paper to reconcile.",
                },
                {
                    marker: "02",
                    title: "One number per project",
                    description:
                        "Committed costs, actuals, and forecast in the same view, so the remaining budget is never a guess.",
                },
                {
                    marker: "03",
                    title: "Works offline",
                    description:
                        "Site app keeps working without signal and syncs when it returns, because basements have no bars.",
                },
            ],
        },
        cta: {
            heading: "Load one live project and compare.",
            body:
                "We'll set up a single build with your cost codes so you can check the numbers against your own spreadsheet.",
            action: "Request a walkthrough",
        },
    },
];

export function getProduct(slug: string): Product | undefined {
    return PRODUCTS.find((p) => p.slug === slug);
}

/** The product after this one, for the "Next:" link at the foot of each product page. */
export function getNextProduct(slug: string): Product {
    const i = PRODUCTS.findIndex((p) => p.slug === slug);
    return PRODUCTS[(i + 1) % PRODUCTS.length];
}
