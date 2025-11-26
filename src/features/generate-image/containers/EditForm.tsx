import { useState } from "react";

import { ImageEditFieldSet } from "@/features/generate-image/containers/ImageEditFieldSet";
import { VideoEditFieldSet } from "@/features/generate-image/containers/VideoEditFieldSet";

import { Selector } from "@/shared/components/Selector";

export type EditMode = "generate-video" | "edit-image";

export const EditForm = () => {
    const [mode, setMode] = useState<EditMode>("generate-video");

    return (
        <aside className="w-full h-full bg-foreground p-4">
            <form className="w-full h-full bg-[#1C1C21] rounded-md px-4 flex flex-col">
                <section>
                    <h2 className="text-background font-bold border-gray-600 py-4">이미지 편집</h2>

                    <Selector.Root
                        defaultValue="generate-video"
                        onChange={(mode) => setMode(mode as EditMode)}
                    >
                        <Selector.Item value="generate-video">영상 생성</Selector.Item>
                        <Selector.Item value="edit-image">이미지 편집</Selector.Item>
                    </Selector.Root>

                    {mode === "generate-video" ? <VideoEditFieldSet /> : <ImageEditFieldSet />}
                </section>
            </form>
        </aside>
    );
};
