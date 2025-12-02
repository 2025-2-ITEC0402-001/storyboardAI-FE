import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as ort from "onnxruntime-web";

import type { AppDispatch, RootState } from "@/app/store/store";

import { ProjectCanvasOverlay } from "@/entities/projects/components/ProjectCanvasOverlay";

import { VideoTrajactoryLayer } from "@/features/generate-image/containers/VideoTrajactoryLayer";
import { maskingActions } from "@/features/masking/store/maskingSlice";

import { Spinner } from "@/shared/components/Spinner";
import { layoutActions } from "@/shared/store/layoutSlice";

import { useImageMasking } from "../../features/masking/hooks/useImageMasking";

ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.17.3/dist/";

export interface PrjoectCanvasWidgetProps {
    src?: string;
}

export const ProjectCanvasWidget = ({ src }: PrjoectCanvasWidgetProps) => {
    const { canvasRef, encode, decode, isProcessing, result } = useImageMasking();

    const mode = useSelector((state: RootState) => state.layout.mode);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        encode(src);
    }, [encode, src]);

    const handleClick = useCallback(
        async (e: React.MouseEvent<HTMLCanvasElement>) => {
            if (!canvasRef.current) return;

            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();

            const clickX = ((e.clientX - rect.left) / rect.width) * canvas.width;
            const clickY = ((e.clientY - rect.top) / rect.height) * canvas.height;

            const result = await decode(clickX, clickY, 1);
            if (result?.maskArray) {
                dispatch(maskingActions.setMaskArray(result.maskArray));
            }
            dispatch(layoutActions.setIsMasked(true));
        },
        [canvasRef, decode, dispatch],
    );

    return (
        <div className="relative">
            <canvas
                ref={canvasRef}
                onClick={handleClick}
                style={{
                    width: 720,
                    height: "auto",
                    cursor: result?.image_embed ? "crosshair" : "not-allowed",
                    backgroundColor: "#222222",
                }}
            />

            {isProcessing && (
                <ProjectCanvasOverlay>
                    <Spinner />
                    <p className="text-sm text-white my-1">이미지 임베딩 생성중</p>
                </ProjectCanvasOverlay>
            )}
            {mode === "edit:video" && <VideoTrajactoryLayer canvasRef={canvasRef} />}
        </div>
    );
};
