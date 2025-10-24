import { Link } from "react-router-dom";

import { Settings, LogOut } from "lucide-react";

export const ProjectListHeaderWidget = () => {
    return (
        <header className="h-14 w-full bg-foreground flex items-center px-4 border-b-[0.5px] border-gray-600">
            <div className="flex gap-4 shrink-0 flex-1 items-center">
                <Link to="/" aria-label="홈으로" className="flex gap-2">
                    <div
                        className="w-6 h-6 rounded-xs"
                        style={{
                            width: "24px",
                            height: "24px",
                            background: "linear-gradient(to right, #8B5CF6, #D946EF)",
                        }}
                    />
                    <h1 className="text-gray-200">STORYBOARD AI</h1>
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <button>
                    <Settings color="#fff" strokeWidth={1} />
                </button>
                <button>
                    <LogOut color="#fff" strokeWidth={1} />
                </button>
            </div>
        </header>
    );
};
