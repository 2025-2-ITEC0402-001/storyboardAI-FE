import type { ProjectSchema } from "@/entities/projects/model/ProjectSchema";

import { PROJECT_QUERY_KEYS } from "@/features/manage-project/services/_keys";

import { api } from "@/shared/lib/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export type CreateNewProjectRequest = Pick<ProjectSchema, "title" | "description">;
export type CreateNewProjectResponse = ProjectSchema;

export async function createNewProject(request: CreateNewProjectRequest) {
    const response = await api.post<CreateNewProjectResponse>("/api/projects", request);
    return response.data;
}

export const useCreateNewProjectMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: CreateNewProjectRequest) => createNewProject(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.LIST() });
        },
    });
};
