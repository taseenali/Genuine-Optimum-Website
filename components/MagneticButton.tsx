"use client";

import { ButtonHTMLAttributes } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

/**
 * Plain action button.
 *
 * This used to apply a cursor-following "magnetic" pull and a hover
 * scale. The redesign dropped both: buttons are square, static, and
 * change only their background on hover, in line with the rest of
 * the system. The component and its name are kept so the service
 * pages that call it do not all need editing.
 */
export default function MagneticButton({
    children,
    className = "",
    disabled,
    ...props
}: ActionButtonProps) {
    return (
        <button
            className={`${className} transition-colors duration-200 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
