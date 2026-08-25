import { buildOgImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "About Genuine Optimum";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
    return buildOgImage("About Us", "Genuine Optimum");
}
