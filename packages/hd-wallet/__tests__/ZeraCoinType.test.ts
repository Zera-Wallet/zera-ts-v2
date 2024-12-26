import { assert, describe, test } from "vitest";
import { ZERA_COIN_TYPES, isValidCoinType } from "../src/types/index";

describe("ZeraCoinType", () => {
    test("isValidCoinType returns true for valid coin types", () => {
        for (const coinType of ZERA_COIN_TYPES) {
            assert.isTrue(
                isValidCoinType({
                    value: coinType,
                    hardened: true,
                }),
            );
        }
    });

    test("isValidCoinType returns false for invalid coin types", () => {
        const invalidCoinTypes = [-1, Number.NaN, Number.POSITIVE_INFINITY, undefined, null, "", "69"];
        for (const coinType of invalidCoinTypes) {
            assert.isFalse(
                isValidCoinType({
                    // @ts-expect-error - coinType is invalid
                    value: coinType,
                    hardened: false,
                }),
            );
        }
    });
});
