import { buildOgImage, OG_SIZE } from "@/lib/ogImage";
import { getCaseStudySource } from "@/lib/caseStudies";

export const alt = "Genuine Optimum Case Study";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const study = getCaseStudySource(slug);
    return buildOgImage(study?.meta.title ?? "Our Work", "Case Study");
}
