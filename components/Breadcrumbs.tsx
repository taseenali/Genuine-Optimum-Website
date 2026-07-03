import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

export interface BreadcrumbItem {
    label: string;
    href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
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

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav aria-label="Breadcrumb" className="px-6 max-w-7xl mx-auto mb-8 text-sm">
                <ol className="flex flex-wrap items-center gap-2 text-gray-500">
                    {trail.map((item, index) => (
                        <li key={item.href} className="flex items-center gap-2">
                            {index > 0 && <span className="text-gray-700">/</span>}
                            {index === trail.length - 1 ? (
                                <span className="text-gray-300" aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <Link href={item.href} className="hover:text-white transition-colors">
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
