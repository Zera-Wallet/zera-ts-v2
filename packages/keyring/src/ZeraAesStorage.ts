import { bytesToHex, bytesToUtf8, utf8ToBytes } from "@noble/ciphers/utils";

import { Cipher } from "@noble/ciphers/utils";
import { hexToBytes } from "@noble/hashes/utils";
import { randomBytes } from "@zera-ts/bytes";
import { ZeraEncryptedKVStorage } from "@zera-ts/storage";
import { aesFromKeySaltAndNonce } from "./utils/aesFromKeySaltAndNonce";

export class ZeraAesStorage extends ZeraEncryptedKVStorage {
    set(encryptionKey: string, key: string, value: string): void {
        const salt = randomBytes(32);
        const nonce = randomBytes(24);

        const aes = aesFromKeySaltAndNonce(encryptionKey, salt, nonce);
        const encrypted = aes.encrypt(utf8ToBytes(value));
        this.kvStorage.set(
            key,
            JSON.stringify({
                salt: bytesToHex(salt),
                nonce: bytesToHex(nonce),
                encrypted: bytesToHex(encrypted),
            }),
        );
    }

    getDecrypted(decryptionKey: string, key: string): string | null {
        const val = this.kvStorage.get(key);
        if (!val) {
            console.error(`${key} not found`);
            return null;
        }

        let jsonParsed: {
            salt: string;
            nonce: string;
            encrypted: string;
        };
        try {
            jsonParsed = JSON.parse(val);
        } catch (error) {
            console.error(`Failed to parse ${key}`, error);
            return null;
        }
        const { salt, nonce, encrypted } = jsonParsed;
        let aes: Cipher;
        try {
            aes = aesFromKeySaltAndNonce(decryptionKey, hexToBytes(salt), hexToBytes(nonce));
        } catch (error) {
            console.error("Failed to create aes", error);
            return null;
        }
        let decrypted: Uint8Array;
        try {
            decrypted = aes.decrypt(hexToBytes(encrypted));
        } catch (error) {
            console.error(`Failed to decrypt ${key}`, error);
            return null;
        }
        return bytesToUtf8(decrypted);
    }
}
