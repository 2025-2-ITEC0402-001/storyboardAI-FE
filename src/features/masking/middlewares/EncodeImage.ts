import * as ort from "onnxruntime-web";

import type {
    MaskingMiddleware,
    MaskingMiddlewarePayload,
} from "@/features/masking/middlewares/MaskingMiddleware";

export type EncodeImagePayload = {
    high_res_feats_0?: ort.Tensor;
    high_res_feats_1?: ort.Tensor;
    image_embed?: ort.Tensor;
};

export class EncodeImageMiddleware implements MaskingMiddleware {
    public async handle(payload: MaskingMiddlewarePayload) {
        const { encoderSession, outputTensor } = payload;

        if (!encoderSession) {
            throw new Error("encoderSession이 없습니다.");
        }

        if (!outputTensor) {
            throw new Error("outputTensor가 없습니다.");
        }

        try {
            const encoderOutput = await encoderSession.run({ image: outputTensor });

            const outputNames = encoderSession.outputNames;
            const high_res_feats_0 = encoderOutput[outputNames[0]] as ort.Tensor;
            const high_res_feats_1 = encoderOutput[outputNames[1]] as ort.Tensor;
            const image_embed = encoderOutput[outputNames[2]] as ort.Tensor;

            return {
                ...payload,
                high_res_feats_0,
                high_res_feats_1,
                image_embed,
            };
        } catch (error) {
            console.error("인코더 실행 실패:", error);
            throw new Error("이미지 인코딩에 실패했습니다.");
        }
    }
}
