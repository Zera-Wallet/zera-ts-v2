import { describe, expect, test } from "vitest";
import { ZeraMnemonic } from "../src/ZeraMnemonic";

describe("ZeraMnemonic", () => {
    test("generate valid mnemonic", async () => {
        const mnemonic = await ZeraMnemonic.generate(128);
        expect(await mnemonic.isValid()).toBe(true);
    });

    test("generate mnemonic with different strength", async () => {
        const mnemonic = await ZeraMnemonic.generate(192);
        expect(await mnemonic.isValid()).toBe(true);
    });

    test("invalid strength value", async () => {
        try {
            // @ts-expect-error - Invalid strength value
            await ZeraMnemonic.generate(130);
        } catch (error) {
            expect(error.message).toBe("Invalid strength value. It must be one of 128, 160, 192, 224, or 256.");
        }
    });

    test("mnemonic to seed", async () => {
        const mnemonic = await ZeraMnemonic.generate(128);
        const seed = mnemonic.toSeed();
        expect(seed.length).toBe(64);
    });

    test("mnemonic to seed with password", async () => {
        const mnemonic = await ZeraMnemonic.generate(128);
        const seed = mnemonic.toSeed("password");
        expect(seed.length).toBe(64);
    });

    test("mnemonic to entropy and back", async () => {
        const originalMnemonic = await ZeraMnemonic.generate(128);
        const entropy = await originalMnemonic.toEntropy();
        const mnemonic = await ZeraMnemonic.fromEntropy(entropy);
        expect(mnemonic.toString()).toBe(originalMnemonic.toString());
    });

    test("fromWords", async () => {
        const originalMnemonic = await ZeraMnemonic.generate(128);
        const words = originalMnemonic.words;
        const mnemonic = await ZeraMnemonic.fromWords(words);
        expect(mnemonic.toString()).toBe(words.join(" "));
    });

    test("invalid fromPhrase", async () => {
        const invalidWords = ["invalid", "mnemonic", "phrase"];
        await expect(ZeraMnemonic.fromWords(invalidWords)).rejects.toThrow("Invalid mnemonic phrase.");
    });
});
