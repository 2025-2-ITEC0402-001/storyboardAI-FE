import { useState, useCallback, useMemo, useRef } from "react";

import * as ort from "onnxruntime-web";

import { CanvasManager } from "@/features/masking/lib/CanvasManager";
import { OnnxSessionManager } from "@/features/masking/lib/OnnxSessionManager";
import { bestIndex, maskToCanvas } from "@/features/masking/lib/mask";
import { EncodeImageMiddleware } from "@/features/masking/middlewares/EncodeImage";
import { LoadImageMiddleware } from "@/features/masking/middlewares/LoadImage";
import type { MaskingMiddlewarePayload } from "@/features/masking/middlewares/MaskingMiddleware";
import { OnnxSessionLoaderMiddleware } from "@/features/masking/middlewares/OnnxSessionLoader";
import { PreprocessImageMiddleware } from "@/features/masking/middlewares/PreprocessImage";
import { TransformTensorMiddleware } from "@/features/masking/middlewares/TransformTensor";
import { createDecoderInputs } from "@/features/masking/utils/createDecoderInputs";
import { renderMaskOverlay } from "@/features/masking/utils/renderMaskOverlay";
import { transformCoordinates } from "@/features/masking/utils/transformCoordinates";

import type { Middlewares } from "@/shared/middleware/BaseMiddleware";

const ENCODER = "/onnx/sam2_hiera_tiny.encoder.with_runtime_opt.ort";
const DECODER = "/onnx/sam2_hiera_tiny.decoder.onnx";

export const useImageMasking = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const onnxLoader = useMemo(() => new OnnxSessionManager(["webgpu", "cpu"]), []);

    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [result, setResult] = useState<MaskingMiddlewarePayload | null>(null);

    const encode = useCallback(
        async (imgSrc?: string) => {
            if (!canvasRef.current) {
                throw new Error("Canvas가 준비되지 않았습니다.");
            }

            setIsProcessing(true);
            setError(null);

            try {
                const canvasManager = new CanvasManager(canvasRef.current);

                const maskingMiddlewares: Middlewares = [
                    { name: "이미지 로드", middleware: new LoadImageMiddleware(canvasManager) },
                    {
                        name: "모델 로드",
                        middleware: new OnnxSessionLoaderMiddleware(onnxLoader, ENCODER, DECODER),
                    },
                    { name: "이미지 전처리", middleware: new PreprocessImageMiddleware() },
                    { name: "텐서 변환", middleware: new TransformTensorMiddleware() },
                    { name: "이미지 인코딩", middleware: new EncodeImageMiddleware() },
                ];

                let payload: MaskingMiddlewarePayload = {
                    imgSrc,
                };
                for (const { middleware } of maskingMiddlewares) {
                    payload = (await middleware.handle(payload)) as MaskingMiddlewarePayload;
                }
                setResult(payload);
                return payload;
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsProcessing(false);
            }
        },
        [onnxLoader],
    );

    const decode = useCallback(
        async (clickX: number, clickY: number, label: number = 1) => {
            if (
                !result?.decoderSession ||
                !result?.image_embed ||
                !canvasRef.current ||
                !result?.img
            ) {
                console.warn("디코더 준비되지 않음");
                return null;
            }

            const canvas = canvasRef.current;
            const img = result.img;

            try {
                const point = transformCoordinates(
                    clickX,
                    clickY,
                    canvas.width,
                    canvas.height,
                    img.width,
                    img.height,
                );

                const inputs = createDecoderInputs(
                    result.decoderSession.inputNames,
                    result,
                    point.x,
                    point.y,
                    label,
                );

                const output = await result.decoderSession.run(inputs);

                const masks = (output.masks ??
                    output[
                        result.decoderSession.outputNames.find((n) => /mask/i.test(n))!
                    ]) as ort.Tensor;
                const ious = (output.iou_predictions ??
                    output[
                        result.decoderSession.outputNames.find((n) => /iou/i.test(n))!
                    ]) as ort.Tensor;

                const bestIdx = bestIndex(ious.data as Float32Array);
                const maskCanvas = maskToCanvas(masks, bestIdx);

                const ctx = canvas.getContext("2d")!;
                const maskArray = renderMaskOverlay(
                    ctx,
                    img,
                    maskCanvas,
                    canvas.width,
                    canvas.height,
                );

                let maskArrayToString = "";
                for (let y = 0; y < maskArray.length; y++) {
                    for (let x = 0; x < maskArray[0].length; x++) {
                        maskArrayToString += maskArray[y][x];
                    }
                    maskArrayToString += "\n";
                }
                console.log(maskArrayToString);

                return { maskCanvas, maskArray };
            } catch (err) {
                console.error("디코더 실행 실패:", err);
                setError(err as Error);
                return null;
            }
        },
        [result, canvasRef],
    );

    return {
        canvasRef,
        encode,
        decode,
        isProcessing,
        error,
        result,
    };
};
