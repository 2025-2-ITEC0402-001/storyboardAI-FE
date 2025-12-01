import { useParams } from "react-router-dom";

import { useGetProjectDetailQuery } from "@/features/manage-project/services/getProjectDetail";

import { ResizablePanel } from "@/shared/ui/resizable-panel";

import { MainCanvasWidget } from "@/widgets/project-detail/MainCanvasWidget";
import { ProjectHeaderWidget } from "@/widgets/project-detail/ProjectHeaderWidget";
import { SceneAsideWidget } from "@/widgets/project-detail/SceneAsideWidget";
import { SidebarWidget } from "@/widgets/project-detail/SidebarWidget";

export default function ProjectDetailPage() {
    const { id: projectId } = useParams<{ id: string }>();
    const { data: project } = useGetProjectDetailQuery(projectId);

    return (
        <div className="w-full h-screen flex flex-col">
            <ProjectHeaderWidget />

            <main className="flex flex-1 h-0">
                <ResizablePanel
                    side="left"
                    defaultWidth={300}
                    minWidth={200}
                    maxWidth={500}
                    className="h-full"
                >
                    <SceneAsideWidget />
                </ResizablePanel>

                <MainCanvasWidget />

                <ResizablePanel
                    side="right"
                    defaultWidth={350}
                    minWidth={250}
                    maxWidth={600}
                    className="h-full"
                >
                    <SidebarWidget />
                </ResizablePanel>
            </main>
        </div>
    );
}
