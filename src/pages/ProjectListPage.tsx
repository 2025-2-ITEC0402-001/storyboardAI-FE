import { ProjectListHeaderWidget } from "@/widgets/project-list/ProjectListHeaderWidget";
import { ProjectListWidget } from "@/widgets/project-list/ProjectListWidget";

export default function ProjectListPage() {
    return (
        <div className="w-full h-screen flex flex-col">
            <ProjectListHeaderWidget />
            <main className="flex-1 px-6 bg-foreground">
                <section className="mt-10 mb-8 gap-2 flex flex-col">
                    <h1 className="text-background text-3xl font-bold">내 프로젝트</h1>
                    <p className="text-gray-400">스토리보드 프로젝트를 관리하고 편집하세요</p>
                </section>
                <ProjectListWidget />
            </main>
        </div>
    );
}
