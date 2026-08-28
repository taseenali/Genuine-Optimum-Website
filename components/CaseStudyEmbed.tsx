"use client";

import { useEffect, useRef, useState } from "react";

// The iframe always renders at this fixed width, wider than any known
// case-study design (1180px for the extracted templates, 1056px/11in for
// the "bundler" export's sheet). It is NEVER derived from a measurement,
// because at least one design expresses its width as "100% up to a
// max-width": shrinking the iframe to match a prior measurement just
// measures a smaller number next time, spiralling the whole page down to
// nothing over a few frames.
const IFRAME_WIDTH = 1400;

/** Finds the element whose rendered width and left offset ARE the design's
 * own, not just whatever the iframe's current width happens to produce. */
function findPageWrapper(doc: Document): Element | null {
    const csPage = doc.querySelector(".cs-page");
    if (csPage) return csPage;

    // The "bundler" export's <doc-page> custom element stretches to fill
    // its container rather than sizing to the design, so its own rect is
    // useless here - the actual fixed-size sheet lives inside its (open)
    // shadow root.
    const docPage = doc.querySelector("doc-page");
    const sheet = docPage?.shadowRoot?.querySelector(".sheet");
    if (sheet) return sheet;

    return doc.querySelector("section.page") ?? doc.body;
}

/**
 * Embeds a self-contained case-study HTML document (own fonts/colors/layout,
 * untouched by the site's theme). These are fixed-width desktop/print
 * layouts by design - reproducing the source PDF exactly means the page
 * itself must never reflow. So instead of trying to make the design
 * responsive, this renders it at its natural width and scales the whole
 * thing down to fit the available space, the same way a PDF viewer would,
 * rather than letting it either overflow (clipped, since scrolling is off)
 * or reflow into something that no longer matches the source.
 */
export default function CaseStudyEmbed({ src }: { src: string }) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [natural, setNatural] = useState({ width: IFRAME_WIDTH, height: 600, offsetX: 0 });
    const [containerWidth, setContainerWidth] = useState(IFRAME_WIDTH);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const ro = new ResizeObserver((entries) => {
            const width = entries[0]?.contentRect.width;
            if (width) setContainerWidth(width);
        });
        ro.observe(wrapper);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        let bodyObserver: ResizeObserver | undefined;

        const measure = () => {
            const doc = iframe.contentWindow?.document;
            if (!doc?.body) return;
            const wrapperEl = findPageWrapper(doc);
            const rect = wrapperEl?.getBoundingClientRect();
            const width = rect && rect.width > 0 ? rect.width : doc.body.scrollWidth;
            const offsetX = rect?.left ?? 0;
            const height = doc.body.scrollHeight;
            if (width > 0 && height > 0) setNatural({ width, height, offsetX });
        };

        const attach = () => {
            const doc = iframe.contentWindow?.document;
            if (!doc?.body) return;
            // Re-attaching (the immediate check below and the "load" event
            // can both fire) must not leave two observers running.
            bodyObserver?.disconnect();
            measure();
            // Covers the one embed that replaces its own DOM asynchronously
            // after "load" fires, so the natural size keeps being wrong for
            // a moment after the page first loads. Since the iframe's own
            // width never changes (see IFRAME_WIDTH above), re-measuring
            // here is safe and can't spiral.
            bodyObserver = new ResizeObserver(measure);
            bodyObserver.observe(doc.body);
        };

        // On a full page load (rather than a client-side click from /work),
        // the iframe can finish loading before this effect even runs, since
        // the browser starts fetching its src as soon as the initial HTML is
        // parsed. In that case "load" has already fired and would never be
        // caught below, leaving the natural size stuck at the bootstrap
        // default. Guard against the iframe's transient "about:blank"
        // placeholder document, though: it also reports readyState
        // "complete" the instant a freshly inserted iframe mounts, before
        // the real src has even started loading - attaching to it locks the
        // ResizeObserver onto a document that gets discarded once the real
        // navigation lands, so the size never updates after that.
        const alreadyLoadedRealDocument =
            iframe.contentDocument?.readyState === "complete" &&
            iframe.contentWindow?.location.href !== "about:blank";

        if (alreadyLoadedRealDocument) {
            attach();
        }
        // Always also listen for "load": it's the only signal for a freshly
        // inserted iframe, and if the check above already attached, this is
        // a harmless re-measurement once the same real document finishes.
        iframe.addEventListener("load", attach);

        return () => {
            iframe.removeEventListener("load", attach);
            bodyObserver?.disconnect();
        };
    }, []);

    const scale = containerWidth / natural.width;

    return (
        <div ref={wrapperRef} style={{ width: "100%", height: natural.height * scale, overflow: "hidden" }}>
            <iframe
                ref={iframeRef}
                src={src}
                title="Case study"
                scrolling="no"
                style={{
                    width: IFRAME_WIDTH,
                    height: natural.height,
                    border: "none",
                    display: "block",
                    // The design's own wrapper is often centered within this
                    // (deliberately oversized) iframe, so its left edge sits
                    // some distance in from x=0 - translate that away before
                    // scaling so the visible page fills the wrapper exactly,
                    // instead of scaling the empty margin along with it.
                    transform: `scale(${scale}) translateX(-${natural.offsetX}px)`,
                    transformOrigin: "top left",
                }}
            />
        </div>
    );
}
