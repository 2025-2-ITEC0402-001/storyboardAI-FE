export class CanvasManager {
    public width: number;
    public height: number;

    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement | null) {
        if (!canvas) {
            throw new Error("Canvas 가 존재하지 않습니다");
        }

        this.canvas = canvas;
        const context = canvas.getContext("2d");

        const dpr = window.devicePixelRatio || 1;

        if (!context) {
            throw new Error("캔버스 컨텍스트를 가져올 수 없습니다.");
        }

        this.context = context;
        this.width = canvas.width;
        this.height = canvas.height;

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        context.scale(dpr, dpr);
    }
}
