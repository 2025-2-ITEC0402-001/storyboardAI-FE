import { api } from "@/shared/lib/api";

export interface GenerateImageRequest {
    prompt: string;
    height?: number;
    width?: number;
    guidanceScale?: number;
    numInferenceSteps?: number;
    seed?: number;
}

export interface GenerateImageResponse {
    taskId: string;
    message: string;
}

export async function generateImage(request: GenerateImageRequest) {
    const response = await api.post<GenerateImageResponse>(
        "/api/ai/images/generate",
        {},
        { params: request },
    );
    return response.data;
}
