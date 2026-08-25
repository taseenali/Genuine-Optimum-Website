import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Shared OG image template. No external assets or custom font files:
 * satori's default sans-serif renders fine at this size, and skipping a
 * bundled font keeps every page's image generation fast and dependency-free.
 */
export function buildOgImage(title: string, eyebrow?: string) {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "#0a0a0a",
                    backgroundImage:
                        "radial-gradient(circle at 15% 15%, rgba(168,85,247,0.25), transparent 60%)",
                    padding: "80px",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        fontSize: 30,
                        fontWeight: 700,
                        color: "#ffffff",
                        letterSpacing: "-0.01em",
                    }}
                >
                    <div
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: 999,
                            backgroundColor: "#a855f7",
                        }}
                    />
                    Genuine Optimum
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    {eyebrow && (
                        <div
                            style={{
                                fontSize: 26,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.15em",
                                color: "#a855f7",
                            }}
                        >
                            {eyebrow}
                        </div>
                    )}
                    <div
                        style={{
                            fontSize: 64,
                            fontWeight: 800,
                            color: "#ffffff",
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                            maxWidth: "1000px",
                        }}
                    >
                        {title}
                    </div>
                </div>
            </div>
        ),
        { ...OG_SIZE }
    );
}
