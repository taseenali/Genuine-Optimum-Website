import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CASE_STUDY_DIR = path.join(process.cwd(), "content", "case-studies");

export type ClientDisplay = "named" | "anonymized" | "confidential";

export interface CaseStudyTestimonial {
    quote: string;
    author?: string;
}

export type CaseStudyKind = "template" | "product";

export interface CaseStudyMeta {
    slug: string;
    title: string;
    /** "template" = anonymized client work shown as a capability example. "product" = built and owned by Genuine Optimum. */
    kind: CaseStudyKind;
    /** How the client may be referenced: drives what's actually rendered. Not applicable to kind "product". */
    clientDisplay: ClientDisplay;
    /** Real client name. Only read/rendered when clientDisplay is "named". */
    client?: string;
    /** e.g. "a regional logistics company". Required when clientDisplay is "anonymized". */
    anonymizedLabel?: string;
    industry?: string;
    region?: string;
    services: string[];
    summary: string;
    date: string;
    dateModified?: string;
    outcomes?: string[];
    testimonial?: CaseStudyTestimonial;
    coverImage?: string;
    /** Path under /public to a self-contained HTML document (fonts/colors/layout as authored) embedded via iframe instead of the MDX body. */
    standaloneHtml?: string;
}

/** What's safe to print as the client line, resolved once so no page has to re-derive it. */
export function resolveClientLabel(meta: CaseStudyMeta): string | undefined {
    if (meta.kind === "product") return undefined;
    if (meta.clientDisplay === "named") return meta.client;
    if (meta.clientDisplay === "anonymized") return meta.anonymizedLabel;
    return undefined;
}

function parseMeta(slug: string, data: Record<string, unknown>): CaseStudyMeta {
    return {
        slug,
        title: data.title as string,
        kind: (data.kind as CaseStudyKind) ?? "template",
        clientDisplay: (data.clientDisplay as ClientDisplay) ?? "confidential",
        client: data.client as string | undefined,
        anonymizedLabel: data.anonymizedLabel as string | undefined,
        industry: data.industry as string | undefined,
        region: data.region as string | undefined,
        services: (data.services as string[]) ?? [],
        summary: data.summary as string,
        date: data.date as string,
        dateModified: data.dateModified as string | undefined,
        outcomes: data.outcomes as string[] | undefined,
        testimonial: data.testimonial as CaseStudyTestimonial | undefined,
        coverImage: data.coverImage as string | undefined,
        standaloneHtml: data.standaloneHtml as string | undefined,
    };
}

export function getAllCaseStudies(): CaseStudyMeta[] {
    if (!fs.existsSync(CASE_STUDY_DIR)) return [];

    const files = fs.readdirSync(CASE_STUDY_DIR).filter((file) => file.endsWith(".mdx"));

    const studies = files.map((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const raw = fs.readFileSync(path.join(CASE_STUDY_DIR, file), "utf8");
        const { data } = matter(raw);
        return parseMeta(slug, data);
    });

    return studies.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getCaseStudySource(slug: string): { meta: CaseStudyMeta; content: string } | undefined {
    const filePath = path.join(CASE_STUDY_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return undefined;

    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    return { meta: parseMeta(slug, data), content };
}
