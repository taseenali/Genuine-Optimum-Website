import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPosts } from "@/lib/blog";

const TITLE = "Blog | Genuine Optimum";
const DESCRIPTION =
    "Insights on web development, SEO, and building connected digital systems, from the Genuine Optimum team.";

// An empty index (no posts yet) is a thin page, so it asks not to be indexed
// until there is something on it. Links on it are still followed.
export function generateMetadata(): Metadata {
    const hasPosts = getAllPosts().length > 0;
    return {
    title: TITLE,
    description: DESCRIPTION,
    ...(hasPosts ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: "https://www.genuineoptimum.com/blog",
        siteName: "Genuine Optimum",
        type: "website",
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
    alternates: { canonical: "/blog" },
    };
}

export default function BlogIndexPage() {
    const posts = getAllPosts();

    return (
        <div className="relative min-h-screen bg-bg text-white font-sans w-full">
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pb-24">
                    <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />

                    <div className="max-w-3xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <p className="text-sm uppercase tracking-[0.3em] text-accent font-bold mb-4">Insights</p>
                            <h1 className="text-4xl md:text-5xl font-bold text-white">Blog</h1>
                        </div>

                        {posts.length === 0 ? (
                            <div className="text-center py-20 border border-line bg-panel">
                                <p className="text-muted text-lg">
                                    No posts published yet. Check back soon for insights on web development, SEO, and connected digital systems.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {posts.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="group block border border-line bg-panel p-6 transition-colors duration-300 hover:border-line-3 hover:bg-panel-hover"
                                    >
                                        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-accent-hi transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-muted text-sm leading-relaxed mb-3">{post.description}</p>
                                        <p className="text-dim text-xs">{post.date}</p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
