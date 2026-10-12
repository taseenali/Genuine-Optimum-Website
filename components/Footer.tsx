import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

const COMPANY_LINKS = [
    { href: "/capabilities", label: "Capabilities" },
    { href: "/work", label: "Work" },
    { href: "/industries", label: "Industries" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
];

const LEGAL_LINKS = [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
    return (
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
            {children}
        </div>
    );
}

function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="text-sm text-muted transition-colors hover:text-text"
        >
            {label}
        </Link>
    );
}

export default function Footer() {
    return (
        <footer className="border-t border-line bg-bg-alt">
            <div className="mx-auto grid w-full max-w-[var(--page-max)] grid-cols-1 gap-12 px-6 py-14 sm:grid-cols-2 md:px-10 lg:grid-cols-4">

                <div className="flex flex-col gap-3">
                    <div className="text-[16.5px] font-bold tracking-[-0.015em] text-text">
                        Genuine Optimum
                    </div>
                    <p className="max-w-[30ch] text-sm leading-relaxed text-dim">
                        Applied AI and data systems, with the software built around them.
                    </p>
                    <a
                        href="mailto:contact@genuineoptimum.com"
                        className="pt-1 font-mono text-[12.5px] text-accent transition-colors hover:text-accent-hi"
                    >
                        contact@genuineoptimum.com
                    </a>
                </div>

                <div className="flex flex-col gap-3">
                    <ColumnHeading>Products</ColumnHeading>
                    {PRODUCTS.map((product) => (
                        <FooterLink
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            label={product.name}
                        />
                    ))}
                </div>

                <div className="flex flex-col gap-3">
                    <ColumnHeading>Company</ColumnHeading>
                    {COMPANY_LINKS.map((link) => (
                        <FooterLink key={link.href} {...link} />
                    ))}
                </div>

                <div className="flex flex-col gap-3">
                    <ColumnHeading>Legal</ColumnHeading>
                    {LEGAL_LINKS.map((link) => (
                        <FooterLink key={link.href} {...link} />
                    ))}
                </div>
            </div>

            <div className="mx-auto w-full max-w-[var(--page-max)] px-6 pb-10 font-mono text-[11.5px] text-faint md:px-10">
                &copy; {new Date().getFullYear()} Genuine Optimum
            </div>
        </footer>
    );
}
