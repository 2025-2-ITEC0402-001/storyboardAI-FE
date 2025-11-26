import { useSelector } from "react-redux";

import type { RootState } from "@/app/store/store";

import { ImageEditForm } from "@/features/generate-image/containers/ImageEditForm";
import { ImageGenerationForm } from "@/features/generate-image/containers/ImageGenerationForm";

export const SidebarWidget = () => {
    const mode = useSelector((state: RootState) => state.layout.mode);

    switch (mode) {
        case "edit":
            return <ImageEditForm />;
        case "generate":
        default:
            return <ImageGenerationForm />;
    }
};
