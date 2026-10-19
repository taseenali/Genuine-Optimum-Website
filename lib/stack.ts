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
