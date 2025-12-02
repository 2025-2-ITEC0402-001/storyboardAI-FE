import { useSelector } from "react-redux";

import type { RootState } from "@/app/store/store";

import { EditForm } from "@/features/generate-image/containers/EditForm";
import { ImageGenerationForm } from "@/features/generate-image/containers/ImageGenerationForm";
import { MaskingForm } from "@/features/generate-image/containers/MaskingForm";

export const SidebarWidget = () => {
    const mode = useSelector((state: RootState) => state.layout.mode);

    switch (mode) {
        case "masking":
            return <MaskingForm />;
        case "edit:video":
        case "edit:image":
            return <EditForm />;
        case "generate":
        default:
            return <ImageGenerationForm />;
    }
};
