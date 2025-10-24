import React, { useState, useCallback, useRef, useEffect } from "react";

import { cn } from "@/shared/lib/utils";

export interface ResizablePanelProps extends React.ComponentProps<"div">, React.PropsWithChildren {
    defaultWidth?: number;
    minWidth?: number;
    maxWidth?: number;
    side: "left" | "right";
    onResize?: (width: number) => void;
}

export const ResizablePanel = ({
    children,
    className = "",
    defaultWidth = 300,
    minWidth = 200,
    maxWidth = 600,
    side,
    onResize,
}: ResizablePanelProps) => {
    const [width, setWidth] = useState(defaultWidth);
    const [isResizing, setIsResizing] = useState(false);

    const panelRef = useRef<HTMLDivElement>(null);
    const startXRef = useRef<number>(0);
    const startWidthRef = useRef<number>(0);

    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            setIsResizing(true);
            startXRef.current = e.clientX;
            startWidthRef.current = width;

            document.body.style.cursor = "ew-resize";
            document.body.style.userSelect = "none";
        },
        [width],
    );

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isResizing) return;

            const deltaX = e.clientX - startXRef.current;
            let newWidth;

            if (side === "left") {
                newWidth = startWidthRef.current + deltaX;
            } else {
                newWidth = startWidthRef.current - deltaX;
            }

            newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

            setWidth(newWidth);
            onResize?.(newWidth);
        },
        [isResizing, side, minWidth, maxWidth, onResize],
    );

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
    }, []);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);

            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };
        }
    }, [isResizing, handleMouseMove, handleMouseUp]);

    const resizerPosition = side === "left" ? "right-0" : "left-0";
    const resizerCursor = "cursor-ew-resize";

    return (
        <div ref={panelRef} className={`relative ${className}`} style={{ width: `${width}px` }}>
            {children}

            <div
                className={cn(
                    "absolute top-0 bottom-0",
                    "w-0.5 bg-transparent transition-colors duration-150",
                    "hover:bg-primary",
                    resizerCursor,
                    resizerPosition,
                )}
                onMouseDown={handleMouseDown}
            >
                <div className="absolute inset-y-0 -left-1 -right-1" />
            </div>

            {isResizing && (
                <mark
                    className={cn(
                        "absolute top-0 bottom-0",
                        "w-0.5 bg-primary pointer-events-none",
                        resizerPosition,
                    )}
                />
            )}
        </div>
    );
};
