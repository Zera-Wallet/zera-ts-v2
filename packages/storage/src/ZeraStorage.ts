export const ZeraStorageType = {
    LOCAL_STORAGE: "localStorage",
    FILE_SYSTEM: "fs",
    MEMORY: "memory",
} as const;
export type ZeraStorageType = (typeof ZeraStorageType)[keyof typeof ZeraStorageType];

export function isZeraStorageType(type: unknown): type is ZeraStorageType {
    return typeof type === "string" && Object.values(ZeraStorageType).includes(type as ZeraStorageType);
}

export abstract class ZeraKVStorage {
    constructor(readonly type: ZeraStorageType) {}

    abstract set(key: string, value: string): void;
    abstract get(key: string): string | null;
    abstract getKeys(prefix?: string): string[];
    abstract del(key: string): void;

    abstract clear(): void;
}

export abstract class ZeraEncryptedKVStorage {
    constructor(readonly kvStorage: ZeraKVStorage) {}

    abstract set(encryptionKey: string, key: string, value: string): void;
    setDecrypted(key: string, value: string): void {
        this.kvStorage.set(key, value);
    }

    get(key: string): string | null {
        return this.kvStorage.get(key);
    }
    abstract getDecrypted(decryptionKey: string, key: string): string | null;

    getKeys(prefix?: string): string[] {
        return this.kvStorage.getKeys(prefix);
    }
    del(key: string): void {
        this.kvStorage.del(key);
    }

    clear(): void {
        this.kvStorage.clear();
    }
}

export type ZeraStorage = ZeraKVStorage | ZeraEncryptedKVStorage;
