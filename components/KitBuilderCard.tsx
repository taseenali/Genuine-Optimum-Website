"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import CaseStudyModal from "@/components/CaseStudyModal";

/** Hash pushed while the catalogue is open, so the browser's back button closes it. */
const OPEN_HASH = "#kit-catalogue";

/** Pixel size the catalogue page images were rendered at. */
const PAGE_WIDTH = 1266;
const PAGE_HEIGHT = 1638;

/**
 * The 3D kit builder entry on the Work page.
 *
 * It looks and opens like the storefront case studies: clicking the card
 * shows the catalogue in the same overlay, rather than sending the visitor
 * to a PDF in another tab.
 *
 * The catalogue is shown as one image per page, not as an embedded PDF.
 * The storefront overlay is built to measure and scale HTML documents,
 * which it cannot do to the browser's PDF viewer, and many phones show only
 * the first page of a PDF inside a frame. Images behave the same
 * everywhere. The original PDF stays one click away as a download.
 *
 * The anchor keeps a real href to the PDF, so with JavaScript off, or on a
 * ctrl/cmd/middle click, it opens the PDF in a new tab as a plain link would.
 */
export default function KitBuilderCard({
    pdfHref,
    thumbnail,
    pages,
    children,
}: {
    pdfHref: string;
    thumbnail: string;
    /** One image per catalogue page, in order. */
    pages: string[];
    /** The write-up shown beside the preview. */
    children: ReactNode;
}) {
    const [open, setOpen] = useState(false);

    const close = useCallback(() => {
        // Opening pushed a history entry, so closing steps back over it; that
        // keeps the back button and the close button doing the same thing.
        if (window.location.hash === OPEN_HASH) window.history.back();
        else setOpen(false);
    }, []);

    useEffect(() => {
        const onPop = () => {
            if (window.location.hash !== OPEN_HASH) setOpen(false);
        };
        window.addEventListener("popstate", onPop);
        return () => window.removeEventListener("popstate", onPop);
    }, []);

    function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
        // Let the browser handle new-tab clicks itself.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        window.history.pushState(null, "", OPEN_HASH);
        setOpen(true);
    }

    return (
        <>
            <a
                href={pdfHref}
                target="_blank"
                rel="noopener"
                onClick={handleClick}
                className="group grid w-full grid-cols-1 border border-line transition-colors hover:border-line-3 lg:w-[80%] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
            >
                {/* The thumbnail is shown whole (contain), on the dark of the
                    catalogue page it was cut from, so nothing is cropped. */}
                <div className="relative aspect-21/9 overflow-hidden bg-[#0d0d0f] lg:aspect-auto lg:min-h-[260px]">
                    <Image
                        src={thumbnail}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-contain transition-opacity duration-300 group-hover:opacity-90"
                    />
                </div>

                <div className="flex flex-col justify-center gap-3 border-t border-line bg-panel p-5 transition-colors group-hover:bg-panel-hover lg:border-l lg:border-t-0 lg:px-7 lg:py-6">
                    {children}
                    <span className="font-mono text-[12px] text-accent transition-transform duration-200 group-hover:translate-x-0.5">
                        Open catalogue &rarr;
                    </span>
                </div>
            </a>

            {open ? (
                <CaseStudyModal wide onClose={close}>
                    {/* pr-16 leaves room for the overlay's own close button. */}
                    <div className="flex items-center justify-between gap-4 border-b border-line bg-panel py-3 pl-5 pr-16">
                        <span className="font-mono text-[11px] text-dim">
                            Custom kit builder: catalogue
                        </span>
                        <a
                            href={pdfHref}
                            download
                            className="font-mono text-[11px] text-accent transition-colors hover:text-accent-hi"
                        >
                            Download PDF
                        </a>
                    </div>

                    {pages.map((src, i) => (
                        <Image
                            key={src}
                            src={src}
                            alt={`Catalogue page ${i + 1} of ${pages.length}`}
                            width={PAGE_WIDTH}
                            height={PAGE_HEIGHT}
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            priority={i === 0}
                            className="block h-auto w-full"
                        />
                    ))}
                </CaseStudyModal>
            ) : null}
        </>
    );
}
