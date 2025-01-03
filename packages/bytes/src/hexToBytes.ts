import { asciiToBase16 } from "./asciiToBase16";

export function hexToBytes(hex: string): Uint8Array {
    if (typeof hex !== "string") throw new Error(`hex string expected, got ${typeof hex}`);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2) throw new Error(`hex string expected, got unpadded hex of length ${hl}`);
    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error(`hex string expected, got non-hex character "${char}" at index ${hi}`);
        }
        array[ai] = n1 * 16 + n2; // multiply first octet, e.g. 'a3' => 10*16+3 => 160 + 3 => 163
    }
    return array;
}
