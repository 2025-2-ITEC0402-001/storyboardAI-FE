import type { ProjectSchema } from "@/entities/projects/model/ProjectSchema";

import { PROJECT_QUERY_KEYS } from "@/features/manage-project/services/_keys";

import { api } from "@/shared/lib/api";

import { useSuspenseQuery } from "@tanstack/react-query";

export type GetProjectListResponse = Array<ProjectSchema>;

export async function getProjectList() {
    const response = await api.get<GetProjectListResponse>("/api/projects");
    return response.data;
}

export const useGetProjectListQuery = () => {
    return useSuspenseQuery({
        queryKey: PROJECT_QUERY_KEYS.LIST(),
        queryFn: () => getProjectList(),
    });
};
