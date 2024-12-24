import { randomBytes as nobleRandomBytes } from "@noble/hashes/utils";

export function randomBytes(size: number): Uint8Array {
    return nobleRandomBytes(size);
}
