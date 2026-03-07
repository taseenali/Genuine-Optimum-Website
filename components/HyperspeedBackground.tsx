"use client";

import dynamic from 'next/dynamic';

// Dynamically import Hyperspeed without SSR to avoid hydration errors with WebGL/window
const Hyperspeed = dynamic(() => import("./reactbits/Hyperspeed"), {
    ssr: false,
});

export default function HyperspeedBackground(props: any) {
    return <Hyperspeed {...props} />;
}
