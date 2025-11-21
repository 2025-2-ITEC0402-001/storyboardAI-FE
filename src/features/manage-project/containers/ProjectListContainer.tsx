import { ProjectCard } from "@/entities/projects/components/ProjectCard";

import { useGetProjectListQuery } from "@/features/manage-project/services/getProjectList";

export const ProjectListContainer = () => {
    const { data: projects } = useGetProjectListQuery();
    return projects.map((project) => <ProjectCard key={project.id} {...project} />);
};
