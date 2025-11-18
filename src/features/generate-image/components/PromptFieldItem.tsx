import { useFormContext } from "react-hook-form";

import type { FormSchemaType } from "../model/schema";

interface PromptFieldItemProps {
    index: number;
    onRemove: (index: number) => void;
}

export const PromptFieldItem = ({ index, onRemove }: PromptFieldItemProps) => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<FormSchemaType>();

    const currentValue = watch(`prompts.${index}.value`) || "";
    const currentLength = currentValue.length;
    const MAX_LENGTH = 500;

    const errorMessage = errors.prompts?.[index]?.value?.message;

    return (
        <div
            className={`relative bg-[#0E0E11]/70 rounded-lg p-3 mb-3 border transition-colors ${errorMessage ? "border-red-500" : "border-gray-800 focus-within:border-blue-500"}`}
        >
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-xs font-medium">묘사 {index + 1}</span>
                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="text-gray-500 hover:text-red-500"
                >
                    ✕
                </button>
            </div>

            <textarea
                rows={3}
                maxLength={MAX_LENGTH}
                className={`
        w-full bg-transparent text-sm text-gray-200 resize-none placeholder-gray-600 focus:outline-none
        
        /* 스크롤바 커스텀 시작 */
        [&::-webkit-scrollbar]:w-1.5          /* 스크롤바 너비 (6px) */
        [&::-webkit-scrollbar-track]:bg-transparent  /* 트랙 배경 투명 */
        [&::-webkit-scrollbar-thumb]:bg-gray-700     /* 스크롤바 색상 (어두운 회색) */
        [&::-webkit-scrollbar-thumb]:rounded-full    /* 스크롤바 둥글게 */
        [&::-webkit-scrollbar-thumb]:bg-clip-content /* (선택) 약간의 여백 효과 */
        /* 스크롤바 커스텀 끝 */
    `}
                placeholder="결과물에 대해 설명해 주세요."
                {...register(`prompts.${index}.value`)}
            />

            <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-red-500 h-4">{errorMessage}</span>

                <span className="text-xs text-gray-500">
                    {currentLength}/{MAX_LENGTH}
                </span>
            </div>
        </div>
    );
};
