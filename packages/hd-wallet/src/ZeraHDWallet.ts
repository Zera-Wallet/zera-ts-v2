import { abytes } from "@noble/hashes/_assert";
import { hmac } from "@noble/hashes/hmac";
import { sha512 } from "@noble/hashes/sha512";
import { concatBytes, numberToU32, utf8ToBytes } from "@zera-ts/bytes";
import { ZeraHDPath } from "./ZeraHDPath";
import { HDPathPart } from "./types/HDPathPart";

import { mod } from "@noble/curves/abstract/modular";
import { secp256k1 } from "@noble/curves/secp256k1";
import { bigIntToBytes } from "./utils/bigIntToBytes";
import { bytesToBigInt } from "./utils/bytesToBigInt";

export const CurveType = {
    Ed25519: "ed25519",
    Secp256k1: "secp256k1",
} as const;
export type CurveType = (typeof CurveType)[keyof typeof CurveType];

const CURVE_TYPE_TO_SEED_PREFIX: Record<CurveType, string> = {
    [CurveType.Secp256k1]: "Bitcoin seed",
    [CurveType.Ed25519]: "ed25519 seed",
};

const ZERO = new Uint8Array([0]);
export const HARDENED_OFFSET: number = 0x80000000;

export interface ZeraHDWalletCtorParams<CT extends CurveType = CurveType> {
    curveType: CT;
    privateKey: Uint8Array;
    chainCode: Uint8Array;
    depth?: number;
    index?: number;
}

export abstract class ZeraHDWallet<CT extends CurveType = CurveType> {
    readonly curveType: CT;

    readonly privateKey: Uint8Array;
    readonly chainCode: Uint8Array;

    readonly depth: number;
    readonly index: number;

    constructor(ctorParams: ZeraHDWalletCtorParams<CT>) {
        this.curveType = ctorParams.curveType;
        this.privateKey = ctorParams.privateKey;
        this.chainCode = ctorParams.chainCode;
        this.depth = ctorParams.depth ?? 0;
        this.index = ctorParams.index ?? 0;
    }

    static fromMasterSeed<CT extends CurveType>(seed: Uint8Array, curveType: CT): Secp256k1HDWallet | Ed25519HDWallet {
        abytes(seed);
        if (8 * seed.length < 128 || 8 * seed.length > 512) {
            throw new Error(
                `ZeraHDWallet: Seed length must be between 128 and 512 bits; 256 bits is advised, got ${seed.length}`,
            );
        }
        const hmacOutput = hmac(sha512, utf8ToBytes(CURVE_TYPE_TO_SEED_PREFIX[curveType]), seed);
        const privateKey = hmacOutput.slice(0, 32);
        const chainCode = hmacOutput.slice(32);
        switch (curveType) {
            case CurveType.Secp256k1:
                return new Secp256k1HDWallet({ privateKey, chainCode, curveType });
            case CurveType.Ed25519:
                return new Ed25519HDWallet({ privateKey, chainCode, curveType });
            default:
                throw new Error(`Unsupported curve type: ${curveType}`);
        }
    }

    derive(path: ZeraHDPath): ZeraHDWallet<CT> {
        let derivation: ZeraHDWallet<CT> = this;
        const pathParts = path.parts.map((part) => part && { ...part });
        for (const part of pathParts) {
            if (part == null) {
                continue;
            }
            derivation = derivation.deriveChild(part);
        }
        return derivation;
    }

    abstract deriveChild(part: HDPathPart): ZeraHDWallet<CT>;
}

export class Secp256k1HDWallet extends ZeraHDWallet<"secp256k1"> {
    deriveChild(part: HDPathPart): Secp256k1HDWallet {
        let childSeed: Uint8Array;
        const value = part.hardened ? part.value + HARDENED_OFFSET : part.value;
        if (part.hardened) {
            childSeed = concatBytes(ZERO, this.privateKey, numberToU32(value));
        } else {
            childSeed = concatBytes(secp256k1.getPublicKey(this.privateKey, true), numberToU32(value));
        }

        const hmacOutput = hmac(sha512, this.chainCode, childSeed);
        const privateKey = bigIntToBytes(
            mod(bytesToBigInt(this.privateKey) + bytesToBigInt(hmacOutput.slice(0, 32)), secp256k1.CURVE.n),
        );
        const chainCode: Uint8Array = hmacOutput.slice(32);

        return new Secp256k1HDWallet({
            privateKey,
            chainCode,
            depth: this.depth + 1,
            index: part.value,
            curveType: this.curveType,
        });
    }
}

export class Ed25519HDWallet extends ZeraHDWallet<"ed25519"> {
    deriveChild(part: HDPathPart): Ed25519HDWallet {
        let childSeed: Uint8Array;
        const value = part.hardened ? part.value + HARDENED_OFFSET : part.value;
        if (part.hardened) {
            childSeed = concatBytes(ZERO, this.privateKey, numberToU32(value));
        } else {
            throw new Error("Non-hardened derivation is not supported for ed25519");
        }

        const hmacOutput = hmac(sha512, this.chainCode, childSeed);
        const privateKey: Uint8Array = hmacOutput.slice(0, 32);
        const chainCode: Uint8Array = hmacOutput.slice(32);

        return new Ed25519HDWallet({
            privateKey,
            chainCode,
            depth: this.depth + 1,
            index: part.value,
            curveType: this.curveType,
        });
    }
}
