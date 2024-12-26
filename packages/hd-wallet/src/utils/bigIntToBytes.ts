import { hexToBytes } from "@noble/hashes/utils";

export function bigIntToBytes(num: bigint): Uint8Array {
    if (typeof num !== "bigint") throw new Error("bigint expected");
    return hexToBytes(num.toString(16).padStart(64, "0"));
}
