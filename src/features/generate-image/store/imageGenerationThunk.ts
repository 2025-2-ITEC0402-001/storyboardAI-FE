import {
    generateImage,
    type GenerateImageRequest,
} from "@/features/generate-image/services/generateImage";
import { generateImageStream } from "@/features/generate-image/services/generateImageStream";
import { imageGenerationActions } from "@/features/generate-image/store/imageGenerationSlice";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const generateImageThunk = createAsyncThunk<void, GenerateImageRequest>(
    "imageGeneration/generate",
    async (request, { dispatch, rejectWithValue }) => {
        try {
            const { taskId } = await generateImage(request);

            for await (const streamEvent of generateImageStream(taskId)) {
                dispatch(imageGenerationActions.setEvent(streamEvent));
            }
        } catch {
            return rejectWithValue("이미지 생성 중 오류가 발생했습니다.");
        }
    },
);
