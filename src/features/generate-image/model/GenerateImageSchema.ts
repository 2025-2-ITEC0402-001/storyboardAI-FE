export interface GenerateImageSchema {
    prompt: string;
    height?: number;
    width?: number;
    guidanceScale?: number;
    numInferenceSteps?: number;
    seed?: number;
}

export const defaultGenerateImageSchema: GenerateImageSchema = {
    prompt: "",
    height: 1536,
    width: 1024,
    guidanceScale: 3.5,
    numInferenceSteps: 20,
    seed: undefined,
};
