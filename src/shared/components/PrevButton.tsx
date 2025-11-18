import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import { cn } from "@/shared/lib/utils";

export type PrevButtonProps = React.ComponentProps<"button">;

export const PrevButton = ({ className, ...props }: PrevButtonProps) => {
    const navigate = useNavigate();

    return (
        <button
            className={cn("text-[#AFAFB6] flex items-center p-2", className)}
            onClick={() => navigate(-1)}
            {...props}
        >
            <ArrowLeft size={16} />
            <span className="text-sm">뒤로가기</span>
        </button>
    );
};
