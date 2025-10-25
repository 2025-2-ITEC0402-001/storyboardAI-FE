export const MainCanvasWidget = () => {
    return (
        <article className="flex-1 bg-foreground h-full flex items-center justify-center px-4">
            <canvas className="bg-[#2A2A2E] w-full aspect-video max-w-4xl max-h-[80vh]" />
        </article>
    );
};
