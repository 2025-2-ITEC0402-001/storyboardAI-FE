interface VideoIconProps {
    className?: string;
}

export function VideoIcon({ className = "size-6" }: VideoIconProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
            <polyline points="17 2 12 7 7 2" />
        </svg>
    );
}
