export function numberToU32(number: number): Uint8Array {
    return new Uint8Array([(number >> 24) & 0xff, (number >> 16) & 0xff, (number >> 8) & 0xff, number & 0xff]);
}
