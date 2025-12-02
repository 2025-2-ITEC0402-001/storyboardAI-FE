import { imageGenerationReducer } from "@/features/generate-image/store/imageGenerationSlice";
import { videoGenerationReducer } from "@/features/generate-image/store/videoGenerationSlice";
import { maskingSlice } from "@/features/masking/store/maskingSlice";

import { layoutReducer } from "@/shared/store/layoutSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        imageGeneration: imageGenerationReducer,
        videoGeneration: videoGenerationReducer,
        layout: layoutReducer,
        masking: maskingSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
