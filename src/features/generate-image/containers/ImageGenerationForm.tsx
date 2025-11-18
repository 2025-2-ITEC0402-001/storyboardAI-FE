import { useForm, FormProvider } from "react-hook-form";

import { Button } from "@/shared/ui/button";

import { ModelSelector } from "../components/ModelSelector";
import { PromptInput } from "../components/PromptInput";
import { StyleSelector } from "../components/StyleSelector";
import { formSchema, type FormSchemaType } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const ImageGenerationForm = () => {
    const methods = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            model: "model-a",
            style: "realistic",
            prompts: [{ value: "" }],
        },
        mode: "onChange",
    });

    const onSubmit = (data: FormSchemaType) => {
        console.log("제출 성공:", data);
    };

    return (
        <aside className="w-full h-full bg-foreground p-4">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="w-full h-full bg-[#1C1C21] rounded-md px-4 flex flex-col"
                >
                    <h2 className="text-background font-bold border-gray-600 pt-4">이미지 생성</h2>

                    <section className="flex-1">
                        <ModelSelector />

                        <PromptInput />

                        <StyleSelector />
                    </section>

                    <footer className="mt-4">
                        <Button className="w-full mb-4">
                            <span>생성하기</span>
                        </Button>
                    </footer>
                </form>
            </FormProvider>
        </aside>
    );
};
