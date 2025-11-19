import { useCallback, useMemo } from "react";

import type { BaseMiddleware } from "@/shared/middleware/BaseMiddleware";

export type UseMiddlewareOptions<P> = {
    initialPayload: P;
    middlewares: BaseMiddleware<P>[];
};

export const useMiddleware = <P>({ initialPayload, middlewares }: UseMiddlewareOptions<P>) => {
    const memoizedMiddlewares = useMemo(() => middlewares, [middlewares]);

    const execute = useCallback(
        async (payload: P = initialPayload): Promise<P> => {
            let result: P = payload;
            for (const middleware of memoizedMiddlewares) {
                result = await middleware.handle(result);
            }
            return result;
        },
        [initialPayload, memoizedMiddlewares],
    );

    return { execute };
};
