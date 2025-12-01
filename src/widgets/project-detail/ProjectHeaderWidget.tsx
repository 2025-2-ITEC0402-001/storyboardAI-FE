import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Save } from "lucide-react";

import { AppLogo } from "@/app/assets/AppLogo";

import { useGetProjectDetailQuery } from "@/features/manage-project/services/getProjectDetail";
import { useUpdateProjectMutation } from "@/features/manage-project/services/updateProject";

import { Input } from "@/shared/ui/input";

export const ProjectHeaderWidget = () => {
    const { id: projectId } = useParams<{ id: string }>();

    const { data: project } = useGetProjectDetailQuery(projectId!);

    const { mutate: updateTitle } = useUpdateProjectMutation(projectId!);

    const [title, setTitle] = useState(project.title);

    const handleTitleBlur = () => {
        if (title !== project.title) {
            updateTitle({ title });
        }
    };

    useEffect(() => {
        setTitle(project.title);
    }, [project.title]);

    return (
        <header className="h-14 w-full bg-foreground flex items-center px-4 border-b-[0.5px] border-gray-600">
            <div className="flex gap-4 shrink-0 flex-1 items-center">
                <Link to="/" aria-label="홈으로" className="flex gap-2">
                    <AppLogo />
                    <h1 className="text-gray-200">STORYBOARD AI</h1>
                </Link>

                <Input
                    type="text"
                    placeholder="프로젝트 명"
                    value={title}
                    className="max-w-[400px] text-gray-200"
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                />
            </div>

            <div>
                <button className="inline-flex items-center gap-2">
                    <Save color="#fff" strokeWidth={1} />
                    <span className="text-background">저장</span>
                </button>
            </div>
        </header>
    );
};
