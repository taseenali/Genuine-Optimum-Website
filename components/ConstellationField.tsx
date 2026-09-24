"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background: a field of depth-sorted nodes joined by a faint
 * web, which lights up around the pointer.
 *
 * This replaces the old WebGL point cloud, which drifted on all
 * three axes with a large amplitude and drew no connections. The
 * motion here is deliberately near-static — nodes travel a few
 * pixels per second — so the field reads as structure rather than
 * as an animation demanding attention. All the visible change comes
 * from the pointer.
 *
 * Canvas 2D rather than WebGL: at this node count the cost is
 * trivial, and it keeps the site free of a rendering dependency.
 *
 * Colours are read from the CSS custom properties at runtime, so
 * the field follows whatever palette globals.css defines without
 * being told about it.
 */

interface Node {
    /** Base position in CSS pixels; drift is applied on top. */
    x: number;
    y: number;
    /** Velocity in px/sec. Small by design. */
    vx: number;
    vy: number;
    /** Depth 0..1. Drives radius, opacity and parallax. */
    z: number;
    /** Pinned nodes ignore drift so they stay where they were placed. */
    fixed?: boolean;
}

/**
 * A node placed at an exact spot rather than left to the random
 * spread. Positions are fractions of the hero, not pixels, so a
 * placement holds at every screen size.
 *
 * To find the numbers: run `npm run dev` and open the home page
 * with `?grid` on the URL — http://localhost:3000/?grid — which
 * overlays a labelled 10% grid and prints the cursor position as
 * fractions. Hover where you want a node and read the values off.
 * The overlay is development-only and never ships.
 */
interface Anchor {
    /** 0 = left edge, 1 = right edge. */
    x: number;
    /** 0 = top edge, 1 = bottom edge. */
    y: number;
    /** Nodes to place here. Default 1. */
    count?: number;
    /** Scatter radius as a fraction of the shorter edge. 0 = exact. */
    spread?: number;
    /** Depth 0..1: bigger and brighter as it approaches 1. Random if omitted. */
    z?: number;
    /** Set false to let the placement drift with the rest of the field. */
    fixed?: boolean;
}

/**
 * Exact placements, added on top of the random spread.
 *
 * Empty by design — the field fills itself. Add entries here to put
 * nodes somewhere specific, for example:
 *
 *   { x: 0.78, y: 0.24 },                         // one node
 *   { x: 0.62, y: 0.7, count: 6, spread: 0.08 },  // a loose cluster
 *   { x: 0.9,  y: 0.15, z: 1, count: 3 },         // bright and forward
 *
 * Nodes closer together than LINK_DIST will link to each other, so
 * a cluster with a spread under about 0.1 reads as a connected
 * constellation rather than as loose dots.
 */
const ANCHORS: Anchor[] = [];

/** Nodes per 100,000 css px², clamped by MIN/MAX below. */
const DENSITY = 11.7;
const MIN_NODES = 39;
const MAX_NODES = 195;

/**
 * Extra nodes added on top of the even spread, weighted toward the
 * right of the hero. The headline fills the left, so that side is
 * where the field looks bare. Expressed as a share of the base
 * count and added to it, so the rest of the field keeps its density
 * rather than being thinned out to fill the gap.
 */
const RIGHT_SHARE = 0.4;
/** Horizontal pull. Higher moves the weighting further right. */
const RIGHT_BIAS_X = 1.8;
/**
 * Vertical pull, kept close to 1 so the extra nodes run the full
 * height of the right side. Raising it toward RIGHT_BIAS_X gathers
 * them into the top corner and leaves the lower right bare.
 */
const RIGHT_BIAS_Y = 1.15;
/** Below this width the layout stacks and there is no bare side. */
const RIGHT_MIN_WIDTH = 900;

/** Max distance between two nodes for a link to be drawn. */
const LINK_DIST = 132;
/** Radius around the pointer within which links light up. */
const POINTER_RADIUS = 200;
/** Parallax travel in px for the deepest node. */
const PARALLAX = 14;

