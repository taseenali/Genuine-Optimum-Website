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

export interface Product {
    slug: string;
    name: string;
    /** Mono line above the product title: sector and scope. */
    context: string;
    /** One line, used in the nav dropdown and footer. */
    tagline: string;
    /** Two or three lines, used on the home page list. */
    summary: string;
    /** Large lead paragraph on the product page hero. */
    lead: string;
    /** Who it is for, shown opposite the lead. */
    audience: string;
    primaryCta: string;
    /** Slug of this product's case study under /work, when one exists. */
    caseStudy?: string;
    /** Introductory video. These are overview films, not walkthroughs of
     *  the interface. Absent until the file exists. */
    demo: {
        heading: string;
        /** Chrome label above the video, e.g. a sandbox URL. */
        chrome: string;
        src?: string;
        poster?: string;
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
        tagline: "Ratecon extraction, earnings and invoices for US truck dispatchers.",
        summary:
            "Upload a ratecon and the load, the money and the records fill themselves in. Carrier profiles, earnings and invoices for US truck dispatchers, all in one place.",
        lead:
            "Everything a dispatcher keeps track of, in one place. Upload a ratecon and the load details and earnings fill themselves in.",
        audience:
            "Built for dispatchers in the US who work with trucking companies and drivers, and who today spread the back office across documents, spreadsheets and separate invoicing tools. Finding, calling on and booking loads stay outside it.",
        primaryCta: "Watch the intro",
        demo: {
            heading: "Introduction",
            chrome: "Dispatch OS — introduction",
            src: "/videos/dispatchos-reel.webm",
            poster: "/videos/posters/dispatch-os.jpg",
        },
        features: {
            section: {
                eyebrow: "What's inside",
                heading: "One platform for the whole dispatch back office",
            },
            items: [
                {
                    title: "Ratecon extraction",
                    description:
                        "Upload a ratecon and Dispatch OS reads the load details, the rate and what the driver made straight into the right fields. No retyping, no copying between tools.",
                },
                {
                    title: "Carrier profiles",
                    description:
                        "A complete file for every carrier you dispatch for: company details, documents and full load history, kept together in one profile.",
                },
                {
                    title: "Gross revenue tracking",
                    description:
                        "Gross for every truck and carrier by week, month and year, with previous months and years always on hand to compare.",
                },
                {
                    title: "Automatic dispatch fees",
                    description:
                        "Set your percentage for each company and the dispatch fee is calculated on every load, so what you earn and what you charge the driver is always worked out.",
                },
                {
                    title: "Broker invoicing",
                    description:
                        "Generate the invoice a driver sends to a broker to get paid for a load, straight from the load record.",
                },
                {
                    title: "Driver invoicing",
                    description:
                        "Generate your own invoice to the driver for your dispatch fee, from the same load record.",
                },
            ],
        },
        mechanics: {
            section: {
                eyebrow: "How it works",
                heading: "From ratecon to paid invoice",
                intro:
                    "One upload does most of the work. After that, the numbers and the paperwork follow from it.",
            },
            steps: [
                {
                    marker: "01",
                    title: "Upload the ratecon",
                    description:
                        "Drop in the rate confirmation the broker sent. That upload is the only data entry.",
                },
                {
                    marker: "02",
                    title: "Data extraction",
                    description:
                        "The rate, what the driver made and the rest of the load details are pulled out and filed in the right fields, against the right truck and carrier.",
                },
                {
                    marker: "03",
                    title: "Gross and fees update automatically",
                    description:
                        "Each truck's gross, your dispatch fee, and the week, month and year totals update as soon as the load is in.",
                },
                {
                    marker: "04",
                    title: "Invoices generated",
                    description:
                        "Create the broker invoice for the driver and your own dispatch-fee invoice to the driver from the same load record.",
                },
            ],
        },
        cta: {
            heading: "Put the back office in one place.",
            body:
                "Tell us how you run your dispatch work today and we'll tell you how Dispatch OS would fit.",
            action: "Get in touch",
        },
    },
    {
        slug: "ai-voice-agent",
        caseStudy: "ai-voice-receptionist-platform",
        name: "AI Voice Agent",
        context: "Voice AI · inbound calls",
        tagline: "Answers, qualifies, and books calls in natural speech.",
        summary:
            "Answers the phone, qualifies the caller, books the appointment, and hands off to a human with full context.",
        lead:
            "Answers the phone in natural speech, qualifies the caller, books the appointment, and hands to a human the moment it should.",
        audience:
            "Deployed for clinics, home services, and dispatch offices where missed calls are lost revenue. Runs on your existing number.",
        primaryCta: "Watch the intro",
        demo: {
            heading: "Introduction",
            chrome: "AI Voice Agent — introduction",
            src: "/videos/ai_voice_agent.webm",
            poster: "/videos/posters/ai-voice-agent.jpg",
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
                    title: "Overflow cover",
                    description:
                        "Answers the calls your team can't get to, on your existing number, so a missed call stops being lost revenue.",
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
        caseStudy: "construction-expense-finance-system",
        name: "Construction Finance Suite",
        context: "Construction · finance & operations",
        tagline: "Budgets, expenses, and inventory across build projects.",
        summary:
            "Budgets against actuals, expenses, inventory, and approvals across every build project in one place.",
        lead:
            "Budgets against actuals, expenses, inventory, and approvals across every project, instead of a spreadsheet per site.",
        audience:
            "Built for contractors and developers running several builds at once, where cost overruns are found weeks after they happen.",
        primaryCta: "Watch the intro",
        demo: {
            heading: "Introduction",
            chrome: "Construction Finance Suite — introduction",
            src: "/videos/construction-finance-reel.webm",
            poster: "/videos/posters/construction-finance.jpg",
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
