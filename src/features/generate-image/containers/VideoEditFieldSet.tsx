import { Fragment } from "react/jsx-runtime";

import { Button } from "@/shared/ui/button";

import paintIcon from "../assets/paint.svg";

export const VideoEditFieldSet = () => {
    return (
        <Fragment>
            <fieldset className="my-10">
                <img src={paintIcon} alt="paint icon" className="mx-auto block w-36" />
                <h3 className="text-center text-gray-400 leading-tight">
                    <p>영상을 생성하려면</p>
                    <p>먼저 편집할 부분을 선택해주세요</p>
                </h3>
            </fieldset>

            <fieldset>
                <Button className="w-full">영상 생성하기</Button>
            </fieldset>
        </Fragment>
    );
};
