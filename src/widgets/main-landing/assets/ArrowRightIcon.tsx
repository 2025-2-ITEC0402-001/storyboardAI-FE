interface ArrowRightIconProps {
    className?: string;
}

export function ArrowRightIcon({ className = "size-5" }: ArrowRightIconProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
    );
}
