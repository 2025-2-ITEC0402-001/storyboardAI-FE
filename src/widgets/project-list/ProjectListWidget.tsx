import { Plus, Clock4 } from "lucide-react";

const projects = [
    { id: 1, title: "Project Tiger", time: "2025-10-01" },
    { id: 2, title: "Project Toothless", time: "2025-10-05" },
    { id: 3, title: "Project Night Fury", time: "2025-10-10" },
];

export const ProjectListWidget = () => {
    return (
        <article>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <li className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 cursor-pointer">
                    <button className="flex flex-col items-center justify-center p-4">
                        <Plus className="w-8 h-8 mb-2 text-gray-500" />
                        <span className="text-gray-500">New Project</span>
                    </button>
                </li>
                {projects.map((project) => (
                    <li key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <figure className="w-full h-48 bg-gray-200 flex items-center justify-center"></figure>
                        <figcaption className="text-center mt-2 text-lg font-semibold">
                            {project.title}
                        </figcaption>
                        <time>
                            <Clock4 className="w-4 h-4 inline-block mr-1 text-gray-500" />
                            {project.time}
                        </time>
                    </li>
                ))}
            </ul>
        </article>
    );
};
