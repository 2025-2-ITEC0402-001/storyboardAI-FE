import CanvasSegmentation from "@/features/masking/components/CanvasSegmentation";

export const MainCanvasWidget = () => {
    return (
        <article className="flex-1 bg-foreground h-full flex items-center justify-center px-4">
            <div className="w-full max-w-4xl max-h-[80vh] flex flex-col items-center gap-4">
                <CanvasSegmentation src="/test.jpg" />
            </div>
        </article>
    );
};
