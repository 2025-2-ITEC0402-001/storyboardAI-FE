import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface MaskingState {
    maskArray: number[][] | null;
    trajectory: number[][] | null;
}

const initialState: MaskingState = {
    maskArray: null,
    trajectory: null,
};

export const maskingSlice = createSlice({
    name: "masking",
    initialState,
    reducers: {
        setMaskArray: (state, action: PayloadAction<number[][]>) => {
            state.maskArray = action.payload;
        },
        clearMaskArray: (state) => {
            state.maskArray = null;
        },
        setTrajectory: (state, action: PayloadAction<number[][]>) => {
            state.trajectory = action.payload;
        },
        clearTrajectory: (state) => {
            state.trajectory = null;
        },
    },
});

export const maskingActions = maskingSlice.actions;
