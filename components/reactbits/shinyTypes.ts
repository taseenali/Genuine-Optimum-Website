export interface ShinyEffectProps {
    disabled?: boolean;
    speed?: number;
    className?: string;
    shineColor?: string;
    spread?: number;
    yoyo?: boolean;
    pauseOnHover?: boolean;
    direction?: 'left' | 'right';
    delay?: number;
}

export interface ShinyTextProps extends ShinyEffectProps {
    text: string;
    color?: string;
}
