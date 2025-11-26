import { useSelector } from "react-redux";

import type { RootState } from "@/app/store/store";

import { Spinner } from "@/shared/components/Spinner";

import { ProjectCanvasWidget } from "@/widgets/project-detail/ProjectCanvasWidget";

export const MainCanvasWidget = () => {
    const { event, isPending } = useSelector((state: RootState) => state.imageGeneration);

    return (
        <article className="flex-1 bg-foreground h-full flex items-center justify-center px-4">
            <div className="w-full max-w-4xl max-h-[80vh] flex flex-col items-center gap-4 relative">
                <ProjectCanvasWidget src={event?.imageUrl} />
                {isPending && (
                    <div className="absolute w-full max-w-4xl inset-0 flex flex-col gap-2 items-center justify-center">
                        <Spinner width="34px" height="34px" />
                        <p className="text-white text-sm">이미지 생성중입니다</p>
                    </div>
                )}
            </div>
        </article>
    );
};
