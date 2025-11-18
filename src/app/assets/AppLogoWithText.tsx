import { AppLogo, type AppLogoProps } from "@/app/assets/AppLogo";

export interface AppLogoWithTextProps extends AppLogoProps {
    fontSize?: React.CSSProperties["fontSize"];
    color?: React.CSSProperties["color"];
}

export const AppLogoWithText = ({
    fontSize = "0.875rem",
    color = "#AFAFB6",
    width = "24px",
    height = "24px",
    ...props
}: AppLogoWithTextProps) => {
    return (
        <header className="flex items-center gap-2 py-2">
            <AppLogo width={width} height={height} {...props} />
            <h1 style={{ fontSize, color }}>STORYBOARD AI</h1>
        </header>
    );
};
