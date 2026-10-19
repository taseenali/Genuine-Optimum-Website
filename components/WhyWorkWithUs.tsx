"use client";

import Reveal from "@/components/Reveal";


const reasons = [
    {
        title: "Engineering-first approach",
        description: "We focus on building reliable digital infrastructure that supports long-term growth.",
    },
    {
        title: "Marketing + technology integration",
        description: "Our solutions combine engineering with growth strategies.",
    },
    {
        title: "Scalable systems",
        description: "We design systems that evolve as your business grows.",
    },
    {
        title: "Long-term digital infrastructure",
        description: "Our goal is to build platforms that support sustainable digital transformation.",
    },
];

export default function WhyWorkWithUs() {
    return (
        <section className="px-6 py-24 max-w-[var(--page-max)] mx-auto">
            <div className="mb-16 inline-block">
                <h2 className={`text-3xl md:text-4xl font-bold text-white mb-3`}>
                    Why Work With Us
                </h2>
                <div className="w-full h-1 bg-panel-hover relative rounded-full overflow-hidden">
                    <div className="absolute top-0 bottom-0 w-20 bg-accent rounded-full bar-sweep" />
                </div>
            </div>

            <div className="max-w-3xl space-y-8">
                {reasons.map((reason, index) => (
                    <Reveal delay={index * 0.1} key={index} className="flex gap-6 items-start relative border-l border-line pl-6">
                        <div className="flex-grow">
                            <h3 className={`text-lg md:text-xl font-bold text-white mb-1.5`}>
                                {reason.title}
                            </h3>
                            <p className="text-muted leading-relaxed text-sm md:text-base max-w-2xl">
                                {reason.description}
                            </p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
