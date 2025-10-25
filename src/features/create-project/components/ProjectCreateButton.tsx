import { useNavigate } from "react-router-dom";

import { Plus } from "lucide-react";

export const ProjectCreateButton = () => {
    const navigate = useNavigate();

    return (
        <button
            className="flex flex-col flex-1 items-center justify-center cursor-pointer"
            onClick={() => navigate("/project/1")}
        >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#8E51FF]/20 mb-3">
                <Plus color="#8B5CF6" className="w-8 h-8" />
            </div>
            <span className="text-background text-4">새 프로젝트 만들기</span>
        </button>
    );
};
