import React, { useEffect, useCallback } from "react";

import * as ort from "onnxruntime-web";

import { ProjectCanvasOverlay } from "@/entities/projects/components/ProjectCanvasOverlay";

import { Spinner } from "@/shared/components/Spinner";

import { useImageMasking } from "../../features/masking/hooks/useImageMasking";

ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.17.3/dist/";

export interface PrjoectCanvasWidgetProps {
    src?: string;
}

export const ProjectCanvasWidget = ({ src }: PrjoectCanvasWidgetProps) => {
    const { canvasRef, encode, decode, isProcessing, result } = useImageMasking();

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

            await decode(clickX, clickY, 1);
        },
        [canvasRef, decode],
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
        </div>
    );
};
