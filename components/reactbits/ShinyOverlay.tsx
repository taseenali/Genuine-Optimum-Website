"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';

const ShinyOverlay = ({
    disabled = false,
    speed = 2,
    className = '',
    shineColor = '#ffffff',
    spread = 120,
    yoyo = false,
    pauseOnHover = false,
    direction = 'left',
    delay = 0
}: any) => {
    const [isPaused, setIsPaused] = useState(false);
    const progress = useMotionValue(0);
    const elapsedRef = useRef(0);
    const lastTimeRef = useRef<number | null>(null);
    const directionRef = useRef(direction === 'left' ? 1 : -1);

    const animationDuration = speed * 1000;
    const delayDuration = delay * 1000;

    useAnimationFrame(time => {
        if (disabled || isPaused) {
            lastTimeRef.current = null;
            return;
        }

        if (lastTimeRef.current === null) {
            lastTimeRef.current = time;
            return;
        }

        const deltaTime = time - lastTimeRef.current;
        lastTimeRef.current = time;

        elapsedRef.current += deltaTime;

        if (yoyo) {
            const cycleDuration = animationDuration + delayDuration;
            const fullCycle = cycleDuration * 2;
            const cycleTime = elapsedRef.current % fullCycle;

            if (cycleTime < animationDuration) {
                const p = (cycleTime / animationDuration) * 100;
                progress.set(directionRef.current === 1 ? p : 100 - p);
            } else if (cycleTime < cycleDuration) {
                progress.set(directionRef.current === 1 ? 100 : 0);
            } else if (cycleTime < cycleDuration + animationDuration) {
                const reverseTime = cycleTime - cycleDuration;
                const p = 100 - (reverseTime / animationDuration) * 100;
                progress.set(directionRef.current === 1 ? p : 100 - p);
            } else {
                progress.set(directionRef.current === 1 ? 0 : 100);
            }
        } else {
            const cycleDuration = animationDuration + delayDuration;
            const cycleTime = elapsedRef.current % cycleDuration;

            if (cycleTime < animationDuration) {
                const p = (cycleTime / animationDuration) * 100;
                progress.set(directionRef.current === 1 ? p : 100 - p);
            } else {
                progress.set(directionRef.current === 1 ? 100 : 0);
            }
        }
    });

    useEffect(() => {
        directionRef.current = direction === 'left' ? 1 : -1;
        elapsedRef.current = 0;
        progress.set(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [direction]);

    const backgroundPosition = useTransform(progress, p => `${150 - p * 2}% center`);

    const gradientStyle = {
        backgroundImage: `linear-gradient(${spread}deg, transparent 0%, transparent 35%, ${shineColor} 50%, transparent 65%, transparent 100%)`,
        backgroundSize: '200% auto',
    };

    return (
        <motion.div
            className={`absolute inset-0 pointer-events-none mix-blend-screen ${className}`}
            style={{ ...gradientStyle, backgroundPosition }}
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        />
    );
};

export default ShinyOverlay;
