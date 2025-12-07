import { CubeIcon } from "./assets/CubeIcon";
import { GridIcon } from "./assets/GridIcon";
import { VideoIcon } from "./assets/VideoIcon";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <article className="group rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50">
            <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110">
                {icon}
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
            <p className="text-zinc-400">{description}</p>
        </article>
    );
}

export function FeaturesSection() {
    const features = [
        {
            icon: <GridIcon className="size-6" />,
            title: "고품질 이미지 생성",
            description: "파동, 색감, 조명 구도를 제어하여 완성도 높은 이미지를 만들어내세요",
        },
        {
            icon: <CubeIcon className="size-6" />,
            title: "마스킹 기반 편집",
            description: "원하는 영역을 선택하여 프롬프트와 함께 수정할 관련 영역만 편집 가능해요",
        },
        {
            icon: <VideoIcon className="size-6" />,
            title: "인터랙션 영상 생성",
            description:
                "12가지로 이미지의 인터랙션 기반 영상을 생성할 수 있어요 스토리보드를 완성하세요",
        },
    ];

    return (
        <section className="px-6 py-20">
            <div className="mx-auto max-w-7xl">
                <header className="mb-12 text-center">
                    <h2 className="mb-4 text-4xl font-bold text-white">강력한 AI 기능</h2>
                </header>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}
