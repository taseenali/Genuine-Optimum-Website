import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPosts } from "@/lib/blog";

const TITLE = "Blog | Genuine Optimum";
const DESCRIPTION =
    "Insights on web development, SEO, and building connected digital systems, from the Genuine Optimum team.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: "https://genuineoptimum.com/blog",
        siteName: "Genuine Optimum",
        type: "website",
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
    alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
    const posts = getAllPosts();

    return (
        <div className="relative min-h-screen bg-black text-white font-sans w-full">
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pt-32 pb-24 px-6">
                    <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />

                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <p className="text-sm uppercase tracking-[0.3em] text-purple-400 font-bold mb-4">Insights</p>
                            <h1 className="text-4xl md:text-5xl font-bold text-white">Blog</h1>
                        </div>

                        {posts.length === 0 ? (
                            <div className="text-center py-20 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
                                <p className="text-gray-400 text-lg">
                                    No posts published yet. Check back soon for insights on web development, SEO, and connected digital systems.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {posts.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="group block rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-colors duration-300 hover:border-purple-500/40 hover:bg-white/10"
                                    >
                                        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-3">{post.description}</p>
                                        <p className="text-gray-600 text-xs">{post.date}</p>
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
