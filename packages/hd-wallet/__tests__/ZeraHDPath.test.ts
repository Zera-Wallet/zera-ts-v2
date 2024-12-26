import { describe, expect, test } from "vitest";
import { ZeraHDPath } from "../src/ZeraHDPath";
import { ZERA_COIN_TYPES } from "../src/types/index";

const invalidPurposes = [45, 50, 85];
const invalidChanges = [2, 3];

describe("ZeraHDPath", () => {
    test("constructor should create ZeraHDPath object with correct values", () => {
        for (const coinType of ZERA_COIN_TYPES) {
            const hdPath = new ZeraHDPath(
                {
                    value: 44,
                    hardened: true,
                },
                {
                    value: coinType,
                    hardened: true,
                },
                {
                    value: 0,
                    hardened: true,
                },
                {
                    value: 0,
                    hardened: false,
                },
                {
                    value: 0,
                    hardened: false,
                },
            );
            expect(hdPath.purpose).toStrictEqual({ value: 44, hardened: true });
            expect(hdPath.coinType).toStrictEqual({ value: coinType, hardened: true });
            expect(hdPath.account).toStrictEqual({ value: 0, hardened: true });
            expect(hdPath.change).toStrictEqual({ value: 0, hardened: false });
            expect(hdPath.index).toStrictEqual({ value: 0, hardened: false });
        }
    });

    test("constructor should throw error on invalid purpose", () => {
        // biome-ignore lint/complexity/noForEach: <explanation>
        for (const purpose of invalidPurposes) {
            // @ts-expect-error - purpose is invalid
            expect(() => new ZeraHDPath(purpose, 0, 0, 0, 0)).toThrow("Invalid purpose: Only purpose 44 is supported");
        }
    });

    test("toString should return the correct HD path string", () => {
        for (const coinType of ZERA_COIN_TYPES) {
            const hdPath = new ZeraHDPath(
                {
                    value: 44,
                    hardened: true,
                },
                {
                    value: coinType,
                    hardened: true,
                },
                { value: 0, hardened: true },
                { value: 0, hardened: false },
                { value: 0, hardened: false },
            );
            expect(hdPath.toString()).toBe(`m/44'/${coinType}'/0'/0/0`);
        }
    });

    test("fromString should create ZeraHDPath object with correct values", () => {
        for (const coinType of ZERA_COIN_TYPES) {
            const hdPath = ZeraHDPath.fromString(`m/44'/${coinType}'/0'/0/0`);
            expect(hdPath.purpose).toStrictEqual({ value: 44, hardened: true });
            expect(hdPath.coinType).toStrictEqual({ value: coinType, hardened: true });
            expect(hdPath.account).toStrictEqual({ value: 0, hardened: true });
            expect(hdPath.change).toStrictEqual({ value: 0, hardened: false });
            expect(hdPath.index).toStrictEqual({ value: 0, hardened: false });
        }
    });

    test("fromString should throw error on invalid path string", () => {
        expect(() => ZeraHDPath.fromString("asdas")).toThrow(
            "Invalid path string: Must start with 'm' and contain number segments with optional hardened flag",
        );
    });

    test("fromString should throw error on invalid purpose", () => {
        for (const purpose of invalidPurposes) {
            expect(() => ZeraHDPath.fromString(`m/${purpose}'/0'/0'/0/0`)).toThrow(
                "Invalid purpose: Must be 44, and hardened",
            );
        }
    });

    test("fromString should throw error on invalid coin type", () => {
        expect(() => ZeraHDPath.fromString("m/44'/99996969'/0'/0/0")).toThrow(
            "Invalid coin type. Must be valid BIP44 coin type, and hardened",
        );
    });

    test("fromString should throw error on invalid change", () => {
        for (const change of invalidChanges) {
            expect(() => ZeraHDPath.fromString(`m/44'/0'/0'/${change}/0`)).toThrow("Invalid change. Must be 0 or 1");
        }
    });

    test("fromString should throw error on invalid index", () => {
        const invalidIndexes = [-1, -2, -3];
        for (const index of invalidIndexes) {
            try {
                ZeraHDPath.fromString(`m/44'/0'/0'/0/${index}`);
            } catch (e) {
                expect(e.message).toBe("Invalid index. Must be positive");
            }
        }
    });
});
