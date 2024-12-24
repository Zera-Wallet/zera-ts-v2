
export function binaryToBytes(binaryString: string): Uint8Array {
    const byteLength = Math.ceil(binaryString.length / 8);
    const bytes = new Uint8Array(byteLength);
    for (let i = 0; i < binaryString.length; i += 8) {
        const byteString = binaryString.slice(i, i + 8).padEnd(8, "0");
        const byte = parseInt(byteString, 2);
        bytes[i / 8] = byte;
    }
    return bytes;
}
