import type { MetadataRoute } from "next";
import { ACTIVE } from "@/lib/palette";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Genuine Optimum",
        short_name: "Genuine Optimum",
        description: "Digital engineering and growth systems for modern businesses.",
        start_url: "/",
        display: "standalone",
        background_color: ACTIVE.bg,
        theme_color: ACTIVE.bg,
        icons: [
            {
                src: "/icon.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                src: "/apple-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };
}
