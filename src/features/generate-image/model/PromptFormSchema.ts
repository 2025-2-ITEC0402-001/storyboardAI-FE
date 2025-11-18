import { z } from "zod";

export const promptItemSchema = z.object({
    value: z.string().min(1, "내용을 입력해주세요.").max(500, "500자를 초과할 수 없습니다."),
});

export const promptFormSchema = z.object({
    model: z.string(),
    style: z.string(),
    prompts: z
        .array(promptItemSchema)
        .min(1, "최소 1개의 묘사가 필요합니다.")
        .max(3, "최대 3개까지만 추가할 수 있습니다."),
});

export type PromptFormSchemaType = z.infer<typeof promptFormSchema>;
