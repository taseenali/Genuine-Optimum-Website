"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import CaseStudyModal from "@/components/CaseStudyModal";
import CaseStudyEmbed from "@/components/CaseStudyEmbed";
import { SERVICES } from "@/lib/services";

export interface WorkCard {
    slug: string;
    title: string;
    summary: string;
    services: string[];
    clientLabel?: string;
    standaloneHtml?: string;
    coverImage?: string;
    coverPosition?: string;
}

function serviceLabel(slug: string): string {
    return SERVICES.find((s) => s.slug === slug)?.shortTitle ?? slug;
}

/**
 * The client-work grid.
 *
 * Cards with a standalone HTML build open it in an overlay and push
 * the case study URL, so the deep link and the back button both
 * behave; cards without one navigate to the full page instead.
 */
export default function WorkGrid({ templates }: { templates: WorkCard[] }) {
    const [open, setOpen] = useState<WorkCard | null>(null);

    const close = useCallback(() => {
        window.history.pushState(null, "", "/work");
        setOpen(null);
    }, []);

    useEffect(() => {
        const onPop = () => {
            if (window.location.pathname === "/work") setOpen(null);
        };
        window.addEventListener("popstate", onPop);
        return () => window.removeEventListener("popstate", onPop);
    }, []);

    function handleClick(e: React.MouseEvent, study: WorkCard) {
        // No embed available: let the Link navigate to the full page.
        if (!study.standaloneHtml) return;
        e.preventDefault();
        window.history.pushState(null, "", `/work/${study.slug}`);
        setOpen(study);
    }

    return (
        <>
            {/* One case study per row, each a wide horizontal card: the
                preview on the left, the write-up on the right. Stacks to
                preview-over-text below the lg breakpoint. */}
            <div className="flex w-full flex-col gap-4 lg:w-[80%]">
                {templates.map((study) => (
                    <Link
                        key={study.slug}
                        href={`/work/${study.slug}`}
                        onClick={(e) => handleClick(e, study)}
                        className="group grid grid-cols-1 border border-line transition-colors hover:border-line-3 lg:h-[200px] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
                    >
                        <div className="relative aspect-21/9 overflow-hidden bg-bg lg:aspect-auto lg:h-full">
                            {study.coverImage ? (
                                <Image
                                    src={study.coverImage}
                                    alt=""
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 58vw"
                                    className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                                    style={{ objectPosition: study.coverPosition ?? "50% 34%" }}
                                />
                            ) : (
                                <div className="slot flex size-full items-center justify-center">
                                    <span className="font-mono text-[11.5px] text-dim">
                                        [ site screenshot ]
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col justify-center gap-2.5 border-t border-line bg-panel p-5 transition-colors group-hover:bg-panel-hover lg:min-h-0 lg:overflow-hidden lg:border-l lg:border-t-0 lg:px-7 lg:py-5">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-faint">
                                {study.clientLabel ? (
                                    <span>{study.clientLabel}</span>
                                ) : null}
                                {study.services.map((slug) => (
                                    <span key={slug} className="text-accent/70">
                                        {serviceLabel(slug)}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-[19px] leading-[1.2] tracking-[-0.02em] text-text">
                                {study.title}
                            </h3>
                            <p className="line-clamp-2 max-w-[52ch] text-[14px] leading-relaxed text-muted">
                                {study.summary}
                            </p>
                            <span className="font-mono text-[12px] text-accent transition-transform duration-200 group-hover:translate-x-0.5">
                                Open case study &rarr;
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {open && open.standaloneHtml && (
                <CaseStudyModal wide onClose={close}>
                    <CaseStudyEmbed src={open.standaloneHtml} />
                </CaseStudyModal>
            )}
        </>
    );
}
