import { downloadGeneratedVideo } from "@/features/generate-image/services/downloadGeneratedVideo";
import { generateVideo } from "@/features/generate-image/services/generateVideo";
import {
    generateVideoStatus,
    type GenerateVideoStatusResponse,
} from "@/features/generate-image/services/generateVideoStatus";
import { videoGenerationActions } from "@/features/generate-image/store/videoGenerationSlice";
import { blobToFile } from "@/features/generate-image/utils/blobToFile";
import { jsonToBlob } from "@/features/generate-image/utils/jsonToBlob";
import { urlToBlob } from "@/features/generate-image/utils/urlToBlob";
import { arrayToMaskImage } from "@/features/masking/utils/arrayToMaskImage";
import { dataURLtoBlob } from "@/features/masking/utils/dataUrlToBlob";

import { delay } from "@/shared/utils/delay";

import { createAsyncThunk } from "@reduxjs/toolkit";

export interface GenerateVideoPayload {
    originImageUrl: string;
    samMaskArrayBuffer: Array<Array<number>>;
    trajactoryJson: unknown;
}

export const generateVideoThunk = createAsyncThunk<void, GenerateVideoPayload>(
    "videoGeneration/generate",
    async (request, { dispatch, rejectWithValue }) => {
        try {
            if (
                !request.trajactoryJson ||
                (Array.isArray(request.trajactoryJson) && request.trajactoryJson.length === 0)
            ) {
                return rejectWithValue("궤적을 먼저 그려주세요.");
            }

            const blob = await urlToBlob(request.originImageUrl);
            const originImage = blobToFile(blob, "originImage.png");

            const dataUrl = arrayToMaskImage(request.samMaskArrayBuffer);
            const samMaskBlob = dataURLtoBlob(dataUrl as string);
            const samMask = blobToFile(samMaskBlob, "samMask.png");

            const trajactoryBlob = jsonToBlob(request.trajactoryJson);
            const trajectoryData = blobToFile(trajactoryBlob, "trajectory.json");

            console.log({
                originImage,
                samMask,
                trajectoryData,
            });

            const { job_id } = await generateVideo({
                originImage,
                samMask,
                trajectoryData,
            });

            let response: GenerateVideoStatusResponse;

            do {
                response = await generateVideoStatus(job_id);
                await delay(1000);
            } while (response.status !== "complete");

            const video = await downloadGeneratedVideo(job_id);
            const videoObjectUrl = URL.createObjectURL(video);

            dispatch(videoGenerationActions.setVideoObjectUrl(videoObjectUrl));
            dispatch(videoGenerationActions.setResponse(response));
            dispatch(videoGenerationActions.openModal());
        } catch (error) {
            console.error("비디오 생성 오류:", error);
            return rejectWithValue("비디오 생성 중 오류가 발생했습니다.");
        }
    },
);
