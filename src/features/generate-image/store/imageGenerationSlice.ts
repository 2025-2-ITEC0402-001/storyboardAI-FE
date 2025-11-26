import type { GenerateImageStreamResponse } from "@/features/generate-image/services/generateImageStream";
import { generateImageThunk } from "@/features/generate-image/store/imageGenerationThunk";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ImageGenerationState {
    isPending: boolean;
    event: GenerateImageStreamResponse | null;
    error: Error | unknown;
}

const initialState: ImageGenerationState = {
    isPending: false,
    event: null,
    error: null,
};

export const imageGenerationSlice = createSlice({
    name: "imageGeneration",
    initialState,
    reducers: {
        setEvent(state, action: PayloadAction<GenerateImageStreamResponse | null>) {
            state.event = action.payload;
        },
        reset(state) {
            state.event = null;
            state.error = null;
            state.isPending = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(generateImageThunk.pending, (state) => {
                state.isPending = true;
                state.error = null;
            })
            .addCase(generateImageThunk.fulfilled, (state) => {
                state.isPending = false;
            })
            .addCase(generateImageThunk.rejected, (state, action) => {
                state.isPending = false;
                state.error = action.error.message ?? "이미지 생성 중 오류가 발생했습니다.";
            });
    },
});

export const imageGenerationReducer = imageGenerationSlice.reducer;
export const imageGenerationActions = imageGenerationSlice.actions;
