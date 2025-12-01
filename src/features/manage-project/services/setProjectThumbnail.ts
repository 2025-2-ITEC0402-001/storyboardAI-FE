import type { ProjectSchema } from "@/entities/projects/model/ProjectSchema";

import { PROJECT_QUERY_KEYS } from "@/features/manage-project/services/_keys";

import { api } from "@/shared/lib/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function setProjectThumbnail(projectId: string, thumbnailBase64: string) {
    const response = await api.put<ProjectSchema>(`/api/projects/${projectId}/thumbnail`, {
        thumbnail: thumbnailBase64,
    });
    return response.data;
}

export const useSetProjectThumbnailMutation = (projectId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (thumbnailBase64: string) => setProjectThumbnail(projectId, thumbnailBase64),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: PROJECT_QUERY_KEYS.DETAIL(projectId),
            });

            queryClient.invalidateQueries({
                queryKey: PROJECT_QUERY_KEYS.LIST(),
            });
        },
    });
};
