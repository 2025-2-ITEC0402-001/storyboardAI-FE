import { ModelSelector } from "../components/ModelSelector";
import { PromptInput } from "../components/PromptInput";
import { StyleSelector } from "../components/StyleSelector";

export const ImageGenerationForm = () => {
    return (
        <aside className="w-full h-full bg-foreground p-4">
            <form action="" className="w-full h-full bg-[#1C1C21] rounded-md">
                <header className="">
                    <h2 className="text-background font-bold border-gray-600 pl-4 pt-4">
                        이미지 생성
                    </h2>

                    <ModelSelector />

                    <PromptInput />

                    <StyleSelector />
                </header>
            </form>
        </aside>
    );
};
