import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type LayoutMode = "generate" | "edit";

export interface LayoutState {
    mode: LayoutMode;
}

const layoutInitialState: LayoutState = {
    mode: "generate",
};

export const layoutSlice = createSlice({
    name: "layout",
    initialState: layoutInitialState,
    reducers: {
        changeMode(state, action: PayloadAction<LayoutState>) {
            state.mode = action.payload.mode;
        },
    },
});

export const { changeMode } = layoutSlice.actions;
export const layoutReducer = layoutSlice.reducer;
