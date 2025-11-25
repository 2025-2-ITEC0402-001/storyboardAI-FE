import { useAuthStore } from "@/features/auth/store/authStore";

import { API_BASE_URL } from "@/shared/lib/api";

const SERVER_SENT_EVENT_DATA_PREFIX = "data:";

export type ImageGenerationStatus = "UPLOADING" | "COMPLETED";

export interface GenerateImageStreamResponse {
    taskId: string;
    status: ImageGenerationStatus;
    message: string;
    progress: number;
    imageUrl?: string;
    timestamp: string;
}

/**
 * @example
 * for await (const event of generateImageStream(taskId)) {
 *     console.log(event);
 * }
 */
export async function* generateImageStream(
    taskId: string,
): AsyncGenerator<GenerateImageStreamResponse> {
    const { accessToken } = useAuthStore.getState();

    const response = await fetch(API_BASE_URL + `/api/ai-images/stream/${taskId}`, {
        method: "GET",
        headers: {
            Accept: "text/event-stream",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok || !response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = "";

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const eventText of events) {
            const lines = eventText.split("\n");

            for (const line of lines) {
                if (line.startsWith(SERVER_SENT_EVENT_DATA_PREFIX)) {
                    const json = line.replace(SERVER_SENT_EVENT_DATA_PREFIX, "").trim();

                    const parsed: GenerateImageStreamResponse = JSON.parse(json);
                    yield parsed;

                    if (parsed.status === "COMPLETED") return;
                }
            }
        }
    }
}
