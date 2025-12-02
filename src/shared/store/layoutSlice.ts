import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type LayoutMode = "generate" | "edit:video" | "edit:image" | "masking";

export interface LayoutState {
    mode: LayoutMode;
    isMasked: boolean;
}

const layoutInitialState: LayoutState = {
    mode: "generate",
    isMasked: false,
};

export const layoutSlice = createSlice({
    name: "layout",
    initialState: layoutInitialState,
    reducers: {
        changeMode(state, action: PayloadAction<Pick<LayoutState, "mode">>) {
            state.mode = action.payload.mode;
        },
        setIsMasked(state, action: PayloadAction<boolean>) {
            state.isMasked = action.payload;
        },
    },
});

export const layoutActions = layoutSlice.actions;
export const layoutReducer = layoutSlice.reducer;
