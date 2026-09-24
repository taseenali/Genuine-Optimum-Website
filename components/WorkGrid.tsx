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
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {templates.map((study) => (
                    <Link
                        key={study.slug}
                        href={`/work/${study.slug}`}
                        onClick={(e) => handleClick(e, study)}
                        className="group flex flex-col border border-line transition-colors hover:border-line-3"
                    >
                        <div className="relative aspect-16/11 overflow-hidden bg-bg">
                            {study.coverImage ? (
                                <Image
                                    src={study.coverImage}
                                    alt=""
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                    className="object-cover object-top transition-opacity duration-300 group-hover:opacity-90"
                                />
                            ) : (
                                <div className="slot flex size-full items-center justify-center">
                                    <span className="font-mono text-[11.5px] text-dim">
                                        [ site screenshot ]
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-1 flex-col gap-2 border-t border-line bg-panel p-5">
                            <h3 className="text-[15.5px] font-medium text-text">
                                {study.title}
                            </h3>
                            <p className="text-[13.5px] leading-relaxed text-dim">
                                {study.summary}
                            </p>
                            <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 font-mono text-[11px] text-faint">
                                {study.clientLabel ? (
                                    <span>{study.clientLabel}</span>
                                ) : null}
                                {study.services.map((slug) => (
                                    <span key={slug} className="text-accent/70">
                                        {serviceLabel(slug)}
                                    </span>
                                ))}
                            </div>
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
