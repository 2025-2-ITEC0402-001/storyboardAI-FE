export function renderMaskOverlay(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    maskCanvas: HTMLCanvasElement,
    canvasWidth: number,
    canvasHeight: number,
) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

    const viewMaxSide = Math.max(canvasWidth, canvasHeight);
    const viewPadX = img.width < img.height ? Math.floor((viewMaxSide - canvasWidth) / 2) : 0;
    const viewPadY = img.height < img.width ? Math.floor((viewMaxSide - canvasHeight) / 2) : 0;

    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.drawImage(
        maskCanvas,
        0,
        0,
        maskCanvas.width,
        maskCanvas.height,
        -viewPadX,
        -viewPadY,
        viewMaxSide,
        viewMaxSide,
    );
    ctx.restore();

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = img.width;
    tempCanvas.height = img.height;
    const tempCtx = tempCanvas.getContext("2d")!;

    const imgMaxSide = Math.max(img.width, img.height);
    const scale = maskCanvas.width / imgMaxSide;
    const maskPadX = img.width < img.height ? Math.floor((imgMaxSide - img.width) / 2) * scale : 0;
    const maskPadY = img.height < img.width ? Math.floor((imgMaxSide - img.height) / 2) * scale : 0;

    tempCtx.drawImage(
        maskCanvas,
        maskPadX,
        maskPadY,
        img.width * scale,
        img.height * scale,
        0,
        0,
        img.width,
        img.height,
    );

    const resizedImageData = tempCtx.getImageData(0, 0, img.width, img.height);
    const { data, width, height } = resizedImageData;

    const maskArray: number[][] = [];
    for (let y = 0; y < height; y++) {
        const row: number[] = [];
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const isMasked = data[idx + 3] > 0 ? 1 : 0;
            row.push(isMasked);
        }
        maskArray.push(row);
    }

    return maskArray;
}
