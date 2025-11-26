import { layoutReducer } from "@/shared/store/layoutSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        layoutReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
