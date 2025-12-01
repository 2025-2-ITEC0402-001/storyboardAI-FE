import { queryClient } from "@/app/lib/query";
import type { RootState } from "@/app/store/store";

import {
    generateImageStream,
    type GenerateImageStreamResponse,
} from "@/features/generate-image/services/generateImageStream";
import { PROJECT_QUERY_KEYS } from "@/features/manage-project/services/_keys";
import { setProjectThumbnail } from "@/features/manage-project/services/setProjectThumbnail";

import { layoutActions } from "@/shared/store/layoutSlice";

import { type GenerateImageRequest, generateImage } from "../services/generateImage";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const generateImageThunk = createAsyncThunk<
    void,
    GenerateImageRequest & { projectId: string }
>("imageGeneration/generate", async (request, { dispatch, rejectWithValue, getState }) => {
    try {
        const { taskId } = await generateImage(request);

        for await (const streamEvent of generateImageStream(taskId)) {
            dispatch(imageGenerationActions.setEvent(streamEvent));
        }

        const state = getState() as RootState;
        const imageUrl = state.imageGeneration.event?.imageUrl;
        setProjectThumbnail(request.projectId, imageUrl as string);

        queryClient.invalidateQueries({
            queryKey: [PROJECT_QUERY_KEYS.DETAIL(request.projectId), PROJECT_QUERY_KEYS.LIST()],
        });

        dispatch(layoutActions.changeMode({ mode: "edit" }));
    } catch {
        return rejectWithValue("이미지 생성 중 오류가 발생했습니다.");
    }
});

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
