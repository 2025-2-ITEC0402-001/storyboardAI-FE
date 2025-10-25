import type { CSSProperties } from "react";

export interface AppLogoProps {
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
}

export const AppLogo = ({ width, height }: AppLogoProps) => {
    return (
        <div
            className="w-6 h-6 rounded-xs"
            style={{
                width,
                height,
                background: "linear-gradient(to right, #8B5CF6, #D946EF)",
            }}
        />
    );
};
