import { api } from "@/shared/lib/api";

export interface GenerateVideoStatusResponse {
    status: string;
    video_url?: string;
}

export async function generateVideoStatus(jobId: string) {
    const response = await api.get<GenerateVideoStatusResponse>(`/api/ai/videos/status/${jobId}`);
    return response.data;
}
