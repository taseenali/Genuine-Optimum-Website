import { buildOgImage, OG_SIZE } from "@/lib/ogImage";
import { getPostSource } from "@/lib/blog";

export const alt = "Genuine Optimum Blog";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostSource(slug);
    return buildOgImage(post?.meta.title ?? "Blog", "Blog");
}