const REST_LINK_ALPHA = 0.055;
const REST_NODE_ALPHA = 0.3;

function parseRgb(value: string): [number, number, number] {
    const hex = value.trim();
    const m = /^#?([0-9a-f]{6})$/i.exec(hex);
    if (m) {
        const int = parseInt(m[1], 16);
        return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
    }
    const rgb = /rgba?\(([^)]+)\)/.exec(hex);
    if (rgb) {
        const parts = rgb[1].split(",").map((n) => parseInt(n, 10));
        return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
    }
    return [148, 163, 180];
}

export default function ConstellationField({
    className = "",
}: {
    className?: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        const styles = getComputedStyle(document.documentElement);
        const rest = parseRgb(styles.getPropertyValue("--dim") || "#6b7889");
        const live = parseRgb(styles.getPropertyValue("--accent") || "#4d9af7");

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Coordinate finder for authoring ANCHORS. Development only and
        // opt-in via ?grid, so it cannot reach a production build.
        const showGrid =
            process.env.NODE_ENV === "development" &&
            new URLSearchParams(window.location.search).has("grid");

        let nodes: Node[] = [];
        let width = 0;
        let height = 0;
        let frame = 0;
        let last = 0;
        let running = false;

        // Pointer state in CSS pixels. `strength` eases 0..1 so the web
        // fades in and out instead of snapping when the pointer
        // enters or leaves.
        const pointer = { x: 0, y: 0, tx: 0, ty: 0, strength: 0, target: 0 };

        function build() {
            const rect = canvas!.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            if (width === 0 || height === 0) return;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas!.width = Math.round(width * dpr);
            canvas!.height = Math.round(height * dpr);
            ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

            const target = Math.round((width * height) / 100000 * DENSITY);
            const base = Math.max(MIN_NODES, Math.min(MAX_NODES, target));
            const extra =
                width >= RIGHT_MIN_WIDTH ? Math.round(base * RIGHT_SHARE) : 0;

            nodes = Array.from({ length: base + extra }, (_, i) => {
                // The trailing `extra` nodes are sampled with a soft
                // falloff toward the right rather than dropped into a
                // corner, so the result reads as uneven density instead
                // of a clump.
                const weighted = i >= base;
                const rx = Math.random();
                const ry = Math.random();

                return {
                    x: (weighted ? 1 - Math.pow(rx, RIGHT_BIAS_X) : rx) * width,
                    y: (weighted ? Math.pow(ry, RIGHT_BIAS_Y) : ry) * height,
                    // A few px per second: perceptible over many seconds,
                    // never as movement you catch out of the corner of an eye.
                    vx: (Math.random() - 0.5) * 5,
                    vy: (Math.random() - 0.5) * 5,
                    z: Math.random(),
                };
            });

            // Exact placements go in last, so they sit on top of the
            // random spread rather than being displaced by it.
            const shortEdge = Math.min(width, height);
            for (const anchor of ANCHORS) {
                const count = Math.max(1, anchor.count ?? 1);
                const spread = (anchor.spread ?? 0) * shortEdge;

                for (let i = 0; i < count; i++) {
                    // Polar scatter, so a cluster reads as round rather
                    // than as a square patch.
                    const angle = Math.random() * Math.PI * 2;
                    const radius = spread * Math.sqrt(Math.random());

                    nodes.push({
                        x: anchor.x * width + Math.cos(angle) * radius,
                        y: anchor.y * height + Math.sin(angle) * radius,
                        vx: (Math.random() - 0.5) * 5,
                        vy: (Math.random() - 0.5) * 5,
                        z: anchor.z ?? Math.random(),
                        fixed: anchor.fixed ?? true,
                    });
                }
            }
        }

        function draw(now: number) {
            const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
            last = now;

            ctx!.clearRect(0, 0, width, height);

            pointer.strength += (pointer.target - pointer.strength) * Math.min(dt * 5, 1);
            pointer.x += (pointer.tx - pointer.x) * Math.min(dt * 7, 1);
            pointer.y += (pointer.ty - pointer.y) * Math.min(dt * 7, 1);

            // Parallax offset: deeper nodes shift further, which is what
            // sells the depth when the pointer moves.
            const px = pointer.strength
                ? ((pointer.x / width) - 0.5) * PARALLAX
                : 0;
            const py = pointer.strength
                ? ((pointer.y / height) - 0.5) * PARALLAX
                : 0;

            const drawn: { x: number; y: number; z: number; heat: number }[] = [];

            for (const node of nodes) {
                if (!reduced && !node.fixed) {
                    node.x += node.vx * dt;
                    node.y += node.vy * dt;

                    // Wrap rather than bounce: bouncing creates visible
                    // turning points that draw the eye to the edges.
                    if (node.x < -20) node.x = width + 20;
                    else if (node.x > width + 20) node.x = -20;
                    if (node.y < -20) node.y = height + 20;
                    else if (node.y > height + 20) node.y = -20;
                }

                const x = node.x + px * node.z;
                const y = node.y + py * node.z;

                const dx = x - pointer.x;
                const dy = y - pointer.y;
                const dist = Math.hypot(dx, dy);
                const heat =
                    pointer.strength > 0.001 && dist < POINTER_RADIUS
                        ? (1 - dist / POINTER_RADIUS) * pointer.strength
                        : 0;

                drawn.push({ x, y, z: node.z, heat });
            }

            // ── Links ────────────────────────────────────────────────
            // Every near pair gets a barely-there resting line so the
            // field has texture at rest; pairs near the pointer brighten
            // and shift to the accent. Drawn before the nodes so the
            // nodes sit on top of their own connections.
            for (let i = 0; i < drawn.length; i++) {
                const a = drawn[i];
                for (let j = i + 1; j < drawn.length; j++) {
                    const b = drawn[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    if (Math.abs(dx) > LINK_DIST || Math.abs(dy) > LINK_DIST) continue;

                    const dist = Math.hypot(dx, dy);
                    if (dist > LINK_DIST) continue;

                    const closeness = 1 - dist / LINK_DIST;
                    const heat = Math.max(a.heat, b.heat);
                    const alpha = REST_LINK_ALPHA * closeness + heat * closeness * 0.55;
                    if (alpha < 0.004) continue;

                    const c = heat > 0.02 ? live : rest;
                    ctx!.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
                    ctx!.lineWidth = heat > 0.35 ? 1 : 0.7;
                    ctx!.beginPath();
                    ctx!.moveTo(a.x, a.y);
                    ctx!.lineTo(b.x, b.y);
                    ctx!.stroke();
                }
            }

            // ── Nodes ────────────────────────────────────────────────
            for (const node of drawn) {
                const radius = 0.7 + node.z * 1.5 + node.heat * 1.1;
                const alpha =
                    REST_NODE_ALPHA * (0.45 + node.z * 0.55) + node.heat * 0.6;
                const c = node.heat > 0.05 ? live : rest;

                ctx!.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${Math.min(alpha, 0.95)})`;
                ctx!.beginPath();
                ctx!.arc(node.x, node.y, radius, 0, Math.PI * 2);
                ctx!.fill();

                // A soft halo only on the nodes the pointer is closest to,
                // so the highlight has a centre instead of a flat wash.
                if (node.heat > 0.45) {
                    ctx!.fillStyle = `rgba(${live[0]},${live[1]},${live[2]},${(node.heat - 0.45) * 0.18})`;
                    ctx!.beginPath();
                    ctx!.arc(node.x, node.y, radius + 5, 0, Math.PI * 2);
                    ctx!.fill();
                }
            }

            if (showGrid) drawGrid();

            // With reduced motion the field is static, so keep rendering
            // only while the pointer is still affecting something.
            const idle = reduced && pointer.strength < 0.002 && pointer.target === 0;
            if (idle) {
                running = false;
                return;
            }
            frame = requestAnimationFrame(draw);
        }

        /**
         * Labelled 10% grid plus a live cursor readout, for reading off
         * the fractions that go into ANCHORS. Development only.
         */
        function drawGrid() {
            const c = ctx!;
            c.save();
            c.setLineDash([3, 4]);
            c.lineWidth = 1;
            c.font = "10px ui-monospace, monospace";

            for (let i = 1; i < 10; i++) {
                const f = i / 10;
                const gx = Math.round(width * f) + 0.5;
                const gy = Math.round(height * f) + 0.5;
                const major = i === 5;

                c.strokeStyle = major
                    ? "rgba(77,154,247,0.4)"
                    : "rgba(148,163,180,0.18)";

                c.beginPath();
                c.moveTo(gx, 0);
                c.lineTo(gx, height);
                c.moveTo(0, gy);
                c.lineTo(width, gy);
                c.stroke();

                c.setLineDash([]);
                c.fillStyle = "rgba(148,163,180,0.65)";
                c.fillText(f.toFixed(1), gx + 3, 12);
                c.fillText(f.toFixed(1), 3, gy - 3);
                c.setLineDash([3, 4]);
            }

            c.setLineDash([]);

            if (pointer.target > 0) {
                const fx = (pointer.tx / width).toFixed(3);
                const fy = (pointer.ty / height).toFixed(3);
                const text = `{ x: ${fx}, y: ${fy} }`;
                const w = c.measureText(text).width;

                // Flip the chip to the other side of the cursor near an
                // edge so it never runs off the canvas.
                const bx = Math.min(pointer.tx + 14, width - w - 18);
                const by = Math.max(pointer.ty - 10, 20);

                c.fillStyle = "rgba(13,17,23,0.92)";
                c.fillRect(bx - 6, by - 13, w + 12, 20);
                c.strokeStyle = "rgba(77,154,247,0.55)";
                c.lineWidth = 1;
                c.strokeRect(bx - 6, by - 13, w + 12, 20);
                c.fillStyle = "#4d9af7";
                c.fillText(text, bx, by);
            }

            c.restore();
        }

        function start() {
            if (running) return;
            running = true;
            last = 0;
            frame = requestAnimationFrame(draw);
        }

        function stop() {
            running = false;
            cancelAnimationFrame(frame);
        }

        function onPointerMove(e: PointerEvent) {
            const rect = canvas!.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;

            if (inside) {
                // First entry: place the pointer without easing, so the web
                // does not sweep in from wherever it was last seen.
                if (pointer.target === 0) {
                    pointer.x = x;
                    pointer.y = y;
                }
                pointer.tx = x;
                pointer.ty = y;
                pointer.target = 1;
                start();
            } else {
                pointer.target = 0;
            }
        }

        function onPointerLeave() {
            pointer.target = 0;
        }

        function onResize() {
            build();
            if (reduced) {
                // Static field still needs one frame after a resize.
                last = 0;
                requestAnimationFrame(draw);
            }
        }

        // A ResizeObserver, not just window.resize: the hero grows when
        // the webfont finishes loading and the headline reflows, which
        // resizes this element without ever resizing the window. Without
        // this the bitmap keeps its old dimensions and renders blurred
        // and mis-scaled.
        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(canvas);

        build();
        if (reduced) {
            requestAnimationFrame(draw);
        } else {
            start();
        }

        // Only animate while the hero is actually on screen.
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!reduced) start();
                } else {
                    stop();
                }
            },
            { threshold: 0 }
        );
        observer.observe(canvas);

        const onVisibility = () => {
            if (document.hidden) stop();
            else if (!reduced) start();
        };

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("blur", onPointerLeave);
        document.addEventListener("visibilitychange", onVisibility);
        window.addEventListener("resize", onResize);

        return () => {
            stop();
            observer.disconnect();
            resizeObserver.disconnect();
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("blur", onPointerLeave);
            document.removeEventListener("visibilitychange", onVisibility);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 size-full ${className}`}
        />
    );
}
