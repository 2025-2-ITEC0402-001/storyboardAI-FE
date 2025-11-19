import * as ort from "onnxruntime-web";

import type {
    MaskingMiddleware,
    MaskingMiddlewarePayload,
} from "@/features/masking/middlewares/MaskingMiddleware";

export type TransformTensorPayload = {
    outputTensor: ort.TypedTensor<"float32">;
};

export class TransformTensorMiddleware implements MaskingMiddleware {
    public async handle(payload: MaskingMiddlewarePayload) {
        const { outputCanvas, outputContext } = payload;

        if (!outputCanvas || !outputContext) {
            throw new Error("outputCanvas 또는 outputContext가 없습니다.");
        }

        const rgba = outputContext.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
        const size = outputCanvas.width * outputCanvas.height;

        const R = new Float32Array(size);
        const G = new Float32Array(size);
        const B = new Float32Array(size);

        for (let i = 0, pixel = 0; i < rgba.data.length; i += 4, pixel++) {
            R[pixel] = rgba.data[i] / 255;
            G[pixel] = rgba.data[i + 1] / 255;
            B[pixel] = rgba.data[i + 2] / 255;
        }

        const normalizedTensor = new Float32Array(size * 3);
        normalizedTensor.set(R, 0);
        normalizedTensor.set(G, size);
        normalizedTensor.set(B, size * 2);

        const outputTensor = new ort.Tensor("float32", normalizedTensor, [
            1,
            3,
            outputCanvas.width,
            outputCanvas.height,
        ]);

        return {
            ...payload,
            outputTensor,
        };
    }
}
