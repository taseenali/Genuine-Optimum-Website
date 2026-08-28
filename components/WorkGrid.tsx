"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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

const MARQUEE_SPEED = 50; // px/second at full speed

/** Auto-scrolls its children left, forever. Hovering eases the speed down
 * to a smooth stop instead of an instant freeze (and back up on leave),
 * driven by requestAnimationFrame rather than a CSS animation so the
 * deceleration itself can be smooth. */
function TemplatesMarquee({ children }: { children: React.ReactNode }) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const positionRef = useRef(0);
    const speedRef = useRef(MARQUEE_SPEED);
    const targetSpeedRef = useRef(MARQUEE_SPEED);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const track = trackRef.current;
        if (!track) return;

        let frame: number;
        let last = performance.now();

        const tick = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.1);
            last = now;

            // Exponential smoothing toward the target speed: a fixed fraction
            // of the remaining gap is closed each frame, so the deceleration
            // (and re-acceleration) reads as a gradual coast rather than a
            // step change, however long the hover lasts.
            speedRef.current += (targetSpeedRef.current - speedRef.current) * (1 - Math.exp(-dt / 0.35));

            const halfWidth = track.scrollWidth / 2;
            if (halfWidth > 0) {
                positionRef.current = (positionRef.current + speedRef.current * dt) % halfWidth;
                track.style.transform = `translateX(-${positionRef.current}px)`;
            }

            frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <div
            ref={viewportRef}
            className="overflow-hidden"
            onMouseEnter={() => {
                targetSpeedRef.current = 0;
            }}
            onMouseLeave={() => {
                targetSpeedRef.current = MARQUEE_SPEED;
            }}
        >
            <div ref={trackRef} className="flex w-max gap-6">
                {children}
            </div>
        </div>
    );
}

export default function WorkGrid({ products, templates }: { products: WorkCard[]; templates: WorkCard[] }) {
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
        if (!study.standaloneHtml) return; // no embed available, let the Link navigate to the full page
        e.preventDefault();
        window.history.pushState(null, "", `/work/${study.slug}`);
        setOpen(study);
    }

    function renderCard(study: WorkCard) {
        return (
            <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                onClick={(e) => handleClick(e, study)}
                className="group block rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-colors duration-300 hover:border-purple-500/40 hover:bg-white/10"
            >
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {study.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{study.summary}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-600 text-xs">
                    {study.clientLabel && <span>{study.clientLabel}</span>}
                    {study.services.map((slug) => (
                        <span key={slug} className="text-purple-400/70">{serviceLabel(slug)}</span>
                    ))}
                </div>
            </Link>
        );
    }

    function renderTemplateCard(study: WorkCard, keySuffix: string) {
        return (
            <Link
                key={`${study.slug}-${keySuffix}`}
                href={`/work/${study.slug}`}
                onClick={(e) => handleClick(e, study)}
                className="group block w-80 flex-none overflow-hidden rounded-2xl border border-white/10 transition-colors duration-300 hover:border-purple-500/40"
            >
                {study.coverImage && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                        <Image
                            src={study.coverImage}
                            alt={study.title}
                            fill
                            sizes="320px"
                            className="object-cover object-top"
                        />
                    </div>
                )}
            </Link>
        );
    }

    return (
        <>
            {products.length > 0 && (
                <section className="mb-16">
                    <h2 className="text-sm uppercase tracking-[0.2em] text-gray-500 font-bold mb-6">Our Products</h2>
                    <div className="space-y-6">{products.map(renderCard)}</div>
                </section>
            )}

            {templates.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-[0.2em] text-gray-500 font-bold mb-6">Website Templates</h2>
                    <TemplatesMarquee>
                        {templates.map((study) => renderTemplateCard(study, "a"))}
                        {templates.map((study) => renderTemplateCard(study, "b"))}
                    </TemplatesMarquee>
                </section>
            )}

            {open && open.standaloneHtml && (
                <CaseStudyModal wide onClose={close}>
                    <CaseStudyEmbed src={open.standaloneHtml} />
                </CaseStudyModal>
            )}
        </>
    );
}
