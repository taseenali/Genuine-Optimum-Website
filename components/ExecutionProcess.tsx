import Reveal from "./Reveal";
import { Container } from "./ui";

/**
 * The execution process, carried over from the previous home page
 * and rewritten to say what each stage produces rather than how
 * thorough we are. Same five stages, named for their deliverable.
 */
const STEPS = [
    {
        number: "01",
        title: "Discovery",
        description:
            "We map your goals, systems, and where the data actually lives before proposing anything.",
    },
    {
        number: "02",
        title: "Architecture",
        description:
            "A written system design with scope, stack, cost, and success criteria, agreed before anyone writes code.",
    },
    {
        number: "03",
        title: "Build",
        description:
            "Weekly working increments you can use and react to, rather than a status report and a reveal at the end.",
    },
    {
        number: "04",
        title: "Evaluation",
        description:
            "Accuracy, latency, security, and cost measured against the targets set in step two, not against a feeling.",
    },
    {
        number: "05",
        title: "Run",
        description:
            "Deployment, monitoring, and ongoing support once it is live, with the runbook handed to your team.",
    },
];

export default function ExecutionProcess() {
    return (
        <section id="process" className="border-t border-line">
            <Container className="grid grid-cols-1 items-start gap-14 py-24 md:py-28 lg:grid-cols-[minmax(0,360px)_1fr]">
                <Reveal className="flex flex-col gap-4">
                    <div className="eyebrow">How we work</div>
                    <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.06]">
                        Five stages, no surprises
                    </h2>
                    <p className="max-w-[42ch] text-base leading-relaxed text-muted">
                        Scope, cost, and what counts as finished are written down
                        before the build starts.
                    </p>
                </Reveal>

                <div className="flex flex-col border-t border-line">
                    {STEPS.map((step, i) => (
                        <Reveal key={step.number} delay={i * 0.04}>
                            <div className="grid grid-cols-[44px_1fr] gap-5 border-b border-line py-6 sm:grid-cols-[56px_1fr] sm:gap-6">
                                <div className="font-mono text-xs text-accent">
                                    {step.number}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-[19px]">{step.title}</h3>
                                    <p className="max-w-[62ch] text-[15px] leading-relaxed text-muted">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}
