import { buildOgImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "Industries Genuine Optimum Works With";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
    return buildOgImage("Industries We Work With", "Who We Serve");
}
