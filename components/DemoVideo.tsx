"use client";

import { useEffect, useRef, useState } from "react";

/** A strip painted over part of the picture, positioned in percent of it. */
export interface VideoCover {
    /** Distance from the top of the picture, in percent. */
    top: number;
    /** Height of the strip, in percent of the picture. */
    height: number;
    /** CSS background. Pick a colour that matches the footage beneath it. */
    background: string;
}

/** Width in pixels of the tiny canvas the ambient backdrop is painted into. */
const AMBIENT_WIDTH = 96;
/** Minimum milliseconds between ambient repaints, about 20 per second. */
const AMBIENT_INTERVAL = 50;

/**
 * The product video surface: a muted, looping clip in a panel, with an
 * optional chrome bar above it.
 *
 * Things it has to get right beyond just playing:
 *
 * 1. Nothing is recorded yet for some slots, so with no `src` it renders
 *    a clearly labelled empty slot naming the file it expects. Dropping
 *    the file into /public/videos and setting `src` is the only change
 *    needed to go live.
 * 2. Continuously moving content longer than five seconds should offer a
 *    way to stop it (WCAG 2.2.2), so there is a pause control by default,
 *    and playback does not auto-start for anyone who has asked for
 *    reduced motion.
 * 3. Footage that does not match the slot's shape has to go somewhere.
 *    `fit="contain"` keeps the whole picture, and `ambient` fills the
 *    leftover space with a blurred, scaled-up copy of the video's own
 *    frames instead of leaving bars. See the notes on `ambient`.
 */
