import type { IconType } from "react-icons";
import {
    SiPython,
    SiTypescript,
    SiGo,
    SiRust,
    SiKotlin,
    SiPostgresql,
    SiPytorch,
    SiHuggingface,
    SiLangchain,
    SiDbt,
    SiApacheairflow,
    SiApachekafka,
    SiDuckdb,
    SiOpenai,
    SiAnthropic,
    SiReact,
    SiNextdotjs,
    SiThreedotjs,
    SiNodedotjs,
    SiTailwindcss,
    SiRedis,
    SiDocker,
    SiKubernetes,
    SiVercel,
    SiSupabase,
    SiTerraform,
} from "react-icons/si";

export interface Capability {
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
        number: "02",
        title: "Data systems",
        description:
            "Ingestion, pipelines, warehouses, and the modelling layer on top. Getting operational data into one place, then making it answer questions.",
        short:
            "Pipelines, warehouses, and the modelling layer that makes them answer questions.",
        featured: true,
        tags: ["ETL", "warehousing", "streaming"],
    },
    {
        number: "03",
        title: "Web development",
        description:
            "Marketing sites and web applications on modern frameworks, handed over with the tooling and documentation to keep changing them.",
        short:
            "Marketing sites and web apps, handed over with the tooling to keep changing them.",
        featured: true,
        tags: ["SSR", "technical SEO", "performance"],
    },
    {
        number: "04",
        title: "App development",
        description:
            "Cross-platform mobile apps and desktop tools, including offline-first builds for field and site teams who lose signal.",
        short:
            "Cross-platform mobile and desktop, including offline-first builds for field teams.",
        featured: true,
        tags: ["iOS / Android", "offline sync"],
    },
    {
        number: "05",
        title: "CMS & internal software",
        description:
            "Content systems, admin panels, and back-office tools shaped around how your team actually works instead of a generic template.",
        short:
            "Admin panels and back-office tools shaped around how your team actually works.",
        featured: true,
        tags: ["headless CMS", "roles & permissions"],
    },
    {
        number: "06",
        title: "Dashboards & BI",
        description:
            "Operational dashboards and reporting built on your live data, with the metric definitions agreed once rather than argued about monthly.",
        short:
            "Operational reporting on live data, with the metric definitions agreed once.",
        featured: true,
        tags: ["real-time", "forecasting"],
    },
    {
        number: "07",
        title: "Automation & integration",
        description:
            "Connecting the tools you already pay for, and replacing the manual steps between them with workflows that run unattended.",
        short:
            "Connecting the tools you already pay for, and removing the manual steps between.",
        featured: true,
        tags: ["APIs", "webhooks", "queues"],
    },
    {
        number: "08",
        title: "Cloud & DevOps",
        description:
            "Deployment, monitoring, and cost control. Included in the build rather than quoted as an afterthought.",
        short:
            "Deployment, monitoring, and cost control, included in the build.",
        featured: false,
        tags: ["CI/CD", "observability"],
    },
];

export interface StackItem {
    name: string;
    /** Brand mark. Omitted where no mark ships with react-icons, in
     *  which case the grid renders the name as a wordmark instead. */
    icon?: IconType;
}

export interface StackGroup {
    label: string;
    items: StackItem[];
}

export const STACK: StackGroup[] = [
    {
        label: "Languages",
        items: [
            { name: "Python", icon: SiPython },
            { name: "TypeScript", icon: SiTypescript },
            { name: "Go", icon: SiGo },
            { name: "Rust", icon: SiRust },
            { name: "Kotlin", icon: SiKotlin },
            { name: "SQL", icon: SiPostgresql },
        ],
    },
    {
        label: "AI & data",
        items: [
            { name: "PyTorch", icon: SiPytorch },
            { name: "Hugging Face", icon: SiHuggingface },
            { name: "LangChain", icon: SiLangchain },
            { name: "Anthropic", icon: SiAnthropic },
            { name: "OpenAI", icon: SiOpenai },
            { name: "dbt", icon: SiDbt },
            { name: "Airflow", icon: SiApacheairflow },
            { name: "Kafka", icon: SiApachekafka },
            { name: "DuckDB", icon: SiDuckdb },
        ],
    },
    {
        label: "Product & infrastructure",
        items: [
            { name: "React", icon: SiReact },
            { name: "Next.js", icon: SiNextdotjs },
            { name: "Node.js", icon: SiNodedotjs },
            { name: "Three.js", icon: SiThreedotjs },
            { name: "Tailwind", icon: SiTailwindcss },
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "Redis", icon: SiRedis },
            { name: "Docker", icon: SiDocker },
            { name: "Kubernetes", icon: SiKubernetes },
            // Simple Icons no longer ships an Amazon mark, so AWS renders
            // as a wordmark in the same cell.
            { name: "AWS" },
            { name: "Vercel", icon: SiVercel },
            { name: "Supabase", icon: SiSupabase },
            { name: "Terraform", icon: SiTerraform },
        ],
    },
];
