import { type PromptFormSchemaType } from "../model/PromptFormSchema";

export const formatPromptPayload = (data: PromptFormSchemaType) => {
    const styleString = `[STYLE]: ${data.style}`;

    const scenesString = data.prompts
        .map((p, index) => `[SCENE-${index + 1}] ${p.value}`)
        .join(",\\n");

    return `${styleString}\\n${scenesString}`;
};
