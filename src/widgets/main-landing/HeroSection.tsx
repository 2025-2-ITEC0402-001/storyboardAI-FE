import { Link } from "react-router-dom";

import { Button } from "@/shared/ui/button";

import { ArrowRightIcon } from "./assets/ArrowRightIcon";
import { CubeIcon } from "./assets/CubeIcon";
import { PlayIcon } from "./assets/PlayIcon";

export function HeroSection() {
    return (
        <section className="relative flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                <CubeIcon className="size-5" />
                <span>AI 기반 스토리보드 제작</span>
            </div>

            <h1 className="mb-6 max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                AI로 스토리보드를
                <br />더 쉽고 빠르게
            </h1>

            <p className="mb-10 max-w-2xl text-lg text-zinc-400 md:text-xl">
                구조화된 프롬프트로 고품질 이미지를 생성하고, 인터랙션 기반 영상까지 제작하세요
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="p-8 px-20 text-base" asChild>
                    <Link to="/auth">
                        프로젝트 시작하기
                        <ArrowRightIcon className="ml-2 size-5" />
                    </Link>
                </Button>

                <Button size="lg" variant="outline" className="p-8 px-20 text-base">
                    <PlayIcon className="mr-2 size-5" />
                    데모 보기
                </Button>
            </div>
        </section>
    );
}
