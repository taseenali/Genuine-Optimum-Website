import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    /** Optional; falls back to `date` when a post has never been edited. */
    dateModified?: string;
}

export function getAllPosts(): PostMeta[] {
    if (!fs.existsSync(BLOG_DIR)) return [];

    const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));

    const posts = files.map((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
        const { data } = matter(raw);
        return {
            slug,
            title: data.title as string,
            description: data.description as string,
            date: data.date as string,
            dateModified: data.dateModified as string | undefined,
        };
    });

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): PostMeta | undefined {
    return getAllPosts().find((post) => post.slug === slug);
}

export function getPostSource(slug: string): { meta: PostMeta; content: string } | undefined {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return undefined;

    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    return {
        meta: {
            slug,
            title: data.title as string,
            description: data.description as string,
            date: data.date as string,
            dateModified: data.dateModified as string | undefined,
        },
        content,
    };
}
