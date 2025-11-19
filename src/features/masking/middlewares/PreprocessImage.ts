import type {
    MaskingMiddleware,
    MaskingMiddlewarePayload,
} from "@/features/masking/middlewares/MaskingMiddleware";

export type PreprocessImagePayload = {
    img: HTMLImageElement;

    outputCanvas: HTMLCanvasElement;
    outputContext: CanvasRenderingContext2D;
    padX: number;
    padY: number;
    scale: number;
};

export class PreprocessImageMiddleware implements MaskingMiddleware {
    public async handle(payload: MaskingMiddlewarePayload) {
        const { img } = payload;

        if (!img) {
            throw new Error("img가 없습니다.");
        }

        const imgMaxSide = this.getMaxSide(img);
        const { context } = this.setupCanvas(imgMaxSide, imgMaxSide);
        const { padX, padY } = this.getPadding(img, imgMaxSide);

        console.log("Padding:", {
            padX,
            padY,
            imgWidth: img.width,
            imgHeight: img.height,
            imgMaxSide,
        });

        context.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            padX,
            padY,
            imgMaxSide - padX * 2,
            imgMaxSide - padY * 2,
        );

        const { canvas: outputCanvas, context: outputContext } = this.setupCanvas(1024, 1024);
        outputContext.drawImage(context.canvas, 0, 0, imgMaxSide, imgMaxSide, 0, 0, 1024, 1024);

        const scale = 1024 / imgMaxSide;

        return {
            ...payload,
            outputCanvas,
            outputContext,
            padX: Math.round(padX * scale), // 1024 스케일로 변환된 패딩
            padY: Math.round(padY * scale),
            scale,
        };
    }

    private setupCanvas(width: number, height: number) {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");
        if (!context) throw new Error("캔버스의 2d Context 를 가져올 수 없습니다.");

        return { canvas, context };
    }

    private getMaxSide(img: HTMLImageElement) {
        return Math.max(img.width, img.height);
    }

    private getPadding(img: HTMLImageElement, maxSide: number) {
        const padX = img.width < img.height ? Math.floor((maxSide - img.width) / 2) : 0;
        const padY = img.height < img.width ? Math.floor((maxSide - img.height) / 2) : 0;
        return { padX, padY };
    }
}
