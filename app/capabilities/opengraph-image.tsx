import { buildOgImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "What Genuine Optimum builds";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
    return buildOgImage("What we can build for you", "Capabilities");
}
