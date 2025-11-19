import type React from "react";
import type { CSSProperties } from "react";

import { cn } from "@/shared/lib/utils";

export interface AppLogoProps extends React.ComponentProps<"div"> {
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
}

export const AppLogo = ({ width, height, ...props }: AppLogoProps) => {
    return (
        <div
            className={cn("w-6 h-6 rounded-xs", props.className)}
            style={{
                width,
                height,
                background: "linear-gradient(to right, #8B5CF6, #D946EF)",
                ...props.style,
            }}
            {...props}
        />
    );
};
