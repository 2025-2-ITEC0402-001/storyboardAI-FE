import { Fragment, useState } from "react";

import { Plus } from "lucide-react";

import { NewProjectModal } from "@/features/manage-project/components/NewProjectModal";

export const ProjectCreateButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Fragment>
            <button
                className="flex flex-col flex-1 items-center justify-center cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#8E51FF]/20 mb-3">
                    <Plus color="#8B5CF6" className="w-8 h-8" />
                </div>
                <span className="text-background text-4">새 프로젝트 만들기</span>
            </button>

            <NewProjectModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </Fragment>
    );
};
