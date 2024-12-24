export function bytesToBinary(byteArray: Uint8Array): string {
    return byteArray.reduce((binary, byte) => binary + byte.toString(2).padStart(8, "0"), "");
}
