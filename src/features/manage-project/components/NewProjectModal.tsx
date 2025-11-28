import { useForm } from "react-hook-form";

import { File } from "lucide-react";

import { useCreateNewProjectMutation } from "@/features/manage-project/services/createNewProject";

import { Card } from "@/shared/components/Card";
import { ModalBackdrop } from "@/shared/components/ModalBackdrop";
import { GlobalPortal } from "@/shared/components/Portal";
import { Spinner } from "@/shared/components/Spinner";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

import { NewProjectSchema, type NewProjectSchemaType } from "../models/NewProjectSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export interface NewProjectModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewProjectModal = ({ isOpen, setIsOpen }: NewProjectModalProps) => {
    const { isPending, mutate: createNewProject } = useCreateNewProjectMutation();

    const { register, handleSubmit } = useForm<NewProjectSchemaType>({
        resolver: zodResolver(NewProjectSchema),
    });

    const onSubmit = (data: NewProjectSchemaType) => {
        createNewProject(
            { ...data, description: data.description ?? "" },
            {
                onSuccess: () => setIsOpen(false),
            },
        );
    };

    return (
        isOpen && (
            <GlobalPortal.Consumer>
                <ModalBackdrop>
                    <Card className="p-6 w-[500px]">
                        <header className="text-white flex items-center gap-4">
                            <div className="bg-[#8E51FF]/50 rounded-md items-center justify-center flex p-2 w-12 h-12">
                                <File color="#8B5CF6" />
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-xl font-semibold">새 프로젝트 생성하기</h2>
                                <p className="text-gray-400">
                                    새로운 스토리보드 프로젝트를 생성합니다.
                                </p>
                            </div>
                        </header>

                        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="text-white">
                                <Label className="my-2">제목</Label>
                                <Input
                                    type="text"
                                    placeholder="제목을 입력해주세요"
                                    {...register("title")}
                                />

                                <Label className="my-2">설명</Label>
                                <Textarea
                                    className="h-24"
                                    placeholder="프로젝트 설명을 입력해주세요"
                                    rows={4}
                                    {...register("description")}
                                />
                            </fieldset>

                            <fieldset className="flex gap-2 mt-4">
                                <Button
                                    type="button"
                                    className="flex-1"
                                    variant="outline"
                                    onClick={() => setIsOpen(false)}
                                >
                                    닫기
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-4"
                                    variant="default"
                                    disabled={isPending}
                                >
                                    {isPending ? <Spinner width={8} height={8} /> : "생성하기"}
                                </Button>
                            </fieldset>
                        </form>
                    </Card>
                </ModalBackdrop>
            </GlobalPortal.Consumer>
        )
    );
};
