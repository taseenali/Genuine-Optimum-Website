import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPosts, getPostSource } from "@/lib/blog";
import { blogPostingJsonLd } from "@/lib/seo";

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostSource(slug);
    if (!post) return {};

    const title = `${post.meta.title} | Genuine Optimum Blog`;
    return {
        title,
        description: post.meta.description,
        openGraph: {
            title,
            description: post.meta.description,
            url: `https://genuineoptimum.com/blog/${slug}`,
            siteName: "Genuine Optimum",
            type: "article",
        },
        twitter: { card: "summary_large_image", title, description: post.meta.description },
        alternates: { canonical: `/blog/${slug}` },
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPostSource(slug);
    if (!post) notFound();

    const jsonLd = blogPostingJsonLd(
        post.meta.title,
        post.meta.description,
        slug,
        post.meta.date,
        post.meta.dateModified
    );

    return (
        <div className="relative min-h-screen bg-black text-white font-sans w-full">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pt-32 pb-24 px-6">
                    <Breadcrumbs
                        items={[
                            { label: "Blog", href: "/blog" },
                            { label: post.meta.title, href: `/blog/${slug}` },
                        ]}
                    />

                    <article className="max-w-3xl mx-auto blog-article">
                        <h1>{post.meta.title}</h1>
                        <p className="text-gray-500 text-sm">{post.meta.date}</p>
                        <MDXRemote source={post.content} />
                    </article>
                </main>

                <Footer />
            </div>
        </div>
    );
}
