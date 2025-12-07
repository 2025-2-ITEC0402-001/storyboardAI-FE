import { Button } from "@/shared/ui/button";

import { ArrowRightIcon } from "./assets/ArrowRightIcon";

export function CTASection() {
    return (
        <section className="px-6 py-20">
            <div className="mx-auto max-w-4xl">
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-primary to-primary/80 p-12 text-center shadow-2xl">
                    <div className="absolute -right-20 -top-20 size-60 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 size-60 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative">
                        <h2 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">
                            지금 바로 시작하세요
                        </h2>
                        <p className="mb-8 text-lg text-primary-foreground/90">
                            AI 스토리보드로 창작의 한계를 넘어보세요
                        </p>

                        <Button
                            size="lg"
                            variant="outline"
                            className="border-primary-foreground/20 bg-white/10 text-primary-foreground backdrop-blur-sm hover:bg-white/20 text-base"
                        >
                            무료로 시작하기
                            <ArrowRightIcon className="ml-2 size-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
