import { cn } from "@/shared/lib/utils";

export interface ProjectCanvasOverlayProps {
    children?: React.ReactNode;
}

export const ProjectCanvasOverlay = ({ children }: ProjectCanvasOverlayProps) => {
    return (
        <div
            className={cn(
                "absolute w-full h-full top-0 left-0",
                "flex flex-col items-center justify-center",
                "bg-black/80 text-xl font-semibold",
            )}
        >
            {children}
        </div>
    );
};
