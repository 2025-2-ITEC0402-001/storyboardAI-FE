import { Video } from "lucide-react";

import { Card } from "@/shared/components/Card";
import { ModalBackdrop } from "@/shared/components/ModalBackdrop";
import { GlobalPortal } from "@/shared/components/Portal";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";

export interface NewProjectModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VideoGenerationModal = ({ isOpen, setIsOpen }: NewProjectModalProps) => {
    return (
        isOpen && (
            <GlobalPortal.Consumer>
                <ModalBackdrop>
                    <Card className="p-6 w-[800px]">
                        <header className="text-white flex items-center gap-4">
                            <div className="bg-[#8E51FF]/50 rounded-md items-center justify-center flex p-2 w-12 h-12">
                                <Video color="#8B5CF6" />
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-xl font-semibold">i2v 영상 생성</h2>
                                <p className="text-gray-400">
                                    이미지에서 인터랙션 기반 영상을 생성합니다
                                </p>
                            </div>
                        </header>

                        <section className="mt-4">
                            <article className="text-white">
                                <Label className="my-2">생성된 영상</Label>

                                <video
                                    className="w-full h-auto rounded-md bg-black"
                                    controls
                                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                                >
                                    video 태그를 지원하지 않는 브라우저입니다
                                </video>
                            </article>
                        </section>

                        <footer className="flex gap-2 mt-4">
                            <Button variant="outline" onClick={() => setIsOpen(false)}>
                                닫기
                            </Button>
                            <Button>영상 다운로드</Button>
                        </footer>
                    </Card>
                </ModalBackdrop>
            </GlobalPortal.Consumer>
        )
    );
};
