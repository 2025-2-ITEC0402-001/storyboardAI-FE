import { Plus } from "lucide-react";

import { ScenePreview } from "@/features/generate-image/components/ScenePreview";

import { Button } from "@/shared/ui/button";

export const SceneAsideWidget = () => {
    return (
        <aside className="w-full h-full bg-foreground p-4">
            <div className="w-full h-full flex flex-col bg-[#1C1C21] p-4 rounded-md">
                <section className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
                    <ScenePreview />
                    <ScenePreview />
                    <ScenePreview />
                    <ScenePreview />
                    <ScenePreview />
                    <ScenePreview />
                    <ScenePreview />
                    <ScenePreview />
                </section>

                <footer className="mt-4">
                    <Button className="w-full">
                        <Plus />
                        <span>장면 추가하기</span>
                    </Button>
                </footer>
            </div>
        </aside>
    );
};
