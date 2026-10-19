import { buildOgImage, OG_SIZE } from "@/lib/ogImage";
import { PRODUCTS, getProduct } from "@/lib/products";

export const alt = "Genuine Optimum product";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
    return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = getProduct(slug);
    return buildOgImage(product ? product.name : "Product", product ? product.context : "Genuine Optimum");
}
