import Link from "next/link";
import Reveal from "./Reveal";
import { Container, ArrowLink } from "./ui";
import { CAPABILITIES } from "@/lib/capabilities";

/**
 * The "what we do" grid on the home page.
 *
 * Glyphs are drawn inline rather than pulled from an icon set: they
 * are simple enough to author, they keep this a server component
 * (react-icons needs a client boundary for its context), and a
 * hand-cut set does not look like every other site using Feather.
 *
 * All are 24x24, 1.25 stroke, no fill, so they sit at the same
 * optical weight as the hairline rules around them.
 */

const glyphProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
};

/** Keyed by capability slug, so reordering the list cannot mismatch them. */
const GLYPHS: Record<string, React.ReactNode> = {
    // Agents: one model with satellites reporting to it.
    "ai-agents": (
        <svg {...glyphProps}>
            <circle cx="12" cy="12" r="3.2" />
            <circle cx="5" cy="5.5" r="1.6" />
            <circle cx="19" cy="5.5" r="1.6" />
            <circle cx="12" cy="20" r="1.6" />
            <path d="M6.2 6.8 9.8 10M17.8 6.8 14.2 10M12 15.2V18.4" />
        </svg>
    ),
    // AI engineering: a model chip with its interface pins.
    "ai-engineering": (
        <svg {...glyphProps}>
            <rect x="6.5" y="6.5" width="11" height="11" />
            <path d="M10 10h4v4h-4z" />
            <path d="M9.5 3.5v3M14.5 3.5v3M9.5 17.5v3M14.5 17.5v3M3.5 9.5h3M3.5 14.5h3M17.5 9.5h3M17.5 14.5h3" />
        </svg>
    ),
    // Harness engineering: a model held inside a frame, with a gate.
    "harness-engineering": (
        <svg {...glyphProps}>
            <path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 9V6.5M12 17.5V15" />
        </svg>
    ),
    // Data systems: records stacked into a store.
    "data-systems": (
        <svg {...glyphProps}>
            <rect x="4" y="4.5" width="16" height="4" />
            <rect x="4" y="10" width="16" height="4" />
            <rect x="4" y="15.5" width="16" height="4" />
            <path d="M7 6.5h.01M7 12h.01M7 17.5h.01" />
        </svg>
    ),
    // Web: a document frame in a browser.
    web: (
        <svg {...glyphProps}>
            <rect x="3" y="5" width="18" height="14" />
            <path d="M3 9h18" />
            <path d="M5.6 7h.01M8 7h.01" />
            <path d="M6 12.5h7M6 15.5h4.5" />
        </svg>
    ),
    // App: a handheld device.
    apps: (
        <svg {...glyphProps}>
            <rect x="7" y="2.5" width="10" height="19" rx="1.5" />
            <path d="M10.5 18.5h3" />
            <path d="M7 6h10" />
        </svg>
    ),
    // Internal software: a panel with its own navigation rail.
    "cms-internal": (
        <svg {...glyphProps}>
            <rect x="3" y="5" width="18" height="14" />
            <path d="M9 5v14" />
            <path d="M5.2 8.5h1.6M5.2 12h1.6M5.2 15.5h1.6" />
            <path d="M12 9h6M12 13h4" />
        </svg>
    ),
    // Dashboards: measured values against a baseline.
    dashboards: (
        <svg {...glyphProps}>
            <path d="M3.5 19.5h17" />
            <path d="M7 19.5v-6M12 19.5v-10M17 19.5v-4" />
            <path d="M5 6.5 9.5 9l4-4.5 4.5 2" />
        </svg>
    ),
    // Automation: two systems, and the run between them.
    automation: (
        <svg {...glyphProps}>
            <rect x="2.5" y="2.5" width="6" height="6" />
            <rect x="15.5" y="15.5" width="6" height="6" />
            <path d="M8.5 5.5h6a4 4 0 0 1 4 4v6" />
            <path d="M16.6 13.6 18.5 15.5l1.9-1.9" />
        </svg>
    ),
    // Cloud engineering: the infrastructure layer, drawn as stacked tiers.
    cloud: (
        <svg {...glyphProps}>
            <path d="M7 15.5a4 4 0 0 1-.4-8 5.5 5.5 0 0 1 10.6 1.2A3.4 3.4 0 0 1 17 15.5Z" />
            <path d="M12 15.5v4M8.5 19.5h7" />
        </svg>
    ),
    // DevOps: the release loop.
    devops: (
        <svg {...glyphProps}>
            <path d="M16.5 7.5A6.5 6.5 0 0 0 5.8 9.5" />
            <path d="M7.5 16.5a6.5 6.5 0 0 0 10.7-2" />
            <path d="M16.6 4.6v3.2h-3.2M7.4 19.4v-3.2h3.2" />
        </svg>
    ),
};

export default function ServicesGrid() {
    const featured = CAPABILITIES.filter((c) => c.featured);

    return (
        <section className="border-t border-line bg-bg-alt">
            <Container className="py-24 md:py-28">
                <Reveal>
                    <div className="flex flex-wrap items-end justify-between gap-8 pb-10">
                        <div className="flex flex-col gap-3.5">
                            <div className="eyebrow">What we do</div>
                            <h2 className="max-w-[20ch] text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.06]">
                                One delivery team across every discipline
                            </h2>
                        </div>
                        <p className="max-w-[34ch] text-[15px] leading-relaxed text-muted">
                            Most projects need three or four of these at once. You get
                            one team and one plan for all of them, not four vendors
                            pointing at each other.
                        </p>
                    </div>
                </Reveal>

                {/* 1px gaps over a line-coloured bed: hairline dividers between
                    cells with no doubling where they meet. */}
                <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {featured.map((capability, i) => (
                        <Reveal key={capability.number} delay={(i % 4) * 0.04}>
                            <Link
                                href="/capabilities"
                                className="group flex h-full min-h-[210px] flex-col bg-panel p-6 transition-colors hover:bg-panel-hover"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <span className="font-mono text-[11px] text-dim">
                                        {capability.number}
                                    </span>
                                    <span className="size-6 text-dim transition-colors duration-200 group-hover:text-accent">
                                        {GLYPHS[capability.slug]}
                                    </span>
                                </div>

                                <h3 className="mt-7 text-[17px] leading-snug">
                                    {capability.title}
                                </h3>
                                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                                    {capability.short}
                                </p>
                            </Link>
                        </Reveal>
                    ))}

                    {/* The last cell completes the grid (eleven disciplines plus
                        this one is a full 4x3) and keeps the route through to
                        the client work, which used to have a section of its
                        own here. If the discipline count changes, check the
                        grid still ends on a full row. */}
                    <Reveal delay={0.12}>
                        <Link
                            href="/work"
                            className="group flex h-full min-h-[210px] flex-col justify-between bg-bg p-6 transition-colors hover:bg-panel"
                        >
                            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
                                In practice
                            </span>
                            <span>
                                <span className="block text-[17px] leading-snug text-text">
                                    See what we&apos;ve
                                    <br />
                                    built with them
                                </span>
                                <span className="mt-3 inline-block font-mono text-[12.5px] text-accent transition-transform duration-200 group-hover:translate-x-0.5">
                                    Client work &rarr;
                                </span>
                            </span>
                        </Link>
                    </Reveal>
                </div>

                <Reveal>
                    <div className="pt-8">
                        <ArrowLink href="/capabilities">
                            All capabilities and the stack we use
                        </ArrowLink>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}
