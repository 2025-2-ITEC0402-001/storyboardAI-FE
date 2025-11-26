import { useSelector } from "react-redux";

import type { RootState } from "@/app/store/store";

import { ProjectCanvasWidget } from "@/widgets/project-detail/ProjectCanvasWidget";

export const MainCanvasWidget = () => {
    const event = useSelector((state: RootState) => state.imageGeneration.event);

    return (
        <article className="flex-1 bg-foreground h-full flex items-center justify-center px-4">
            <div className="w-full max-w-4xl max-h-[80vh] flex flex-col items-center gap-4">
                <ProjectCanvasWidget src={event?.imageUrl} />
            </div>
        </article>
    );
};
