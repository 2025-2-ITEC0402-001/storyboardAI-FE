import { cn } from "@/shared/lib/utils";

export interface DividerProps extends React.ComponentProps<"div"> {
    borderWidth?: React.CSSProperties["borderWidth"];
    borderColor?: React.CSSProperties["borderColor"];
    children?: React.ReactNode;
}

export const Divider = ({
    className,
    borderWidth = "0.5px",
    borderColor = "#AFAFB6",
    children,
    ...props
}: DividerProps) => {
    return (
        <div className={cn("flex items-center mt-4", className)} {...props}>
            <div className="w-full" style={{ borderWidth, borderColor }} />
            <p className="text-xs shrink-0 mx-2 text-[#AFAFB6]">{children}</p>
            <div className="w-full" style={{ borderWidth, borderColor }} />
        </div>
    );
};
