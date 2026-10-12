import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Layout and text primitives shared by every page. Server
 * components: nothing here needs state, so nothing here ships
 * JavaScript.
 */

/** The 1320px measure with the standard gutter, used by every section. */
export function Container({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={`mx-auto w-full max-w-[var(--page-max)] px-6 md:px-10 ${className}`}>
            {children}
        </div>
    );
}

/** Mono kicker above a section heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
    return <div className="eyebrow">{children}</div>;
}

/**
 * The standard section header: eyebrow, heading, optional lead.
 * Sizes step down from the page h1, so `as` picks the tag and
 * `size` picks the scale independently.
 */
export function SectionHead({
    eyebrow,
    heading,
    intro,
    className = "",
}: {
    eyebrow?: string;
    heading: string;
    intro?: string;
    className?: string;
}) {
    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.06]">
                {heading}
            </h2>
            {intro ? (
                <p className="max-w-[46ch] text-base leading-relaxed text-muted">
                    {intro}
                </p>
            ) : null}
        </div>
    );
}

/** Solid accent call to action. One per view, at most. */
export function PrimaryLink({
    href,
    children,
}: {
    href: string;
    children: ReactNode;
}) {
    return (
        <Link
            href={href}
            className="inline-flex items-center justify-center rounded-control bg-accent px-6 py-3.5 text-sm font-medium text-on-accent transition-colors duration-200 hover:bg-accent-hi"
        >
            {children}
        </Link>
    );
}

/** Outlined secondary action. Never competes with the primary. */
export function SecondaryLink({
    href,
    children,
}: {
    href: string;
    children: ReactNode;
}) {
    return (
        <Link
            href={href}
            className="inline-flex items-center justify-center rounded-control border border-line-3 px-6 py-3.5 text-sm text-text transition-colors duration-200 hover:border-dim hover:bg-panel"
        >
            {children}
        </Link>
    );
}

/** Mono arrow link used at the end of list sections. */
export function ArrowLink({
    href,
    children,
}: {
    href: string;
    children: ReactNode;
}) {
    return (
        <Link
            href={href}
            className="font-mono text-xs text-accent transition-colors duration-200 hover:text-accent-hi"
        >
            {children} &rarr;
        </Link>
    );
}

/** Small outlined mono tag, used for tech tags and captured fields. */
export function Tag({ children }: { children: ReactNode }) {
    return (
        <span className="rounded-control border border-line-3 px-2.5 py-1 font-mono text-[11px] text-muted">
            {children}
        </span>
    );
}

/**
 * The closing call-to-action band that ends every page. Alternates
 * onto bg-alt so it reads as a distinct footer step above the
 * real footer.
 */
export function CtaBand({
    heading,
    body,
    action,
    href = "/contact",
    children,
}: {
    heading: string;
    body?: string;
    action: string;
    href?: string;
    /** Optional extra actions rendered beside the primary. */
    children?: ReactNode;
}) {
    return (
        <section className="border-t border-line bg-bg-alt">
            <Container className="flex flex-col items-start gap-6 py-24 md:py-28">
                <h2 className="max-w-[20ch] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.03]">
                    {heading}
                </h2>
                {body ? (
                    <p className="max-w-[48ch] text-[17px] leading-relaxed text-muted">
                        {body}
                    </p>
                ) : null}
                <div className="flex flex-wrap gap-3">
                    <PrimaryLink href={href}>{action}</PrimaryLink>
                    {children}
                </div>
            </Container>
        </section>
    );
}
