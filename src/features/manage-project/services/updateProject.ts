import type { ProjectSchema } from "@/entities/projects/model/ProjectSchema";

import { PROJECT_QUERY_KEYS } from "@/features/manage-project/services/_keys";

import { api } from "@/shared/lib/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpdateProjectRequest {
    title?: string;
    description?: string;
}

export type UpdateProjectResponse = ProjectSchema;

export async function updateProject(projectId: string, data: UpdateProjectRequest) {
    const response = await api.put<UpdateProjectResponse>(`/api/projects/${projectId}`, data);
    return response.data;
}

export const useUpdateProjectMutation = (projectId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateProjectRequest) => updateProject(projectId, data),

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
