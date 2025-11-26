import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/app/store/store";

import { generateImageThunk } from "@/features/generate-image/store/imageGenerationThunk";
import { formatPromptPayload } from "@/features/generate-image/utils/formatPrompt";

import { Button } from "@/shared/ui/button";

import { ModelSelector } from "../components/ModelSelector";
import { PromptInput } from "../components/PromptInput";
import { StyleSelector } from "../components/StyleSelector";
import { promptFormSchema, type PromptFormSchemaType } from "../model/PromptFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const ImageGenerationForm = () => {
    const { isPending } = useSelector((state: RootState) => state.imageGeneration);
    const dispatch: AppDispatch = useDispatch();

    const methods = useForm<PromptFormSchemaType>({
        resolver: zodResolver(promptFormSchema),
        defaultValues: {
            model: "model-a",
            style: "realistic",
            prompts: [{ value: "" }],
        },
        mode: "onChange",
    });

    const onSubmit = (data: PromptFormSchemaType) => {
        dispatch(
            generateImageThunk({
                prompt: formatPromptPayload(data),
            }),
        );
    };

    return (
        <aside className="w-full h-full bg-foreground p-4">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="w-full h-full bg-[#1C1C21] rounded-md px-4 flex flex-col"
                >
                    <h2 className="text-background font-bold border-gray-600 py-4">이미지 생성</h2>

                    <section className="flex-1 overflow-y-auto scrollbar-hide ">
                        <ModelSelector />
                        <PromptInput />
                        <StyleSelector />
                    </section>

                    <footer className="mt-4">
                        <Button className="w-full mb-4" disabled={isPending}>
                            {isPending ? "생성 중..." : "생성하기"}
                        </Button>
                    </footer>
                </form>
            </FormProvider>
        </aside>
    );
};
