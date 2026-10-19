"use client";

import { useEffect, useRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";

/** Where a revealed element travels from. "up" is the default 12px rise. */
type RevealFrom = "up" | "left" | "right" | "scale" | "fade";

/**
 * The site's entrance motion: a short fade, with a small rise, slide or
 * scale depending on `from`. The same few effects everywhere, so sections
 * feel like one document settling.
 *
 * Built so it can never hold content back:
 *
 * - The server HTML renders everything visible. Nothing starts at
 *   opacity 0, so the text a crawler fetches, and the text a visitor
 *   sees before any JavaScript has run, is all there. An earlier
 *   version started hidden and waited for JavaScript, which pushed
 *   Largest Contentful Paint to the point hydration finished: the
 *   hero paragraph was in the HTML and still unpainted for about a
 *   second.
 * - After the page is live, only elements that are *below* the
 *   visible area are hidden and then revealed as they scroll in.
 *   Anything already on screen is left alone, so there is no
 *   hide-then-show flash at the top of the page.
 * - Each element reveals once, then drops its reveal attributes
 *   altogether, so the element's own transitions (hover effects and so
 *   on) are never fighting the reveal. `prefers-reduced-motion` turns
 *   the transition off in globals.css, so those visitors just see the
 *   content.
 *
 * It renders a plain element (a div unless `as` says otherwise) and passes
 * every other attribute through, so it can stand in directly for the
 * element it wraps: a grid item, a card, a paragraph.
 *
 * The state lives in a data attribute set directly on the element, not in
 * React state, so a reveal never re-renders anything.
 */
export default function Reveal({
    children,
    delay = 0,
    from = "up",
    as,
    ...rest
}: {
    children?: ReactNode;
    /** Seconds to wait before the transition starts, for staggering a row. */
    delay?: number;
    from?: RevealFrom;
    as?: ElementType;
} & HTMLAttributes<HTMLElement>) {
    const ref = useRef<HTMLElement>(null);
    const Tag = (as ?? "div") as ElementType;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Already on screen (or above it): leave it exactly as rendered.
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) return;

        // Browsers without IntersectionObserver keep the content visible.
        if (typeof IntersectionObserver === "undefined") return;

        el.dataset.reveal = "hidden";

        let cleanup = 0;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                el.dataset.reveal = "shown";
                observer.disconnect();
                // Once the fade has played, remove the attributes so the
                // element goes back to being an ordinary element.
                cleanup = window.setTimeout(() => {
                    delete el.dataset.reveal;
                    delete el.dataset.revealFrom;
                    el.style.transitionDelay = "";
                }, (delay + 0.5) * 1000 + 150);
            },
            { rootMargin: "0px 0px -60px 0px" }
        );
        observer.observe(el);

        return () => {
            observer.disconnect();
            window.clearTimeout(cleanup);
        };
    }, [delay]);

    return (
        <Tag
            ref={ref}
            data-reveal-from={from === "up" ? undefined : from}
            {...rest}
            style={delay ? { ...rest.style, transitionDelay: `${delay}s` } : rest.style}
        >
            {children}
        </Tag>
    );
}
