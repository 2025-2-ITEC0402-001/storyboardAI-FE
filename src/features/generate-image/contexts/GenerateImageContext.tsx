import { createContext, useContext, type PropsWithChildren } from "react";

import { useGenerateImage } from "@/features/generate-image/services/useGenerateImage";

const GenerateImageContext = createContext<ReturnType<typeof useGenerateImage> | null>(null);

export const GenerateImageProvider = ({ children }: PropsWithChildren) => {
    const value = useGenerateImage();

    return <GenerateImageContext.Provider value={value}>{children}</GenerateImageContext.Provider>;
};

export const useGenerateImageContext = () => {
    const ctx = useContext(GenerateImageContext);
    if (!ctx) {
        throw new Error(
            "useGenerateImageContext 는 GenerateImageProvider 내부에서만 사용될 수 있습니다.",
        );
    }
    return ctx;
};
