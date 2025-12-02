import { type GenerateVideoRequest } from "@/features/generate-image/services/generateVideo";
import { type GenerateVideoStatusResponse } from "@/features/generate-image/services/generateVideoStatus";
import { generateVideoThunk } from "@/features/generate-image/store/videoGenerationThunk";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface GenerateVideoPayload {
    originImageUrl: string;
    samMaskArrayBuffer: Array<Array<number>>;
    trajactoryJson: unknown;
}

export interface VideoGenerationState {
    isPending: boolean;
    isSuccess: boolean;
    isGenerating: boolean;
    request: GenerateVideoRequest | null;
    response: GenerateVideoStatusResponse | null;
    error: Error | unknown;

    isVideoGenerationModalOpen?: boolean;

    videoObjectUrl: string | null;
}

const initialState: VideoGenerationState = {
    isPending: false,
    isSuccess: false,
    isGenerating: false,

    response: null,

    error: null,
    isVideoGenerationModalOpen: false,
    request: null,

    videoObjectUrl: null,
};

export const videoGenerationSlice = createSlice({
    name: "videoGeneration",
    initialState,
    reducers: {
        openModal(state) {
            state.isVideoGenerationModalOpen = true;
        },
        closeModal(state) {
            state.isVideoGenerationModalOpen = false;
        },
        setResponse(state, action: PayloadAction<GenerateVideoStatusResponse | null>) {
            state.response = action.payload;
        },
        setVideoObjectUrl(state, action: PayloadAction<string | null>) {
            state.videoObjectUrl = action.payload;
        },
        setIsGenerating(state, action: PayloadAction<boolean>) {
            state.isGenerating = action.payload;
        },
        reset(state) {
            state.response = null;
            state.error = null;
            state.isPending = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(generateVideoThunk.pending, (state) => {
                state.isPending = true;
                state.error = null;
            })
            .addCase(generateVideoThunk.fulfilled, (state) => {
                state.isPending = false;
                state.isSuccess = true;
            })
            .addCase(generateVideoThunk.rejected, (state, action) => {
                state.isPending = false;
                state.error = action.error.message ?? "비디오 생성 중 오류가 발생했습니다.";
            });
    },
});

export const videoGenerationReducer = videoGenerationSlice.reducer;
export const videoGenerationActions = videoGenerationSlice.actions;
