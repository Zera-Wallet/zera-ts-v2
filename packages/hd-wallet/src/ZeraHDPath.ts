import { HDPathPart } from "./types/HDPathPart";
import { ZeraCoinType, isValidCoinType } from "./types/ZeraCoinType";

// Zera only supports BIP44
export type ZeraPurpose = 44;
function isZeraPurpose(value: HDPathPart<number>): value is HDPathPart<ZeraPurpose> {
    return value.value === 44 && value.hardened === true;
}

export type ZeraChange = 0 | 1;
function isZeraChange(value: HDPathPart<number>): value is HDPathPart<ZeraChange> {
    return value.value === 0 || value.value === 1;
}

export class ZeraHDPath<
    TPurpose extends HDPathPart<ZeraPurpose> = HDPathPart<ZeraPurpose>,
    TCoinType extends HDPathPart<ZeraCoinType> = HDPathPart<ZeraCoinType>,
    TAccount extends HDPathPart<number> = HDPathPart<number>,
    TChange extends HDPathPart<ZeraChange> | undefined = HDPathPart<ZeraChange> | undefined,
    TIndex extends HDPathPart<number> | undefined = HDPathPart<number> | undefined,
> {
    get parts(): [TPurpose, TCoinType, TAccount, TChange, TIndex] {
        return [this.purpose, this.coinType, this.account, this.change, this.index];
    }

    constructor(
        public readonly purpose: TPurpose,
        public readonly coinType: TCoinType,
        public readonly account: TAccount,
        public readonly change: TChange,
        public readonly index: TIndex,
    ) {
        if (purpose.value !== 44) {
            throw new Error("Invalid purpose: Only purpose 44 is supported");
        }
    }

    /**
     * Returns the HD path as a string.
     * @returns The HD path as a string.
     */
    toString(): string {
        const hdPathToString = (part: HDPathPart) => (part.hardened ? `${part.value}'` : `${part.value}`);
        let pathString = `m/${hdPathToString(this.purpose)}/${hdPathToString(this.coinType)}/${hdPathToString(this.account)}`;
        if (this.change != null) {
            pathString += `/${hdPathToString(this.change)}`;
        }
        if (this.index != null) {
            pathString += `/${hdPathToString(this.index)}`;
        }
        return pathString;
    }

    /**
     * Creates a ZeraHDPath instance from a given path string.
     * @param path The path string.
     * @returns A ZeraHDPath instance.
     * @throws Will throw an error if the path string is invalid.
     */
    static fromString(path: string): ZeraHDPath {
        const pathRegex = /^m(\/[-]?[0-9]+'?)+$/;
        if (!pathRegex.test(path)) {
            throw new Error(
                "Invalid path string: Must start with 'm' and contain number segments with optional hardened flag",
            );
        }

        const parts = path.split("/").slice(1);
        const [purpose, coinType, account, change, index] = parts.map(parsePartMaybeHardened);

        // throw new Error(`Not implemented ${path}`);

        console.log({ purpose, coinType, account, change, index });

        if (!isZeraPurpose(purpose)) {
            throw new Error("Invalid purpose: Must be 44, and hardened");
        }
        if (!isValidCoinType(coinType)) {
            throw new Error("Invalid coin type. Must be valid BIP44 coin type, and hardened");
        }
        if (!account.hardened) {
            throw new Error("Invalid account. Must be hardened");
        }
        if (change != null && !isZeraChange(change)) {
            throw new Error("Invalid change. Must be 0 or 1");
        }
        if (index != null && index.value < 0) {
            throw new Error("Invalid index. Must be positive");
        }

        return new ZeraHDPath(
            purpose,
            coinType,
            account,
            change != null ? change : undefined,
            index != null ? index : undefined,
        );
    }
}

const parsePartMaybeHardened = (part: string): HDPathPart => {
    if (part.endsWith("'")) {
        return {
            value: Number(part.slice(0, -1)),
            hardened: true,
        };
    }
    return {
        value: Number(part),
        hardened: false,
    };
};
