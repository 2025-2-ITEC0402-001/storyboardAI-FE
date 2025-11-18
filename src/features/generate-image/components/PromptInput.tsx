import { useFieldArray, useFormContext } from "react-hook-form";

import { Plus } from "lucide-react";

import { Button } from "@/shared/ui/button";

import type { FormSchemaType } from "../model/schema";
import { PromptFieldItem } from "./PromptFieldItem";

export const PromptInput = () => {
    const { control } = useFormContext<FormSchemaType>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "prompts",
    });

    const MAX_FIELDS = 3;
    const currentCount = fields.length;

    return (
        <section className="pt-4">
            <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-background">결과물 묘사</label>
                <span className="text-xs text-gray-500">
                    {currentCount}/{MAX_FIELDS}
                </span>
            </div>
            <div className="flex flex-col">
                {fields.map((field, index) => (
                    <PromptFieldItem key={field.id} index={index} onRemove={remove} />
                ))}
            </div>

            {currentCount < MAX_FIELDS && (
                <Button
                    type="button"
                    onClick={() => append({ value: "" })}
                    className="w-full mt-3 py-3 border-2 border-dashed bg-indigo-500/10 border-indigo-500/30 rounded-lg flex items-center justify-center text-indigo-400 hover:bg-indigo-500/50 transition-all"
                >
                    <Plus />
                    <span>필드 추가</span>
                </Button>
            )}
        </section>
    );
};
