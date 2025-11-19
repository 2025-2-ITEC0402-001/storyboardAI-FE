import type { EncodeImagePayload } from "@/features/masking/middlewares/EncodeImage";
import type { LoadImagePayload } from "@/features/masking/middlewares/LoadImage";
import type { OnnxSessionLoaderPayload } from "@/features/masking/middlewares/OnnxSessionLoader";
import type { PreprocessImagePayload } from "@/features/masking/middlewares/PreprocessImage";
import type { TransformTensorPayload } from "@/features/masking/middlewares/TransformTensor";

import type { BaseMiddleware } from "@/shared/middleware/BaseMiddleware";

// prettier-ignore
export type MaskingMiddlewarePayload = Partial<
    LoadImagePayload &
    OnnxSessionLoaderPayload &
    PreprocessImagePayload &
    TransformTensorPayload &
    EncodeImagePayload
>;

export interface MaskingMiddleware extends BaseMiddleware<MaskingMiddlewarePayload> {
    handle(payload: MaskingMiddlewarePayload): Promise<MaskingMiddlewarePayload>;
}
