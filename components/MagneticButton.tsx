"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Limit movement to max 10px
        const maxTranslation = 10;
        const moveX = Math.max(-maxTranslation, Math.min(maxTranslation, middleX * 0.15));
        const moveY = Math.max(-maxTranslation, Math.min(maxTranslation, middleY * 0.15));

        setPosition({ x: moveX, y: moveY });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={className}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
}
