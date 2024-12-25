export function normalize(str?: string | null) {
    return (str || "").normalize("NFKD");
}
