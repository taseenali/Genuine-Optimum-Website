/**
 * Literal palette values for the two places that cannot read CSS
 * custom properties: the Open Graph image template (rendered by
 * Satori) and the PWA manifest.
 *
 * These mirror the palettes in app/globals.css. When switching the
 * site's palette there, switch ACTIVE here to match, or the social
 * cards and the mobile browser chrome keep the old colours.
 */

export interface Palette {
    bg: string;
    text: string;
    accent: string;
    /** Accent at low alpha, for the OG card's corner wash. */
    accentWash: string;
}

export const PALETTES = {
    lime: {
        bg: "#0e0f0c",
        text: "#f0f2e8",
        accent: "#ccff00",
        accentWash: "rgba(204,255,0,0.18)",
    },
    slate: {
        bg: "#0d1117",
        text: "#e9edf2",
        accent: "#4d9af7",
        accentWash: "rgba(77,154,247,0.22)",
    },
    violet: {
        bg: "#101013",
        text: "#f2f2f5",
        accent: "#a855f7",
        accentWash: "rgba(168,85,247,0.25)",
    },
} satisfies Record<string, Palette>;

/** Keep in step with the palette on :root in app/globals.css. */
export const ACTIVE: Palette = PALETTES.lime;
