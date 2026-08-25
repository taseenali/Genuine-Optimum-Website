import { buildOgImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "Genuine Optimum Terms of Service";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
    return buildOgImage("Terms of Service");
}
