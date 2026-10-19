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
            // 192 and 512 are what browsers need to offer "install app".
            // Generated from the 122px logo, so the large sizes are upscaled;
            // swap in vector or larger source art for crisper edges.
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/icon-maskable-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
    };
}
