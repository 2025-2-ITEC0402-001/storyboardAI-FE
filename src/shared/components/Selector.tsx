import { SelectorProvider, useSelectorContext } from "@/shared/components/SelectorContext";
import { cn } from "@/shared/lib/utils";

export interface SelectorRootProps {
    defaultValue?: string;
    children: React.ReactNode;
    onChange?: (value: string) => void;
}

const SelectorRoot = ({ defaultValue, children, onChange }: SelectorRootProps) => {
    return (
        <SelectorProvider defaultValue={defaultValue} onChange={onChange}>
            <ul
                className={cn(
                    "flex gap-2",
                    "p-1 border border-[#2F2F37]/60 bg-[#0E0E11]/70 h-10 rounded-sm",
                )}
            >
                {children}
            </ul>
        </SelectorProvider>
    );
};

export interface SelectorItemProps {
    value: string;
    children?: React.ReactNode;
}

const SelectorItem = ({ value, children }: SelectorItemProps) => {
    const { selectedValue, setSelectedValue } = useSelectorContext();

    const isActive = selectedValue === value;

    return (
        <li
            className={cn(
                isActive ? "bg-[#8B5CF6]" : "bg-transparent",
                "flex-1 flex items-center justify-center",
                "text-white rounded-sm",
            )}
            onClick={() => setSelectedValue(value)}
        >
            {children}
        </li>
    );
};

export const Selector = {
    Root: SelectorRoot,
    Item: SelectorItem,
};
