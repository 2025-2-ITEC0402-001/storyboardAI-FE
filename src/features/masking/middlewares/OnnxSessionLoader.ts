import * as ort from "onnxruntime-web";

import type { OnnxSessionManager } from "@/features/masking/lib/OnnxSessionManager";
import type {
    MaskingMiddleware,
    MaskingMiddlewarePayload,
} from "@/features/masking/middlewares/MaskingMiddleware";

export type OnnxSessionLoaderPayload = {
    encoderSession?: ort.InferenceSession;
    decoderSession?: ort.InferenceSession;
};

export class OnnxSessionLoaderMiddleware implements MaskingMiddleware {
    private readonly onnxSessionManager: OnnxSessionManager;
    private readonly encoderUrl: string;
    private readonly decoderUrl: string;

    constructor(loader: OnnxSessionManager, encoderUrl: string, decoderUrl: string) {
        this.onnxSessionManager = loader;
        this.encoderUrl = encoderUrl;
        this.decoderUrl = decoderUrl;
    }

    public async handle(payload: MaskingMiddlewarePayload) {
        const encoderSession = await this.onnxSessionManager.createSession(this.encoderUrl);
        const decoderSession = await this.onnxSessionManager.createSession(this.decoderUrl);

        return {
            ...payload,
            encoderSession,
            decoderSession,
        };
    }
}
