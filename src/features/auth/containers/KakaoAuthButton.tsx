import { KakaoLogo } from "@/shared/assets/KakaoLogo";
import { DEVICE_TYPE } from "@/shared/constants/deviceType";
import { API_BASE_URL } from "@/shared/lib/api";
import { cn } from "@/shared/lib/utils";

// TODO: 배포주소 반영필요
const KAKAO_OAUTH_URL = new URL("/api/auth/oauth/kakao/login", API_BASE_URL);
KAKAO_OAUTH_URL.searchParams.append("redirectUrl", "http://localhost:5173/auth/callback");
KAKAO_OAUTH_URL.searchParams.append("deviceType", DEVICE_TYPE.COMPUTER);

export interface KakaoAuthButtonProps extends React.ComponentProps<"a"> {
    width?: React.CSSProperties["width"];
    height?: React.CSSProperties["height"];
}

export const KakaoAuthButton = ({ ...props }: KakaoAuthButtonProps) => {
    return (
        <a
            {...props}
            href={KAKAO_OAUTH_URL.toString()}
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
