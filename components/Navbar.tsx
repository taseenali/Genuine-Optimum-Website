"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";

const NAV_LINKS = [
    { href: "/capabilities", label: "Capabilities" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [productsOpen, setProductsOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
    const productsRef = useRef<HTMLDivElement>(null);

    // The dropdown opens on hover for pointer users, but it also has to
    // close for keyboard and touch users, who never fire mouseleave.
    useEffect(() => {
        if (!productsOpen) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setProductsOpen(false);
        };
        const onPointerDown = (e: PointerEvent) => {
            if (!productsRef.current?.contains(e.target as Node)) {
                setProductsOpen(false);
            }
        };

        document.addEventListener("keydown", onKey);
        document.addEventListener("pointerdown", onPointerDown);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("pointerdown", onPointerDown);
        };
    }, [productsOpen]);

    return (
        <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-xl">
            <div className="mx-auto flex h-[66px] w-full max-w-[var(--page-max)] items-center justify-between gap-8 px-6 md:px-10">

                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-2.5 text-[16.5px] font-bold tracking-[-0.015em] text-text"
                >
                    <span className="relative size-8">
                        <Image
                            src="/gologo.webp"
                            alt=""
                            fill
                            // The logo box is size-8 (32px), so tell Next.js that
                            // instead of letting it assume a full-width image.
                            sizes="32px"
                            className="object-contain"
                            priority
                        />
                    </span>
                    Genuine Optimum
                </Link>

                {/* Desktop navigation */}
                <nav className="hidden items-center gap-7 text-sm lg:flex">
                    <Link
                        href="/capabilities"
                        className="text-muted transition-colors hover:text-text"
                    >
                        Capabilities
                    </Link>

                    <div
                        ref={productsRef}
                        className="relative"
                        onMouseEnter={() => setProductsOpen(true)}
                        onMouseLeave={() => setProductsOpen(false)}
                    >
                        <Link
                            href="/products"
                            aria-expanded={productsOpen}
                            aria-haspopup="true"
                            onClick={() => setProductsOpen(false)}
                            onFocus={() => setProductsOpen(true)}
                            className="flex items-center gap-1.5 py-[22px] text-muted transition-colors hover:text-text"
                        >
                            Products
                            <svg
                                className={`size-3 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                                viewBox="0 0 12 12"
                                fill="none"
                                aria-hidden
                            >
                                <path
                                    d="M2.5 4.5L6 8l3.5-3.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>

                        {productsOpen ? (
                            <div className="absolute left-[-20px] top-full w-[400px] border border-line-2 bg-panel shadow-[0_24px_48px_rgba(0,0,0,0.5)]">
                                {PRODUCTS.map((product, i) => (
                                    <Link
                                        key={product.slug}
                                        href={`/products/${product.slug}`}
                                        onClick={() => setProductsOpen(false)}
                                        className={`block px-5 py-4 transition-colors hover:bg-panel-hover ${i < PRODUCTS.length - 1 ? "border-b border-line" : ""}`}
                                    >
                                        <span className="flex items-baseline justify-between gap-3">
                                            <span className="text-[15px] font-medium text-text">
                                                {product.name}
                                            </span>
                                        </span>
                                        <span className="mt-1.5 block text-[13px] leading-relaxed text-muted">
                                            {product.tagline}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    {NAV_LINKS.slice(1).map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-muted transition-colors hover:text-text"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <Link
                    href="/contact"
                    className="hidden shrink-0 rounded-control bg-accent px-4.5 py-2.5 text-[13.5px] font-medium text-on-accent transition-colors hover:bg-accent-hi lg:inline-flex"
                >
                    Book a call
                </Link>

                {/* Mobile trigger */}
                <button
                    type="button"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-menu"
                    className="p-2 text-muted transition-colors hover:text-text lg:hidden"
                >
                    <span className="sr-only">Menu</span>
                    <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                            d={mobileOpen ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen ? (
                <div
                    id="mobile-menu"
                    className="border-t border-line bg-bg lg:hidden"
                >
                    <div className="flex flex-col px-6 py-2">
                        <Link
                            href="/capabilities"
                            onClick={() => setMobileOpen(false)}
                            className="border-b border-line py-4 text-[15px] text-muted"
                        >
                            Capabilities
                        </Link>

                        <div className="border-b border-line">
                            <button
                                type="button"
                                onClick={() => setMobileProductsOpen((v) => !v)}
                                aria-expanded={mobileProductsOpen}
                                className="flex w-full items-center justify-between py-4 text-[15px] text-muted"
                            >
                                Products
                                <svg
                                    className={`size-3 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`}
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    aria-hidden
                                >
                                    <path
                                        d="M2.5 4.5L6 8l3.5-3.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            {mobileProductsOpen ? (
                                <div className="flex flex-col gap-1 pb-4 pl-4">
                                    <Link
                                        href="/products"
                                        onClick={() => setMobileOpen(false)}
                                        className="py-2.5 text-sm text-text"
                                    >
                                        All products
                                    </Link>
                                    {PRODUCTS.map((product) => (
                                        <Link
                                            key={product.slug}
                                            href={`/products/${product.slug}`}
                                            onClick={() => setMobileOpen(false)}
                                            className="py-2.5 text-sm text-muted"
                                        >
                                            {product.name}
                                        </Link>
                                    ))}
                                </div>
                            ) : null}
                        </div>

                        {NAV_LINKS.slice(1).map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="border-b border-line py-4 text-[15px] text-muted"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <Link
                            href="/contact"
                            onClick={() => setMobileOpen(false)}
                            className="my-5 rounded-control bg-accent px-5 py-3.5 text-center text-sm font-medium text-on-accent"
                        >
                            Book a call
                        </Link>
                    </div>
                </div>
            ) : null}
        </header>
    );
}
