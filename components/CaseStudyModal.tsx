"use client";

import { useEffect } from "react";

export default function CaseStudyModal({
    children,
    wide,
    onClose,
}: {
    children: React.ReactNode;
    wide?: boolean;
    onClose: () => void;
}) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto no-scrollbar bg-white/45 backdrop-blur-sm p-4 md:p-10"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className={`relative w-full bg-black border border-white/10 rounded-2xl my-4 md:my-8 shadow-2xl overflow-hidden ${
                    wide ? "max-w-5xl" : "max-w-3xl p-6 md:p-10"
                }`}
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur transition-colors flex items-center justify-center text-white"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                {children}
            </div>
        </div>
    );
}
