import { AppLogo } from "@/app/assets/AppLogo";

import { Button } from "@/shared/ui/button";

export function Header() {
    return (
        <header
            className="sticky top-0 z-50 w-full border-b border-zinc-800 backdrop-blur supports-backdrop-filter:bg-[#0E0E11]/60"
            style={{ backgroundColor: "rgba(14, 14, 17, 0.95)" }}
        >
            <nav
                className="flex h-16 items-center justify-between px-6"
                aria-label="Main navigation"
            >
                <div className="flex items-center gap-2">
                    <AppLogo />
                    <span className="text-xl text-white">STORYBOARD AI</span>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost">로그인</Button>
                    <Button>시작하기</Button>
                </div>
            </nav>
        </header>
    );
}
