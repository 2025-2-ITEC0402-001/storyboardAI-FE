export const PromptInput = () => {
    return (
        <section className="pl-4 pr-4 pt-3 ">
            <label
                htmlFor="prompt-input"
                className="block mb-2 text-sm font-medium text-background"
            >
                결과물 묘사
            </label>
            <textarea
                id="prompt-input"
                rows={4}
                className="w-full bg-[#0E0E11]/70 text-sm text-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="결과물에 대해 설명해 주세요."
            ></textarea>
        </section>
    );
};
