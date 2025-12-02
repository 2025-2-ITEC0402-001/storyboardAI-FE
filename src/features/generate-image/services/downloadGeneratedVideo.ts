import { api } from "@/shared/lib/api";

export async function downloadGeneratedVideo(jobId: string) {
    const response = await api.get<Blob>(`/api/ai/videos/download/${jobId}`, {
        headers: { Accept: "video/mp4" },
        responseType: "blob",
    });
    return response.data;
}
