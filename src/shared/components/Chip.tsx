import { cn } from "@/shared/lib/utils";

export interface ChipProps extends React.ComponentProps<"div"> {
    children: React.ReactNode;
}

export const Chip = ({ children, className, ...props }: ChipProps) => {
    return (
        <div
            className={cn(
                "w-fit mb-4 mx-auto p-2 px-4 flex",
                "rounded-full bg-gray-400/30 text-white text-sm",
                "shadow-lg shadow-black/50",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};
