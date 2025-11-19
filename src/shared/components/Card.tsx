import { cn } from "@/shared/lib/utils";

export interface CardProps extends React.ComponentProps<"article"> {
    children: React.ReactNode;
}

export const Card = ({ children, ...props }: CardProps) => {
    return (
        <article className={cn("bg-[#1C1C21] border-[#2F2F37] border rounded-md", props.className)}>
            {children}
        </article>
    );
};
