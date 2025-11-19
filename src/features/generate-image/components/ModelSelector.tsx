export const ModelSelector = () => {
    return (
        <section>
            <label
                htmlFor="model-select"
                className="block mb-2 text-sm font-medium text-background"
            >
                모델 선택
            </label>
            <select
                id="model-select"
                className="w-full bg-[#0E0E11]/70 text-gray-200 p-2 rounded-md 
                           border border-gray-800 
                           focus:outline-none focus:border-blue-500 
                           transition-colors"
            >
                <option value="model-a">Flux-1</option>
                <option value="model-b">GPT-4</option>
                <option value="model-c">DALL·E 3</option>
            </select>
        </section>
    );
};
