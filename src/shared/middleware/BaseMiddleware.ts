export interface BaseMiddleware<P> {
    handle(payload: P): Promise<P>;
}

export type Middlewares = Array<{
    name: string;
    middleware: BaseMiddleware<unknown>;
}>;
