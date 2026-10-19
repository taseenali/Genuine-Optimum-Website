/**
 * What Genuine Optimum builds.
 *
 * Plain data only. The brand icons used by the stack grid live in
 * lib/stack.ts: this file is imported by client components (the contact
 * form), and an import of the icon set here would ship all of it to every
 * page that touches this list.
 */

export interface Capability {
    /** Stable id. Anything that attaches to a capability (the home grid
     *  glyphs) keys on this, so reordering and renumbering are safe. */
    slug: string;
    /** Two-digit marker shown in the accent colour. */
    number: string;
    title: string;
    description: string;
    /** One-line version, for the home page grid where space is tight. */
    short: string;
    /** Short mono tags under the description. */
    tags: string[];
    /**
     * Whether this appears in the home page grid. The capabilities page
     * lists everything; the home page shows only the disciplines we
     * lead with.
     */
    featured: boolean;
}

/**
 * What we can build. Ordered so the AI and data work leads and
 * the delivery disciplines follow, which is the order most
 * projects actually combine them in.
 */
export const CAPABILITIES: Capability[] = [
    {
        slug: "ai-agents",
        number: "01",
        title: "AI models & agents",
        description:
            "Fine-tuning, retrieval systems, voice and chat agents, and evaluation harnesses that catch regressions before your customers do.",
        short:
            "Retrieval, voice and chat agents, and the evals that keep them honest.",
        featured: true,
        tags: ["RAG", "fine-tuning", "evals", "speech"],
    },
    {
        slug: "ai-engineering",
        number: "02",
        title: "AI engineering",
        description:
            "Taking a model from a working notebook to a dependable product: serving, latency and cost budgets, monitoring, and the plumbing that keeps it running after launch.",
        short:
            "Taking a model from notebook to dependable product: serving, cost, monitoring.",
        featured: true,
        tags: ["model serving", "LLM ops", "monitoring"],
    },
    {
        slug: "harness-engineering",
        number: "03",
        title: "Harness engineering",
        description:
            "The scaffolding around a model that makes it usable: tool calling, sandboxes, context handling, guardrails, and the test harnesses that show whether it is actually improving.",
        short:
            "The tools, guardrails and test scaffolding that make a model dependable.",
        featured: true,
        tags: ["tool use", "sandboxes", "guardrails", "eval harnesses"],
    },
    {
        slug: "data-systems",
        number: "04",
        title: "Data systems",
        description:
            "Ingestion, pipelines, warehouses, and the modelling layer on top. Getting operational data into one place, then making it answer questions.",
        short:
            "Pipelines, warehouses, and the modelling layer that makes them answer questions.",
        featured: true,
        tags: ["ETL", "warehousing", "streaming"],
    },
    {
        slug: "web",
        number: "05",
        title: "Web development",
        description:
            "Marketing sites and web applications on modern frameworks, handed over with the tooling and documentation to keep changing them.",
        short:
            "Marketing sites and web apps, handed over with the tooling to keep changing them.",
        featured: true,
        tags: ["SSR", "technical SEO", "performance"],
    },
    {
        slug: "apps",
        number: "06",
        title: "App development",
        description:
            "Cross-platform mobile apps and desktop tools, including offline-first builds for field and site teams who lose signal.",
        short:
            "Cross-platform mobile and desktop, including offline-first builds for field teams.",
        featured: true,
        tags: ["iOS / Android", "offline sync"],
    },
    {
        slug: "cms-internal",
        number: "07",
        title: "CMS & internal software",
        description:
            "Content systems, admin panels, and back-office tools shaped around how your team actually works instead of a generic template.",
        short:
            "Admin panels and back-office tools shaped around how your team actually works.",
        featured: true,
        tags: ["headless CMS", "roles & permissions"],
    },
    {
        slug: "dashboards",
        number: "08",
        title: "Dashboards & BI",
        description:
            "Operational dashboards and reporting built on your live data, with the metric definitions agreed once rather than argued about monthly.",
        short:
            "Operational reporting on live data, with the metric definitions agreed once.",
        featured: true,
        tags: ["real-time", "forecasting"],
    },
    {
        slug: "automation",
        number: "09",
        title: "Automation & integration",
        description:
            "Connecting the tools you already pay for, and replacing the manual steps between them with workflows that run unattended.",
        short:
            "Connecting the tools you already pay for, and removing the manual steps between.",
        featured: true,
        tags: ["APIs", "webhooks", "queues"],
    },
    {
        slug: "cloud",
        number: "10",
        title: "Cloud engineering",
        description:
            "Designing and running the infrastructure your software sits on: networks, environments, storage and scaling, with cost kept visible from the start.",
        short:
            "The infrastructure your software runs on, designed for scale and cost.",
        featured: true,
        tags: ["AWS", "infrastructure as code", "cost control"],
    },
    {
        slug: "devops",
        number: "11",
        title: "DevOps",
        description:
            "The delivery pipeline: automated builds, tests and releases, plus the monitoring that tells you something is wrong before your users do.",
        short:
            "Automated builds, tests and releases, with monitoring that warns you first.",
        featured: true,
        tags: ["CI/CD", "observability", "release automation"],
    },
];
