"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The product demo surface: a muted, looping screen capture in a
 * framed panel with a chrome bar above it.
 *
 * Two things it has to get right beyond just playing:
 *
 * 1. Nothing is recorded yet, so with no `src` it renders a clearly
 *    labelled empty slot naming the file it expects. Dropping the
 *    capture into /public/videos and setting `src` is the only
 *    change needed to go live.
 * 2. Continuously moving content longer than five seconds needs a
 *    way to stop it (WCAG 2.2.2), so there is a real pause control,
 *    and playback does not auto-start for anyone who has asked for
 *    reduced motion.
 */
export default function DemoVideo({
    src,
    poster,
    chrome,
    label,
    aspect = "16 / 9",
}: {
    src?: string;
    poster?: string;
    /** Mono text in the bar above the video. */
    chrome?: string;
    /** Describes what the capture shows. Used as the empty-slot caption and the a11y label. */
    label: string;
    aspect?: string;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    // Mirrors the element's real state rather than leading it: the
    // video's own play/pause events drive this, so autoplay being
    // blocked by the browser still leaves the button label correct.
    const [playing, setPlaying] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            video.pause();
        }
    }, [src]);

    const toggle = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            void video.play();
        } else {
            video.pause();
        }
    };

    return (
        <figure className="m-0 border border-line-2 bg-panel">
            {chrome ? (
                <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
                    <span
                        aria-hidden
                        className="size-2 shrink-0 rounded-full bg-accent"
                    />
                    <span className="truncate font-mono text-[11px] text-dim">
                        {chrome}
                    </span>
                </div>
            ) : null}

            <div className="relative" style={{ aspectRatio: aspect }}>
                {src ? (
                    <>
                        <video
                            ref={videoRef}
                            className="size-full object-cover"
                            src={src}
                            poster={poster}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label={label}
                            onPlay={() => setPlaying(true)}
                            onPause={() => setPlaying(false)}
                        />
                        <button
                            type="button"
                            onClick={toggle}
                            className="absolute bottom-3 right-3 rounded-control border border-line-3 bg-bg/80 px-2.5 py-1.5 font-mono text-[11px] text-text backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
                        >
                            {playing ? "Pause" : "Play"}
                        </button>
                    </>
                ) : (
                    <div className="slot flex size-full items-center justify-center p-6">
                        <p className="text-center font-mono text-[12px] leading-relaxed text-dim">
                            [ muted looped demo ]
                            <br />
                            {label}
                        </p>
                    </div>
                )}
            </div>
        </figure>
    );
}
