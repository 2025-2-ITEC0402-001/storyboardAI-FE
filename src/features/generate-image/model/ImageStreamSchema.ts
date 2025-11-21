export interface ImageGenerationEvent {
    taskId: string;
    status: "UPLOADING" | "COMPLETED";
    message: string;
    progress: number;
    imageUrl?: string; // COMPLETED일 때만 옴
    timestamp: string;
}