export default function DemoVideo({
    src,
    poster,
    chrome,
    label,
    aspect = "16 / 9",
    fit = "cover",
    maxHeight,
    showControl = true,
    bleed = false,
    ambient = false,
    videoAspect = "16 / 9",
    cover,
}: {
    src?: string;
    poster?: string;
    /** Mono text in the bar above the video. */
    chrome?: string;
    /** Describes what the capture shows. Used as the empty-slot caption and the a11y label. */
    label: string;
    aspect?: string;
    /**
     * "cover" fills the frame and crops whatever overflows. "contain"
     * shows the whole picture and leaves the spare space to the
     * background (black), for footage that must not be cropped.
     */
    fit?: "cover" | "contain";
    /** Caps the height (a CSS length, e.g. "80vh"). With fit="contain" the
     *  picture shrinks to fit rather than stretching the page. */
    maxHeight?: string;
    /** Show the Pause/Play button. On by default; turn it off only for
     *  decorative loops where a visible control is unwanted. */
    showControl?: boolean;
    /** Drop the frame so the video runs edge to edge across the page. */
    bleed?: boolean;
    /**
     * Fill the space beside a "contain"ed video with a blurred, enlarged
     * copy of the video's own frames, so a 16:9 picture can sit in a wider
     * slot without bars and without cropping. The picture itself is never
     * cropped or stretched. The backdrop is painted from a 96px-wide
     * canvas, not a second video, so it costs almost nothing to run.
     */
    ambient?: boolean;
    /** The footage's own shape. With `ambient`, the video element is sized
     *  to exactly this so the edge fade lands on the picture's real edges. */
    videoAspect?: string;
    /**
     * Hides something burned into the footage, such as a stray label, by
     * painting a strip over it. Only valid when the video fills the box
     * exactly (matching `aspect`, `fit="cover"`), since the strip is placed
     * in percent of the box. It is a patch over the picture, not an edit of
     * the file: re-export the video without the label and drop this.
     */
    cover?: VideoCover;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
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

    // Ambient backdrop: copy the video's current frame into a tiny canvas,
    // scaled to cover it, a few times a second. CSS then blurs and stretches
    // the canvas across the slot.
    useEffect(() => {
        if (!ambient || !src) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const box = boxRef.current;
        if (!video || !canvas || !box) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let frame = 0;
        let last = 0;
        let visible = true;

        // Match the canvas to the slot's shape, so what it paints is the
        // part of the video that would sit beside the picture.
        const size = () => {
            const rect = box.getBoundingClientRect();
            if (!rect.width) return;
            canvas.width = AMBIENT_WIDTH;
            canvas.height = Math.max(1, Math.round((AMBIENT_WIDTH * rect.height) / rect.width));
        };

        const paint = () => {
            if (video.readyState < 2 || !video.videoWidth) return;

            const cw = canvas.width;
            const ch = canvas.height;
            const videoAspect = video.videoWidth / video.videoHeight;
            const canvasAspect = cw / ch;

            // Cover: crop the source so it fills the canvas.
            let sw = video.videoWidth;
            let sh = video.videoHeight;
            let sx = 0;
            let sy = 0;
            if (videoAspect > canvasAspect) {
                sw = sh * canvasAspect;
                sx = (video.videoWidth - sw) / 2;
            } else {
                sh = sw / canvasAspect;
                sy = (video.videoHeight - sh) / 2;
            }
            ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch);
        };

        const tick = (now: number) => {
            if (now - last >= AMBIENT_INTERVAL) {
                paint();
                last = now;
            }
            frame = requestAnimationFrame(tick);
        };

        const start = () => {
            if (frame || !visible || video.paused) return;
            frame = requestAnimationFrame(tick);
        };

        const stop = () => {
            cancelAnimationFrame(frame);
            frame = 0;
        };

        const onPause = () => {
            stop();
            paint();
        };
        const onReady = () => {
            size();
            paint();
            start();
        };

        const resizeObserver = new ResizeObserver(() => {
            size();
            paint();
        });
        resizeObserver.observe(box);

        // No point repainting while the video is scrolled out of view.
        const visibilityObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) start();
            else stop();
        });
        visibilityObserver.observe(box);

        video.addEventListener("loadeddata", onReady);
        video.addEventListener("playing", start);
        video.addEventListener("pause", onPause);

        size();
        if (video.readyState >= 2) onReady();

        return () => {
            stop();
            resizeObserver.disconnect();
            visibilityObserver.disconnect();
            video.removeEventListener("loadeddata", onReady);
            video.removeEventListener("playing", start);
            video.removeEventListener("pause", onPause);
        };
    }, [ambient, src]);

    const toggle = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            void video.play();
        } else {
            video.pause();
        }
    };

    // Fade the picture's left and right edges into the backdrop, so the
    // seam between footage and fill is not a visible line.
    const feather = ambient
        ? "linear-gradient(to right, transparent 0%, #000 4%, #000 96%, transparent 100%)"
        : undefined;

    return (
        <figure className={`m-0 bg-panel ${bleed ? "" : "border border-line-2"}`}>
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

            {/* Explicit width: with aspect-ratio plus a max-height and an auto
                width, the browser carries the height cap across to the width
                and shrinks the box, leaving a blank strip beside the video.
                overflow-hidden keeps the enlarged backdrop inside the box. */}
            <div
                ref={boxRef}
                className={`relative ${fit === "contain" ? "bg-black" : ""} ${ambient ? "overflow-hidden" : ""}`}
                style={{ aspectRatio: aspect, maxHeight, width: "100%" }}
            >
                {src ? (
                    <>
                        {ambient ? (
                            <canvas
                                ref={canvasRef}
                                aria-hidden
                                className="absolute inset-0 size-full"
                                // Blur softens the 96px canvas into a glow; the scale
                                // hides the soft transparent rim blur leaves at the edges.
                                style={{
                                    filter: "blur(40px) saturate(1.2) brightness(1)",
                                    transform: "scale(1.2)",
                                }}
                            />
                        ) : null}
                        <video
                            ref={videoRef}
                            // With the ambient fill, the element is shrunk to the
                            // picture's own shape and centred, so its edges are the
                            // picture's edges and the fade below lands on them.
                            // Otherwise it fills the box.
                            className={
                                ambient
                                    ? "relative mx-auto h-full max-w-full object-contain"
                                    : `relative size-full ${fit === "contain" ? "object-contain" : "object-cover"}`
                            }
                            style={{
                                aspectRatio: ambient ? videoAspect : undefined,
                                maskImage: feather,
                                WebkitMaskImage: feather,
                            }}
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
                        {cover ? (
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-x-0"
                                // Faded at both ends so the patch has no hard side edges.
                                style={{
                                    top: `${cover.top}%`,
                                    height: `${cover.height}%`,
                                    background: cover.background,
                                    maskImage:
                                        "linear-gradient(to right, transparent 0%, #000 4%, #000 96%, transparent 100%)",
                                    WebkitMaskImage:
                                        "linear-gradient(to right, transparent 0%, #000 4%, #000 96%, transparent 100%)",
                                }}
                            />
                        ) : null}
                        {showControl ? (
                            <button
                                type="button"
                                onClick={toggle}
                                className="absolute bottom-3 right-3 rounded-control border border-line-3 bg-bg/80 px-2.5 py-1.5 font-mono text-[11px] text-text backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
                            >
                                {playing ? "Pause" : "Play"}
                            </button>
                        ) : null}
                    </>
                ) : (
                    <div className="slot flex size-full items-center justify-center p-6">
                        <p className="text-center font-mono text-[12px] leading-relaxed text-dim">
                            [ muted looped intro ]
                            <br />
                            {label}
                        </p>
                    </div>
                )}
            </div>
        </figure>
    );
}
