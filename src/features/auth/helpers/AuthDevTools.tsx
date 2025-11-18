import { Code2 } from "lucide-react";

import { GlobalPortal } from "@/shared/components/Portal";
import { Button } from "@/shared/ui/button";

export const AuthDevTools = () => {
    return (
        <GlobalPortal.Consumer>
            <Button className="absolute bottom-2 left-2 rounded-full flex p-2 px-4 gap-2">
                <Code2 />
                <p>테스트 로그인</p>
            </Button>
        </GlobalPortal.Consumer>
    );
};
