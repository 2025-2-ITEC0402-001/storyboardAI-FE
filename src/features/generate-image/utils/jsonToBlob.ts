export function jsonToBlob(json: unknown): Blob {
    const jsonString = JSON.stringify(json);
    return new Blob([jsonString], { type: "application/json" });
}
