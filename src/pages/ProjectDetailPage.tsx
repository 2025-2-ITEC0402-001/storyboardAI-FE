import { useParams } from "react-router-dom";

import { ImageGenerationForm } from "@/features/generate-image/containers/ImageGenerationForm";
import { GenerateImageProvider } from "@/features/generate-image/contexts/GenerateImageContext";

import { ResizablePanel } from "@/shared/ui/resizable-panel";

import { MainCanvasWidget } from "@/widgets/project-detail/MainCanvasWidget";
import { ProjectHeaderWidget } from "@/widgets/project-detail/ProjectHeaderWidget";
import { SceneAsideWidget } from "@/widgets/project-detail/SceneAsideWidget";

export default function ProjectDetailPage() {
    const { id } = useParams();
    console.log("Project ID:", id);

    return (
        <GenerateImageProvider>
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
                        <ImageGenerationForm />
                    </ResizablePanel>
                </main>
            </div>
        </GenerateImageProvider>
    );
}
