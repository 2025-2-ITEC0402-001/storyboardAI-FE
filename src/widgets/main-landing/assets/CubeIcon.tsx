interface CubeIconProps {
    className?: string;
}

export function CubeIcon({ className = "size-6" }: CubeIconProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3z" />
            <path d="M12 12l9-4.5M12 12v9M12 12L3 7.5" />
        </svg>
    );
}
