import {
    generateImage,
    type GenerateImageRequest,
} from "@/features/generate-image/services/generateImage";
import {
    generateImageStream,
    type GenerateImageStreamResponse,
} from "@/features/generate-image/services/generateImageStream";
import { imageGenerationActions } from "@/features/generate-image/store/imageGenerationSlice";
// 💡 썸네일 업데이트 Mutation 함수 Import (useMutation이 아닌 함수 자체를 가져옵니다)
import { setProjectThumbnail } from "@/features/manage-project/services/setProjectThumbnail";

import { layoutActions } from "@/shared/store/layoutSlice";

import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk Action Payload에 projectId 추가
export interface GenerateImageThunkPayload extends GenerateImageRequest {
    projectId: string; // 현재 작업 중인 프로젝트 ID
}

export const generateImageThunk = createAsyncThunk<void, GenerateImageThunkPayload>( // 타입 수정
    "imageGeneration/generate",
    async ({ projectId, ...request }, { dispatch, rejectWithValue }) => {
        // projectId 인자 추가
        try {
            const { taskId } = await generateImage(request);
            let finalImageUrl: string | undefined = undefined; // 최종 이미지 URL 저장 변수

            for await (const streamEvent of generateImageStream(taskId)) {
                dispatch(imageGenerationActions.setEvent(streamEvent));

                // 완료 이벤트에서 URL을 추출
                if (streamEvent.status === "COMPLETED" && streamEvent.imageUrl) {
                    finalImageUrl = streamEvent.imageUrl;
                }
            }

            // 1. 이미지 생성이 완료되고 URL이 있으면 썸네일 업데이트 요청
            if (finalImageUrl) {
                // Base64 문자열만 보내야 하므로 finalImageUrl에서 데이터만 추출 필요
                // 실제 finalImageUrl이 data URL (Base64) 형태라고 가정하고 보냅니다.
                await setProjectThumbnail(projectId, finalImageUrl);

                // 💡 참고: setProjectThumbnail 내부에서 캐시 무효화(invalidate)가 일어나므로,
                // MainCanvasWidget에서 최신 썸네일을 자동 로딩합니다.
            }

            // 2. 모드 변경
            dispatch(layoutActions.changeMode({ mode: "edit" }));
        } catch (error) {
            console.error(error);
            return rejectWithValue("이미지 생성 중 오류가 발생했습니다.");
        }
    },
);
