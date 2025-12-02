export function arrayToMaskImage(mask: Array<Array<number>>) {
    const height = mask.length;
    const width = mask[0].length;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const imageData = ctx.createImageData(width, height);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;

            const value = mask[y][x] === 1 ? 255 : 0;
            imageData.data[offset + 0] = value; // R
            imageData.data[offset + 1] = value; // G
            imageData.data[offset + 2] = value; // B
            imageData.data[offset + 3] = 255; // A
        }
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
}
