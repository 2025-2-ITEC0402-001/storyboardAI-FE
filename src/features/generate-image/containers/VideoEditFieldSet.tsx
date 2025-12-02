import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";

import type { AppDispatch, RootState } from "@/app/store/store";

import { VideoGenerationModal } from "@/features/generate-image/components/VideoGenerationModal";
import { generateVideoThunk } from "@/features/generate-image/store/videoGenerationThunk";

import { Button } from "@/shared/ui/button";

import paintIcon from "../assets/paint.svg";

export const VideoEditFieldSet = () => {
    const dispatch: AppDispatch = useDispatch();
    const originImageUrl = useSelector((state: RootState) => state.imageGeneration.event?.imageUrl);
    const maskArray = useSelector((state: RootState) => state.masking.maskArray);
    const trajectory = useSelector((state: RootState) => state.masking.trajectory);

    return (
        <Fragment>
            <fieldset className="my-10">
                <img src={paintIcon} alt="paint icon" className="mx-auto block w-36" />
                <h3 className="text-center text-gray-400 leading-tight">
                    <p>영상을 생성하려면</p>
                    <p>이미지 위에 궤적을 그려주세요!</p>
                </h3>
            </fieldset>

            <fieldset>
                <Button
                    type="button"
                    className="w-full"
                    onClick={() => {
                        dispatch(
                            generateVideoThunk({
                                originImageUrl: originImageUrl as string,
                                samMaskArrayBuffer: maskArray as Array<Array<number>>,
                                trajactoryJson: trajectory as Array<Array<number>>,
                            }),
                        );
                    }}
                >
                    영상 생성하기
                </Button>
            </fieldset>

            <VideoGenerationModal />
        </Fragment>
    );
};
