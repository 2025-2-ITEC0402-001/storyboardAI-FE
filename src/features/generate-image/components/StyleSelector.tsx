export const StyleSelector = () => {
    return (
        <section className="pt-4">
            <label
                htmlFor="style-select"
                className="block mb-2 text-sm font-medium text-background"
            >
                화풍 선택
            </label>
            <select
                id="style-select"
                className="w-full bg-[#0E0E11]/70 text-gray-200 p-2 rounded-md 
                           border border-gray-800 
                           focus:outline-none focus:border-blue-500 
                           transition-colors"
            >
                <option value="realistic">리얼리스틱</option>
                <option value="cartoon">카툰</option>
                <option value="abstract">추상화</option>
                <option value="pixel_art">픽셀 아트</option>
            </select>
        </section>
    );
};
