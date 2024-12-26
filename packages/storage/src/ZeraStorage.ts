export const ZeraStorageType = {
    LOCAL_STORAGE: "localStorage",
    FILE_SYSTEM: "fs",
    MEMORY: "memory",
} as const;
export type ZeraStorageType = (typeof ZeraStorageType)[keyof typeof ZeraStorageType];

export function isZeraStorageType(type: unknown): type is ZeraStorageType {
    return typeof type === "string" && Object.values(ZeraStorageType).includes(type as ZeraStorageType);
}

export abstract class ZeraStorage {
    constructor(readonly type: ZeraStorageType) {}

    abstract setItem(key: string, value: string): Promise<void>;
    abstract getItem(key: string): Promise<string | null>;
    abstract removeItem(key: string): Promise<void>;
    abstract clear(): Promise<void>;
}
