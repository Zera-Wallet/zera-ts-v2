import { pbkdf2 } from "@noble/hashes/pbkdf2";
import { sha512 } from "@noble/hashes/sha512";
import ZeraWordlist, { ZeraLanguage } from "@zera-ts/wordlists";

import { binaryToBytes, bytesToBinary, randomBytes } from "@zera-ts/bytes";
import { normalize } from "./utils";

/**
 * The strength of a ZeraMnemonic phrase.
 */
export type ZeraMnemonicStrength = 128 | 160 | 192 | 224 | 256;

/**
 * A class representing a BIP39 mnemonic for generating cryptographic seeds.
 */
export class ZeraMnemonic {
    private readonly mnemonic: string[];
    private readonly language?: ZeraLanguage;

    private constructor(mnemonic: string[], language: ZeraLanguage = "en") {
        this.mnemonic = mnemonic;
        this.language = language;
    }

    /**
     * Returns the mnemonic phrase as a string.
     * @param separator Optional separator to use when joining mnemonic words. Default is a single space.
     * @returns The mnemonic phrase as a string.
     */
    public toString(separator = " "): string {
        return this.mnemonic.join(separator);
    }

    /**
     * Returns the mnemonic words as an array of strings.
     * @returns An array containing the mnemonic words.
     */
    public get words(): string[] {
        return this.mnemonic;
    }

    /**
     * Creates a ZeraMnemonic instance from a given mnemonic phrase and an optional language.
     * @param words The words that make up the mnemonic phrase.
     * @param language The language of the mnemonic phrase. Default is English (en).
     * @returns A Promise that resolves to a ZeraMnemonic instance.
     * @throws Will throw an error if the mnemonic phrase is invalid.
     */
    public static async fromWords(words: string[], language: ZeraLanguage = "en"): Promise<ZeraMnemonic> {
        const instance = new ZeraMnemonic(words, language);
        if (!(await instance.isValid())) {
            throw new Error("Invalid mnemonic phrase.");
        }
        return instance;
    }

    /**
     * Creates a ZeraMnemonic instance from the given entropy using the specified language.
     *
     * @param entropy The entropy as a Uint8Array.
     * @param language The language to use for generating the mnemonic. Default is English (en).
     * @returns A Promise that resolves with the ZeraMnemonic instance.
     */
    public static fromEntropy(entropy: Uint8Array, language?: ZeraLanguage): Promise<ZeraMnemonic>;

    /**
     * Creates a ZeraMnemonic instance from the given entropy using the specified ZeraWordlist.
     *
     * @param entropy The entropy as a Uint8Array.
     * @param wordlist The ZeraWordlist to use for generating the mnemonic.
     * @returns The ZeraMnemonic instance.
     */
    public static fromEntropy(entropy: Uint8Array, wordlist: ZeraWordlist): ZeraMnemonic;

    /**
     * Creates a ZeraMnemonic instance from the given entropy using the specified language or wordlist.
     * If a ZeraLanguage is provided, returns a Promise that resolves with the ZeraMnemonic instance.
     * If a ZeraWordlist is provided, returns the ZeraMnemonic instance directly.
     *
     * @param entropy The entropy as a Uint8Array.
     * @param languageOrWordlist The ZeraLanguage or ZeraWordlist to use for generating the mnemonic. Default is English (en).
     * @returns A Promise that resolves with the ZeraMnemonic instance if a ZeraLanguage is provided,
     * or the ZeraMnemonic instance directly if a ZeraWordlist is provided.
     */
    public static fromEntropy(
        entropy: Uint8Array,
        languageOrWordlist: ZeraLanguage | ZeraWordlist = "en",
    ): Promise<ZeraMnemonic> | ZeraMnemonic {
        const generateMnemonic = (entropy: Uint8Array, wordlist: ZeraWordlist): ZeraMnemonic => {
            const words = wordlist.words;
            const entropyBits = bytesToBinary(entropy);
            const fullChecksum = sha512(entropy);
            const fullChecksumBits = bytesToBinary(fullChecksum);
            const checksumBits = fullChecksumBits.slice(0, (entropy.length * 8) / 32);
            const concatenatedBits = entropyBits + checksumBits;

            const bitGroups = concatenatedBits.match(/(.{1,11})/g) || [];

            const mnemonic = bitGroups.map((bits) => {
                const index = Number.parseInt(bits, 2);
                return words[index];
            });
            return new ZeraMnemonic(mnemonic, wordlist.language);
        };

        return languageOrWordlist instanceof ZeraWordlist
            ? generateMnemonic(entropy, languageOrWordlist)
            : ZeraWordlist.get(languageOrWordlist).then((wordlist) => {
                  return generateMnemonic(entropy, wordlist);
              });
    }

