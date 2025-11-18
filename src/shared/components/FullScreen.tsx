import { cn } from "@/shared/lib/utils";

export interface FullScreenProps extends React.ComponentProps<"main"> {
    children: React.ReactNode;
}

export const FullScreen = ({ children, ...props }: FullScreenProps) => {
    return (
        <main
            className={cn(
                "bg-[#0E0E11] w-full h-screen flex items-center justify-center",
                props.className,
            )}
        >
            {children}
        </main>
    );
};
