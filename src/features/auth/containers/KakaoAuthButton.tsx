import { KakaoLogo } from "@/shared/assets/KakaoLogo";
import { API_BASE_URL } from "@/shared/lib/api";
import { cn } from "@/shared/lib/utils";

// TODO: 배포 시 redirectUrl 환경변수에 따라 변경
export const KAKAO_OAUTH_URL =
    API_BASE_URL +
    "/api/auth/oauth/kakao/login?state=phone&redirectUrl=" +
    "http://localhost:5173/auth/callback";

export interface KakaoAuthButtonProps extends React.ComponentProps<"a"> {
    width?: React.CSSProperties["width"];
    height?: React.CSSProperties["height"];
}

export const KakaoAuthButton = ({ ...props }: KakaoAuthButtonProps) => {
    return (
        <a
            {...props}
            href={KAKAO_OAUTH_URL}
            className={cn(
                "bg-[#FEE500] flex items-center justify-center p-3 gap-2 rounded-sm",
                props.className,
            )}
            style={{ width: props.width, height: props.height }}
        >
            <KakaoLogo className="w-6 h-6" />
            <p>카카오 로그인</p>
        </a>
    );
};
