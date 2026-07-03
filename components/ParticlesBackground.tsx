"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

const Particles = dynamic(() => import("./Particles"), { ssr: false });

function StaticGlowFallback() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
            <div className="w-full h-full max-w-4xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-cyan-500/10 blur-[100px] opacity-60" />
        </div>
    );
}

export default function ParticlesBackground({ particleCount = 300 }: { particleCount?: number }) {
    const prefersReducedMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // matchMedia doesn't exist during SSR, so the initial value can't be
        // computed at render time — this effect is the sync point with that
        // browser-only API, not a derivable-during-render value.
        const query = window.matchMedia("(max-width: 767px)");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMobile(query.matches);
        const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        query.addEventListener("change", handleChange);
        return () => query.removeEventListener("change", handleChange);
    }, []);

    const useStaticFallback = prefersReducedMotion || isMobile;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {useStaticFallback ? (
                <StaticGlowFallback />
            ) : (
                <Particles
                    particleColors={["#ffffff"]}
                    particleCount={particleCount}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                    pixelRatio={2}
                />
            )}
        </div>
    );
}
