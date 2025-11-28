export const PROJECT_QUERY_KEYS = {
    LIST: () => ["projects", "list"],
    DETAIL: (id: string) => ["projects", "detail", id],
} as const;
