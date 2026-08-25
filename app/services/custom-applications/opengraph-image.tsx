import { buildOgImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "Custom Application Engineering | Genuine Optimum";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
    return buildOgImage("Custom Application Engineering", "Services");
}
