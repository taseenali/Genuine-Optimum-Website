import { buildOgImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "Genuine Optimum Services";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
    return buildOgImage("What We Do", "Services");
}
