export function parseJwtFromHash(hash: string) {
    return hash
        .substring(1)
        .split("&")
        .map((value) => value.split("="))
        .reduce(
            (tokenObj, [key, value]) => ({ ...tokenObj, [key]: value }),
            {} as Record<string, string>,
        );
}
