import * as ort from "onnxruntime-web";

export class OnnxSessionManager {
    private readonly providers: readonly string[];

    constructor(providers: readonly string[]) {
        this.providers = providers;
    }

    public async createSession(url: string) {
        for (const executionProvider of this.providers) {
            try {
                const session = await ort.InferenceSession.create(url, {
                    executionProviders: [executionProvider],
                });
                console.log(`${executionProvider} - 세션 생성 성공`);
                return session;
            } catch (error) {
                console.error(`${executionProvider} 로드 실패:`, error);
            }
        }
        throw new Error("사용가능한 Onnx Execution Provider가 없습니다.");
    }
}
