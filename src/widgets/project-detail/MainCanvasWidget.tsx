import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import type { RootState } from "@/app/store/store";

import { useGetProjectDetailQuery } from "@/features/manage-project/services/getProjectDetail";

import { Spinner } from "@/shared/components/Spinner";

import { ProjectCanvasWidget } from "@/widgets/project-detail/ProjectCanvasWidget";

export const MainCanvasWidget = () => {
    const { event, isPending } = useSelector((state: RootState) => state.imageGeneration);
    const isVideoGenerationPending = useSelector(
        (state: RootState) => state.videoGeneration.isPending,
    );

    const { id: projectId } = useParams<{ id: string }>();

    const { data: project } = useGetProjectDetailQuery(projectId!);

    const generatedImageUrl = event?.imageUrl;

    const projectThumbnailUrl = project.thumbnail;

    const finalImageUrl = generatedImageUrl || projectThumbnailUrl;

    return (
        <article className="flex-1 bg-foreground h-full flex items-center justify-center px-4">
            <div className="w-full max-w-4xl max-h-[80vh] flex flex-col items-center gap-4 relative">
                <ProjectCanvasWidget src={finalImageUrl} />
                {(isPending || isVideoGenerationPending) && (
                    <div className="absolute w-full max-w-4xl inset-0 flex flex-col gap-2 items-center justify-center bg-foreground/80 rounded-md">
                        <Spinner width="34px" height="34px" />
                        <p className="text-white text-sm">생성 중입니다</p>
                    </div>
                )}
            </div>
        </article>
    );
};
