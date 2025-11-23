import { useForm, FormProvider } from "react-hook-form";

import { useImageGeneration } from "@/features/generate-image/services/useImageGeneration";

import { Button } from "@/shared/ui/button";

import { ModelSelector } from "../components/ModelSelector";
import { PromptInput } from "../components/PromptInput";
import { StyleSelector } from "../components/StyleSelector";
import { promptFormSchema, type PromptFormSchemaType } from "../model/PromptFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const ImageGenerationForm = () => {
    const { generateImage, isLoading, progress, statusMessage, generatedImageUrl } =
        useImageGeneration();

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
        generateImage(data);
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
                        {/* ✅ 진행 상태 표시 UI */}
                        {isLoading && (
                            <div className="mt-4 p-3 bg-gray-800/50 border border-gray-700 rounded-lg animate-in fade-in slide-in-from-bottom-2">
                                <div className="flex justify-between text-xs text-gray-300 mb-2">
                                    <span>{statusMessage}</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                    <div
                                        className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* ✅ 결과 이미지 미리보기 (선택 사항) */}
                        {generatedImageUrl && !isLoading && (
                            <div className="mt-4">
                                <img
                                    src={generatedImageUrl}
                                    alt="Generated"
                                    className="w-full rounded-md border border-gray-700"
                                />
                                <p className="text-center text-xs text-green-500 mt-2">
                                    생성 완료!
                                </p>
                            </div>
                        )}
                    </section>

                    <footer className="mt-4">
                        <Button
                            className="w-full mb-4"
                            disabled={isLoading || !methods.formState.isValid}
                        >
                            {isLoading ? "생성 중..." : "생성하기"}
                        </Button>
                    </footer>
                </form>
            </FormProvider>
        </aside>
    );
};
