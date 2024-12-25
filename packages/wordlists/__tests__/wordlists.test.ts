import { describe, expect, test } from "vitest";
import ZeraWordlist, { ZeraLanguage, ZeraValidLanguages } from "../src/index";

describe("ZeraWordlist", () => {
    test("get should return valid wordlists for supported languages", async () => {
        for (const language of ZeraValidLanguages) {
            const wordlist = await ZeraWordlist.get(language);
            expect(wordlist.language).toBe(language);
            expect(wordlist.words.length).toBe(2048);
            expect(new Set(wordlist.words).size).toBe(2048);
        }
    });

    test("get should throw an error for an unsupported language", async () => {
        await expect(ZeraWordlist.get("unsupported" as ZeraLanguage)).rejects.toThrow("Failed to load wordlist file");
    });

    test("get should cache wordlists", async () => {
        const wordlist1 = await ZeraWordlist.get("en");
        const wordlist2 = await ZeraWordlist.get("en");
        expect(wordlist1).toBe(wordlist2);
    });
});
