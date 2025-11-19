export function transformCoordinates(
    clickX: number,
    clickY: number,
    canvasWidth: number,
    canvasHeight: number,
    imgWidth: number,
    imgHeight: number,
) {
    const imgMaxSide = Math.max(imgWidth, imgHeight);
    const scale = 1024 / imgMaxSide;

    const padX = imgWidth < imgHeight ? Math.floor((imgMaxSide - imgWidth) / 2) : 0;
    const padY = imgHeight < imgWidth ? Math.floor((imgMaxSide - imgHeight) / 2) : 0;

    const imgX = (clickX / canvasWidth) * imgWidth;
    const imgY = (clickY / canvasHeight) * imgHeight;

    return {
        x: (imgX + padX) * scale,
        y: (imgY + padY) * scale,
    };
}