    /**
     * Generates a ZeraMnemonic instance with the specified strength and an optional language.
     * @param strength The strength of the mnemonic phrase.
     *                 Must be one of 128, 160, 192, 224, or 256.
     * @param language The language of the mnemonic phrase. Default is English (en).
     * @returns A Promise that resolves to a ZeraMnemonic instance.
     * @throws Will throw an error if the strength value is invalid.
     */
    public static generate(strength: ZeraMnemonicStrength, language?: ZeraLanguage): Promise<ZeraMnemonic>;

    /**
     * Generates a ZeraMnemonic instance with the specified strength and a given wordlist.
     * @param strength The strength of the mnemonic phrase.
     *                 Must be one of 128, 160, 192, 224, or 256.
     * @param wordlist A ZeraWordlist instance to use for generating the mnemonic.
     * @returns A ZeraMnemonic instance.
     * @throws Will throw an error if the strength value is invalid.
     */
    public static generate(strength: ZeraMnemonicStrength, wordlist: ZeraWordlist): ZeraMnemonic;

    /**
     * Generates a ZeraMnemonic instance with the specified strength and language or wordlist.
     * @param strength The strength of the mnemonic phrase.
     *                 Must be one of 128, 160, 192, 224, or 256.
     * @param languageOrWordlist The language of the mnemonic phrase or a ZeraWordlist instance. Default is English (en).
     * @returns A Promise that resolves to a ZeraMnemonic instance or a ZeraMnemonic instance depending on the input type.
     * @throws Will throw an error if the strength value is invalid.
     */
    public static generate(
        strength: ZeraMnemonicStrength,
        languageOrWordlist: ZeraLanguage | ZeraWordlist = "en",
    ): Promise<ZeraMnemonic> | ZeraMnemonic {
        if (strength % 32 !== 0 || strength < 128 || strength > 256) {
            throw new Error("Invalid strength value. It must be one of 128, 160, 192, 224, or 256.");
        }
        const byteLength = strength / 8;
        const entropy = randomBytes(byteLength);
        return languageOrWordlist instanceof ZeraWordlist
            ? ZeraMnemonic.fromEntropy(entropy, languageOrWordlist)
            : ZeraMnemonic.fromEntropy(entropy, languageOrWordlist);
    }

    /**
     * Converts the mnemonic words back to entropy.
     * @returns A Promise that resolves to a Uint8Array containing the entropy.
     * @throws Will throw an error if the mnemonic phrase is invalid.
     */
    public async toEntropy(): Promise<Uint8Array> {
        const wordlist = await ZeraWordlist.get(this.language);
        const words = wordlist.words;
        const wordToIndexMap = new Map<string, number>(words.map((word, index) => [word, index]));
        const wordIndexes = this.mnemonic.map((word) => {
            const index = wordToIndexMap.get(word);
            if (index === undefined) {
                throw new Error("Invalid word in mnemonic.");
            }
            return index;
        });
        const bitGroups = wordIndexes.map((index) => index.toString(2).padStart(11, "0"));
        const concatenatedBits = bitGroups.join("");
        const entropyBits = concatenatedBits.slice(0, -((concatenatedBits.length / 33) | 0));
        const entropy = binaryToBytes(entropyBits);

        const fullChecksum = sha512(entropy);
        const fullChecksumBits = bytesToBinary(fullChecksum);
        const checksumBits = fullChecksumBits.slice(0, (entropy.length * 8) / 32);

        if (concatenatedBits.slice(-checksumBits.length) !== checksumBits) {
            throw new Error("Invalid mnemonic phrase. Checksum does not match.");
        }

        return entropy;
    }

    /**
     * Converts the mnemonic words to a seed using an optional password.
     * @param password An optional password to use when generating the seed. Default is an empty string.
     * @returns A Promise that resolves to a Uint8Array containing the seed.
     */
    public toSeed(password = ""): Uint8Array {
        const normalizedMnemonic = this.mnemonic.map((word) => normalize(word)).join(" ");
        const salt = `mnemonic${normalize(password)}`;
        return pbkdf2(sha512, normalizedMnemonic, salt, { c: 2048, dkLen: 64 });
    }

    /**
     * Checks if the mnemonic is valid.
     * @returns A Promise that resolves to a boolean indicating whether the mnemonic is valid.
     */
    public async isValid(): Promise<boolean> {
        const mnemonicLength = this.mnemonic.length;

        if (![12, 15, 18, 21, 24].includes(mnemonicLength)) {
            return false;
        }

        try {
            await this.toEntropy();
            return true;
        } catch (error) {
            return false;
        }
    }
}
