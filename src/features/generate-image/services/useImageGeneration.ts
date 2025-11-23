import { useState, useCallback } from "react";

import { useAuthStore } from "@/features/auth/store/authStore";

import { api } from "@/shared/lib/api";

import { defaultGenerateImageSchema } from "../model/GenerateImageSchema";
import type { ImageGenerationEvent } from "../model/ImageStreamSchema";
import type { PromptFormSchemaType } from "../model/PromptFormSchema";
import { formatPromptPayload } from "../utils/formatPrompt";
import { fetchEventSource } from "@microsoft/fetch-event-source";

interface GenerationState {
    isLoading: boolean;
    progress: number;
    statusMessage: string;
    generatedImageUrl: string | null;
    error: string | null;
}

export const useImageGeneration = () => {
    const [state, setState] = useState<GenerationState>({
        isLoading: false,
        progress: 0,
        statusMessage: "",
        generatedImageUrl: null,
        error: null,
    });

    const updateState = (updates: Partial<GenerationState>) => {
        setState((prev) => ({ ...prev, ...updates }));
    };

    const connectToStream = useCallback(async (taskId: string) => {
        const token = useAuthStore.getState().accessToken;

        await fetchEventSource(`/api/ai-images/stream/${taskId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            onmessage(event) {
                try {
                    const data = JSON.parse(event.data) as ImageGenerationEvent;

                    updateState({
                        progress: data.progress,
                        statusMessage: data.message,
                    });

                    if (data.status === "COMPLETED" && data.imageUrl) {
                        updateState({
                            isLoading: false,
                            generatedImageUrl: data.imageUrl,
                            statusMessage: "생성 완료",
                        });
                    }
                } catch (e) {
                    console.error("SSE 파싱 에러", e);
                }
            },
            onerror(err) {
                console.error("SSE 연결 에러", err);
                updateState({ isLoading: false, error: "이미지 생성 중 연결이 끊어졌습니다." });
                throw err;
            },
        });
    }, []);

    const generateImage = async (formData: PromptFormSchemaType) => {
        updateState({
            isLoading: true,
            progress: 0,
            statusMessage: "작업 등록 중...",
            generatedImageUrl: null,
            error: null,
        });

        try {
            const finalPrompt = formatPromptPayload(formData);

            const apiPayload = {
                ...defaultGenerateImageSchema,
                prompt: finalPrompt,
            };

            const response = await api.post("/ai/images/generate", apiPayload);
            const { taskId } = response.data;

            await connectToStream(taskId);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || error.message || "알 수 없는 오류 발생";

            updateState({
                isLoading: false,
                error: errorMessage,
                statusMessage: "오류 발생",
            });
        }
    };

    return {
        ...state,
        generateImage,
    };
};
