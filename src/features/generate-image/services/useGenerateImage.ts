import { useState } from "react";
import { flushSync } from "react-dom";

import {
    generateImage,
    type GenerateImageRequest,
} from "@/features/generate-image/services/generateImage";
import {
    generateImageStream,
    type GenerateImageStreamResponse,
} from "@/features/generate-image/services/generateImageStream";

export const useGenerateImage = () => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [event, setEvent] = useState<GenerateImageStreamResponse | null>(null);
    const [error, setError] = useState<Error | unknown>(null);

    const generate = async (request: GenerateImageRequest) => {
        setIsPending(true);

        try {
            const { taskId } = await generateImage(request);
            for await (const streamEvent of generateImageStream(taskId)) {
                flushSync(() => {
                    setEvent(streamEvent);
                });
            }
        } catch (e) {
            setError(e);
        } finally {
            setIsPending(false);
        }
    };

    return {
        isPending,
        event,
        error,
        generate,
    };
};
