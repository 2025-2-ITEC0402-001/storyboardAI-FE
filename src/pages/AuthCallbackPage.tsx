import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/authStore";
import { parseJwtFromHash } from "@/features/auth/utils/jwtParser";

import { Card } from "@/shared/components/Card";
import { Spinner } from "@/shared/components/Spinner";

export default function AuthCallbackPage() {
    const { hash } = useLocation();
    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);

    useEffect(() => {
        if (!hash) return;
        const { accessToken, refreshToken } = parseJwtFromHash(hash);

        login(accessToken, refreshToken);
        navigate("/project");

        toast.success("로그인에 성공했습니다!");
    }, [hash, login, navigate]);

    return (
        <main className="bg-[#0E0E11] w-full h-screen flex items-center justify-center">
            <Card className="p-4 flex flex-col items-center gap-2">
                <Spinner width="34px" height="34px" />
                <p className="text-white text-sm">로그인 중입니다</p>
            </Card>
        </main>
    );
}
