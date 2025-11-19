import React, { useEffect, useCallback } from "react";

import * as ort from "onnxruntime-web";

import { useImageMasking } from "../hooks/useImageMasking";

ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.17.3/dist/";

export default function CanvasSegmentation({ src }: { src: string }) {
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
                }}
            />

            {isProcessing && (
                <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-black/50 text-xl font-semibold">
                    이미지 인코딩 중...
                </div>
            )}
        </div>
    );
}
