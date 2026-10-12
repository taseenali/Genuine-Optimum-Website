import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

export interface BreadcrumbItem {
    label: string;
    href: string;
}

/**
 * Breadcrumb trail plus its BreadcrumbList JSON-LD.
 *
 * `bare` renders only the row, for pages that place the trail
 * inside their own container and border. Without it the component
 * supplies its own measure, which is what the older pages expect.
 */
export default function Breadcrumbs({
    items,
    bare = false,
}: {
    items: BreadcrumbItem[];
    bare?: boolean;
}) {
    const trail: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: `${SITE_URL}${item.href}`,
        })),
    };

    const row = (
        <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] text-dim">
                {/* Home is left out of the visible trail (the logo already
                    goes there) but stays in the JSON-LD above, which is
                    what search engines read. */}
                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center gap-2.5">
                        {index > 0 && <span aria-hidden>/</span>}
                        {index === items.length - 1 ? (
                            <span className="text-text" aria-current="page">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="transition-colors hover:text-text"
                            >
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {bare ? (
                row
            ) : (
                // Same row as pages that place the trail themselves: inside
                // the page measure, with a rule underneath.
                <div className="mx-auto mb-12 w-full max-w-[var(--page-max)] px-6 md:px-10">
                    <div className="border-b border-line py-4">{row}</div>
                </div>
            )}
        </>
    );
}
