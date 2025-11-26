import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

export interface SelectorContextValue {
    selectedValue: string;
    setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectorContext = createContext<SelectorContextValue | null>(null);

export interface SelectorProviderProps extends PropsWithChildren {
    defaultValue?: string;
    onChange?: (value: string) => void;
}

export const SelectorProvider = ({ children, defaultValue, onChange }: SelectorProviderProps) => {
    const [selectedValue, setSelectedValue] = useState<string>(defaultValue || "");

    useEffect(() => {
        if (onChange) {
            onChange(selectedValue);
        }
    }, [selectedValue, onChange]);

    return (
        <SelectorContext.Provider
            value={{
                selectedValue,
                setSelectedValue,
            }}
        >
            {children}
        </SelectorContext.Provider>
    );
};

export const useSelectorContext = () => {
    const context = useContext(SelectorContext);
    if (!context) {
        throw new Error("useSelectorContext 는 SelectorProvider 내부에서만 사용 가능합니다.");
    }
    return context;
};
