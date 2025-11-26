import { Fragment } from "react/jsx-runtime";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

export const ImageEditFieldSet = () => {
    return (
        <Fragment>
            <fieldset>
                <label className="text-sm font-medium text-background my-1">결과물 묘사</label>
                <div
                    className={cn(
                        "relative bg-[#0E0E11]/70 rounded-lg p-3 mb-3 border transition-colors",
                        "border-gray-800 focus-within:border-primary",
                    )}
                >
                    <textarea
                        rows={5}
                        className={cn(
                            "w-full bg-transparent text-sm text-gray-200 resize-none placeholder-gray-600 focus:outline-none scrollbar-textarea",
                        )}
                        placeholder="변경할 내용을 입력해주세요"
                    />
                </div>
            </fieldset>

            <fieldset>
                <Button className="w-full">이미지 편집하기</Button>
            </fieldset>
        </Fragment>
    );
};
