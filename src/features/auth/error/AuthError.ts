import { RuntimeError } from "@/shared/error/RuntimeError";

export class ReissueFailedError extends RuntimeError {
    constructor(message: string) {
        super(message);
        this.name = "ReissueFailedError";
    }
}
