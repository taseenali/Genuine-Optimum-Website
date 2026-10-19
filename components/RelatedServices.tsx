"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SERVICES } from "@/lib/services";

export default function RelatedServices({ currentSlug }: { currentSlug: string }) {
    const related = SERVICES.filter((service) => service.slug !== currentSlug);

    return (
        <section className="px-6 mb-32 max-w-[var(--page-max)] mx-auto">
            <div className="mb-12 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-accent font-bold mb-4">One Connected System</p>
                <h2 className={`text-2xl md:text-3xl font-bold text-white`}>
                    Related Services
                </h2>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                {related.map((service, serviceIndex) => (
                    <Reveal delay={serviceIndex * 0.1} key={service.slug}>
                        <Link
                            href={`/services/${service.slug}`}
                            className="group relative block h-full border border-line bg-panel p-7 transition-all duration-300 hover:border-line-3 hover:bg-panel-hover"
                        >
                            <h3 className={`text-lg font-bold text-white mb-2`}>
                                {service.shortTitle}
                            </h3>
                            <p className="text-muted text-sm leading-relaxed mb-4">
                                {service.description}
                            </p>
                            <span className="inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:text-accent-hi transition-colors">
                                Learn more
                                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </Link>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
