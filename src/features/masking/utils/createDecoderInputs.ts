import * as ort from "onnxruntime-web";

import type { MaskingMiddlewarePayload } from "@/features/masking/middlewares/MaskingMiddleware";

export function createDecoderInputs(
    inputNames: readonly string[],
    result: MaskingMiddlewarePayload,
    pointX: number,
    pointY: number,
    label: number,
) {
    const inputs: Record<string, ort.Tensor> = {};

    if (inputNames.includes("image_embed") && result.image_embed)
        inputs.image_embed = result.image_embed;

    if (inputNames.includes("high_res_feats_0") && result.high_res_feats_0)
        inputs.high_res_feats_0 = result.high_res_feats_0;

    if (inputNames.includes("high_res_feats_1") && result.high_res_feats_1)
        inputs.high_res_feats_1 = result.high_res_feats_1;

    if (inputNames.includes("point_coords"))
        inputs.point_coords = new ort.Tensor(
            "float32",
            new Float32Array([pointX, pointY]),
            [1, 1, 2],
        );

    if (inputNames.includes("point_labels"))
        inputs.point_labels = new ort.Tensor("float32", new Float32Array([label]), [1, 1]);

    if (inputNames.includes("mask_input"))
        inputs.mask_input = new ort.Tensor(
            "float32",
            new Float32Array(256 * 256).fill(0),
            [1, 1, 256, 256],
        );

    if (inputNames.includes("has_mask_input"))
        inputs.has_mask_input = new ort.Tensor("float32", new Float32Array([0]), [1]);

    const sizeInput = inputNames.find(
        (name) => name.toLowerCase().includes("size") || name.toLowerCase().includes("orig"),
    );

    if (sizeInput) {
        inputs[sizeInput] = new ort.Tensor("float32", new Float32Array([1024, 1024]), [2]);
    }

    return inputs;
}
