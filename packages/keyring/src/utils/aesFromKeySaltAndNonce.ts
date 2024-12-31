import { gcm } from "@noble/ciphers/aes";
import { scrypt } from "@noble/hashes/scrypt";

export function aesFromKeySaltAndNonce(key: string, salt: Uint8Array, nonce: Uint8Array) {
    const scryptKey = scrypt(key, salt, {
        N: 2 ** 16, // CPU/memory cost
        r: 8, // block size
        p: 1, // parallelization
        dkLen: 32, // 32 bytes (256 bits)
    });
    return gcm(scryptKey, nonce);
}
