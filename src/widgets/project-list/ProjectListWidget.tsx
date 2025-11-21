import { ProjectCard } from "@/entities/projects/components/ProjectCard";

import { ProjectCreateButton } from "@/features/manage-project/components/ProjectCreateButton";

const projects = [
    { id: 1, title: "Project Tiger", time: "2025-10-01" },
    { id: 2, title: "Project Toothless", time: "2025-10-05" },
    { id: 3, title: "Project Night Fury", time: "2025-10-10" },
];

export const ProjectListWidget = () => {
    return (
        <article>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <li className="flex items-center justify-center border-2 border-[#2F2F37]/60 rounded-lg hover:border-gray-500 cursor-pointer h-48 bg-[#1C1C21]">
                    <ProjectCreateButton />
                </li>

                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </ul>
        </article>
    );
};
