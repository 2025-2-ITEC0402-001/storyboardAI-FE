import { cn } from "@/shared/lib/utils";

export interface SpinnerProps extends React.ComponentProps<"div"> {
    width?: React.CSSProperties["width"];
    height?: React.CSSProperties["height"];
}

export const Spinner = ({ width = "40px", height = "40px", ...props }: SpinnerProps) => {
    return (
        <div
            className={cn(
                "border-2 border-t-primary border-r-primary border-b-transparent border-l-transparent rounded-full animate-spin",
                props.className,
            )}
            style={{ width, height }}
            {...props}
        />
    );
};
