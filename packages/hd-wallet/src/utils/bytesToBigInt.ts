import { abytes } from "@noble/hashes/_assert";
import { bytesToHex } from "@noble/hashes/utils";

export function bytesToBigInt(bytes: Uint8Array): bigint {
    abytes(bytes);
    const h = bytes.length === 0 ? "0" : bytesToHex(bytes);
    return BigInt(`0x${h}`);
}
