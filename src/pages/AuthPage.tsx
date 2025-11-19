import { Fragment } from "react/jsx-runtime";

import { AppLogoWithText } from "@/app/assets/AppLogoWithText";

import { KakaoAuthButton } from "@/features/auth/containers/KakaoAuthButton";
import { AuthDevTools } from "@/features/auth/helpers/AuthDevTools";

import { Card } from "@/shared/components/Card";
import { Chip } from "@/shared/components/Chip";
import { Divider } from "@/shared/components/Divider";
import { FullScreen } from "@/shared/components/FullScreen";
import { PrevButton } from "@/shared/components/PrevButton";

export default function AuthPage() {
    return (
        <Fragment>
            <FullScreen className="flex flex-col p-4">
                <header className="w-full max-w-[410px] mx-auto mb-2">
                    <PrevButton className="hover:cursor-pointer" />
                </header>

                <Card className="p-6 w-full max-w-[410px]">
                    <AppLogoWithText />

                    <section className="py-4">
                        <h2 className="text-2xl font-semibold text-white">환영합니다!</h2>
                        <h3 className="text-base text-[#AFAFB6]">
                            AI 스토리보드로 창작의 한계를 넘어보세요
                        </h3>
                    </section>

                    <section>
                        <Chip className="animate-vertical-shake">🚀 5초 안에 회원가입</Chip>
                        <KakaoAuthButton height="44px" className="mx-auto w-full" />
                        <Divider>간편 로그인</Divider>
                    </section>

                    <footer className="text-xs text-center text-[#AFAFB6] pt-4">
                        로그인 시 이용약관 및 개인정보처리방침에 동의하게 됩니다
                    </footer>
                </Card>
            </FullScreen>

            <AuthDevTools />
        </Fragment>
    );
}
