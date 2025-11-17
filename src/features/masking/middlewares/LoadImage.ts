import type { CanvasManager } from "@/features/masking/lib/CanvasManager";
import type {
    MaskingMiddleware,
    MaskingMiddlewarePayload,
} from "@/features/masking/middlewares/MaskingMiddleware";

export type LoadImagePayload = {
    img: HTMLImageElement;
    imgSrc: string;
    imgRatio: number;
};

export class LoadImageMiddleware implements MaskingMiddleware {
    private readonly canvasManager: CanvasManager;

    constructor(canvasManager: CanvasManager) {
        this.canvasManager = canvasManager;
    }

    public async handle(payload: MaskingMiddlewarePayload): Promise<MaskingMiddlewarePayload> {
        const { imgSrc } = payload;

        if (!imgSrc) {
            throw new Error("imgSrc가 없습니다.");
        }

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imgSrc;

        return new Promise((resolve, reject) => {
            img.onload = () => {
                const imgRatio = img.width / img.height;
                this.canvasManager.canvas.height = Math.round(this.canvasManager.width / imgRatio);

                this.canvasManager.context.clearRect(
                    0,
                    0,
                    this.canvasManager.canvas.width,
                    this.canvasManager.canvas.height,
                );

                this.canvasManager.context.drawImage(
                    img,
                    0,
                    0,
                    this.canvasManager.canvas.width,
                    this.canvasManager.canvas.height,
                );

                resolve({
                    ...payload,
                    img,
                    imgSrc,
                    imgRatio,
                });
            };
            img.onerror = () => {
                reject(new Error(`이미지 로드 실패: ${imgSrc}`));
            };
        });
    }
}
