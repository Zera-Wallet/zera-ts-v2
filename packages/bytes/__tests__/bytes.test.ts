import { randomBytes } from "../src/randomBytes";
import { bytesToBinary } from "../src/bytesToBinary";
import { binaryToBytes } from "../src/binaryToBytes";

import { describe, test, expect } from "vitest";

describe("randomBytes", () => {
    test("returns Uint8Array with specified length", () => {
        const bytes = randomBytes(10);
        expect(bytes instanceof Uint8Array).toBe(true);
        expect(bytes.length).toBe(10);
    });
});

describe("bytesToBinary", () => {
    test("converts Uint8Array to binary string", () => {
        const bytes = new Uint8Array([1, 2, 3]);
        const binary = bytesToBinary(bytes);
        expect(binary).toBe("000000010000001000000011");
    });
});

describe("binaryToBytes", () => {
    test("converts binary string to Uint8Array", () => {
        const binary = "000000010000001000000011";
        const bytes = binaryToBytes(binary);
        expect(bytes).toEqual(new Uint8Array([1, 2, 3]));
    });
});
