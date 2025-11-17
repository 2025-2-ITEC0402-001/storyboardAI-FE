/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
    interface GPUAdapter {
        requestAdapterInfo?: () => Promise<any>;
        info?: any;
    }
}

if (typeof navigator !== "undefined" && "gpu" in navigator) {
    const gpu = navigator.gpu as any;
    const origRequestAdapter = gpu.requestAdapter;

    gpu.requestAdapter = async function (options?: any) {
        const adapter = await origRequestAdapter.call(this, options);

        if (adapter && !adapter.requestAdapterInfo && adapter.info) {
            adapter.requestAdapterInfo = async () => adapter.info;
        }

        return adapter;
    };
}

export {};
