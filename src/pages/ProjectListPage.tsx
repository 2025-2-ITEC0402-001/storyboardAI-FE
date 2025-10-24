import { ProjectListHeaderWidget } from "@/widgets/project-list/ProjectListHeaderWidget";
import { ProjectListWidget } from "@/widgets/project-list/ProjectListWidget";

export default function ProjectListPage() {
    return (
        <div className="w-full h-screen flex flex-col">
            <ProjectListHeaderWidget />
            <main>
                <section>
                    <h1>내 프로젝트</h1>
                    <p>스토리보드 프로젝트를 관리하고 편집하세요</p>
                </section>
                <ProjectListWidget />
            </main>
        </div>
    );
}
