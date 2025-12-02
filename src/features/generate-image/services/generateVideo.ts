import { api } from "@/shared/lib/api";

export interface GenerateVideoRequest {
    originImage: File;
    samMask: File;
    trajectoryData: File;
    frameNumber?: number;
}

export interface GenerateVideoResponse {
    status: string;
    job_id: string;
    status_url: string;
}

const DEFAULT_FRAME_NUMBER = "14";

export async function generateVideo(request: GenerateVideoRequest) {
    const formData = new FormData();
    formData.append("originImage", request.originImage);
    formData.append("samMask", request.samMask);
    formData.append("trajectoryData", request.trajectoryData);
    formData.append("frameNumber", request.frameNumber?.toString() || DEFAULT_FRAME_NUMBER);

    const response = await api.post<GenerateVideoResponse>("/api/ai/videos/generate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
}
