export function normalize(output = "") {
    return output
        .replace(/\r\n/g, "\n")   // Windows → Unix newlines
        .replace(/[ \t]+/g, " ")  // collapse multiple spaces/tabs
        .replace(/\n+/g, "\n")    // collapse multiple newlines
        .trim()                   // remove leading/trailing whitespace
}
