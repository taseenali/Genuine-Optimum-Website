import { buildOgImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "AI & Data Systems | Genuine Optimum";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
    return buildOgImage("AI & Data Systems", "Services");
}
