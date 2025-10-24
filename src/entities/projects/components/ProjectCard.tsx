import { useNavigate } from "react-router-dom";

import { Clock4, FolderOpen } from "lucide-react";

export interface ProjectCardProps {
    id: string | number;
    title: string;
    time: string;
}

export const ProjectCard = ({ project }: { project: ProjectCardProps }) => {
    const navigate = useNavigate();

    return (
        <li
            key={project.id}
            className="bg-[#1C1C21] rounded-lg shadow-md overflow-hidden cursor-pointer border-[#2F2F37]/60 border-1"
            onClick={() => navigate(`/project/${project.id}`)}
        >
            <figure className="w-full h-48 bg-linear-to-r from-[#7C3AED]/20 to-[#581C87]/20 flex items-center justify-center">
                <FolderOpen color="#8B5CF6" className="w-12 h-12" />
            </figure>
            <figcaption className=" flex flex-col h-20">
                <div className="p-4 flex flex-col  h-full gap-1.5">
                    <span className="text-white">{project.title}</span>
                    <time className="flex items-center gap-1">
                        <Clock4 className="w-4 h-4 inline-block mr-1 text-gray-500" />
                        <span className="text-gray-500">{project.time}</span>
                    </time>
                </div>
            </figcaption>
        </li>
    );
};
