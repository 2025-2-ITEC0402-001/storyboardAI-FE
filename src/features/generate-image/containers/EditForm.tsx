import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/app/store/store";

import { ImageEditFieldSet } from "@/features/generate-image/containers/ImageEditFieldSet";
import { VideoEditFieldSet } from "@/features/generate-image/containers/VideoEditFieldSet";

import { Selector } from "@/shared/components/Selector";
import { layoutActions, type LayoutMode } from "@/shared/store/layoutSlice";

export const EditForm = () => {
    const mode = useSelector((state: RootState) => state.layout.mode);
    const dispatch: AppDispatch = useDispatch();

    return (
        <aside className="w-full h-full bg-foreground p-4">
            <form className="w-full h-full bg-[#1C1C21] rounded-md px-4 flex flex-col">
                <section>
                    <h2 className="text-background font-bold border-gray-600 py-4">이미지 편집</h2>

                    <Selector.Root
                        defaultValue="edit:video"
                        onChange={(mode) => {
                            dispatch(layoutActions.changeMode({ mode: mode as LayoutMode }));
                        }}
                    >
                        <Selector.Item value="edit:video">영상 생성</Selector.Item>
                        <Selector.Item value="edit:image">이미지 편집</Selector.Item>
                    </Selector.Root>

                    {mode === "edit:video" ? <VideoEditFieldSet /> : <ImageEditFieldSet />}
                </section>
            </form>
        </aside>
    );
};
