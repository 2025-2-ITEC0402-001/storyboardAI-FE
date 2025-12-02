import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/app/store/store";

import { layoutActions } from "@/shared/store/layoutSlice";
import { Button } from "@/shared/ui/button";

import paintIcon from "../assets/paint.svg";

export const MaskingForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const isMasked = useSelector((state: RootState) => state.layout.isMasked);

    return (
        <aside className="w-full h-full bg-foreground p-4">
            <div className="w-full h-full bg-[#1C1C21] rounded-md px-4 flex flex-col">
                <section>
                    <h2 className="text-background font-bold border-gray-600 py-4">마스킹 선택</h2>

                    <fieldset className="my-10">
                        <img src={paintIcon} alt="paint icon" className="mx-auto block w-36" />
                        <h3 className="text-center text-gray-400 leading-tight">
                            <p>영상을 생성하려면</p>
                            <p>먼저 편집할 부분을 선택해주세요</p>
                        </h3>
                    </fieldset>

                    <fieldset>
                        <Button
                            disabled={!isMasked}
                            className="w-full"
                            onClick={() =>
                                dispatch(
                                    layoutActions.changeMode({
                                        mode: "edit:video",
                                    }),
                                )
                            }
                        >
                            선택 완료
                        </Button>
                    </fieldset>
                </section>
            </div>
        </aside>
    );
};
