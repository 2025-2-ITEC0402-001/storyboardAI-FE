import type { ProjectSchema } from "@/entities/projects/model/ProjectSchema";

import { PROJECT_QUERY_KEYS } from "@/features/manage-project/services/_keys";

import { api } from "@/shared/lib/api";

import { useSuspenseQuery } from "@tanstack/react-query";

export type GetProjectDetailResponse = ProjectSchema;

export async function getProjectDetail(projectId: string) {
    const response = await api.get<GetProjectDetailResponse>(`/api/projects/${projectId}`);
    return response.data;
}

export const useGetProjectDetailQuery = (projectId: string) => {
    return useSuspenseQuery({
        queryKey: PROJECT_QUERY_KEYS.DETAIL(projectId),
        queryFn: () => getProjectDetail(projectId),
    });
};
