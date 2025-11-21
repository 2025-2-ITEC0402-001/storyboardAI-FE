import { useNavigate } from "react-router-dom";

import { FolderOpen } from "lucide-react";

import type { ProjectSchema } from "@/entities/projects/model/ProjectSchema";

import { cn } from "@/shared/lib/utils";

export interface ProjectCardProps
    extends Pick<ProjectSchema, "id" | "title" | "description" | "thumbnail"> {
    className?: string;
}

export const ProjectCard = ({ id, title, description, thumbnail, className }: ProjectCardProps) => {
    const navigate = useNavigate();

    return (
        <li
            key={id}
            className={cn(
                "bg-[#1C1C21] rounded-lg shadow-md overflow-hidden cursor-pointer border-[#2F2F37]/60 border",
                className,
            )}
            onClick={() => navigate(`/project/${id}`)}
        >
            <figure className="w-full h-48 bg-linear-to-r from-[#7C3AED]/20 to-[#581C87]/20 flex items-center justify-center">
                {thumbnail ? (
                    <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <FolderOpen color="#8B5CF6" className="w-12 h-12" />
                )}
            </figure>
            <figcaption className=" flex flex-col h-20">
                <div className="p-4 flex flex-col  h-full gap-1.5">
                    <span className="text-white">{title}</span>
                    <span className="text-gray-500">{description}</span>
                </div>
            </figcaption>
        </li>
    );
};
