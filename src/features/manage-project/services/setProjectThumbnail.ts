import type { ProjectSchema } from "@/entities/projects/model/ProjectSchema";

import { PROJECT_QUERY_KEYS } from "@/features/manage-project/services/_keys";

import { api } from "@/shared/lib/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function setProjectThumbnail(projectId: string, imageUrl: string) {
    const thumbnailResponse = await fetch(imageUrl);
    const thumbnailImage = await thumbnailResponse.blob();

    const formData = new FormData();
    formData.append("thumbnail", thumbnailImage);

    const response = await api.put<ProjectSchema>(
        `/api/projects/${projectId}/thumbnail`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
    );
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
