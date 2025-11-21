import { Suspense } from "react";

import { ProjectCreateButton } from "@/features/manage-project/components/ProjectCreateButton";
import { ProjectListContainer } from "@/features/manage-project/containers/ProjectListContainer";

import { ProjectListHeaderWidget } from "@/widgets/project-list/ProjectListHeaderWidget";

export default function ProjectListPage() {
    return (
        <div className="w-full h-screen flex flex-col">
            <ProjectListHeaderWidget />

            <main className="flex-1 px-6 bg-foreground">
                <section className="mt-10 mb-8 gap-2 flex flex-col">
                    <h1 className="text-background text-3xl font-bold">내 프로젝트</h1>
                    <p className="text-gray-400">스토리보드 프로젝트를 관리하고 편집하세요</p>
                </section>

                <article>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <li className="flex items-center justify-center border-2 border-[#2F2F37]/60 rounded-lg hover:border-gray-500 cursor-pointer h-48 bg-[#1C1C21]">
                            <ProjectCreateButton />
                        </li>

                        <Suspense>
                            <ProjectListContainer />
                        </Suspense>
                    </ul>
                </article>
            </main>
        </div>
    );
}
