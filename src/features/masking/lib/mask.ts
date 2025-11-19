import * as ort from "onnxruntime-web";

export function maskToCanvas(masks: ort.Tensor, bestIdx: number) {
    const dims = masks.dims;

    const W = dims[2],
        H = dims[3];

    const stride = W * H;
    const offset = stride * bestIdx;
    const data = (masks.data as Float32Array).subarray(offset, offset + stride);

    const out = document.createElement("canvas");
    out.width = W;
    out.height = H;
    const rgba = new Uint8ClampedArray(stride * 4);
    for (let i = 0; i < stride; i++) {
        const on = data[i] > 0 ? 255 : 0;
        const t = i * 4;
        rgba[t] = 255;
        rgba[t + 1] = 0;
        rgba[t + 2] = 0;
        rgba[t + 3] = on;
    }
    const id = new ImageData(rgba, W, H);
    out.getContext("2d")!.putImageData(id, 0, 0);
    return out;
}

export function bestIndex(ious: Float32Array) {
    let m = -Infinity,
        idx = 0;
    for (let i = 0; i < ious.length; i++)
        if (ious[i] > m) {
            m = ious[i];
            idx = i;
        }
    return idx;
}
