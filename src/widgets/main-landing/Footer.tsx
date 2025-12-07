import { LogoIcon } from "./assets/LogoIcon";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-zinc-800 bg-zinc-950 px-6 py-12">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="rounded-lg bg-primary p-2">
                                <LogoIcon className="size-6 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold text-white">STORYBOARD AI</span>
                        </div>
                        <p className="text-sm text-zinc-500">© {currentYear} Storyboard AI</p>
                    </div>

                    <nav aria-label="Footer navigation">
                        <h3 className="mb-4 font-semibold text-white">이용안내</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    개인정보처리방침
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <nav aria-label="Footer contact">
                        <h3 className="mb-4 font-semibold text-white">문의하기</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    문의하기
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
