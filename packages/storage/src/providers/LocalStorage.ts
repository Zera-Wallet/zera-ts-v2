import { ZeraStorage, ZeraStorageType } from "../ZeraStorage";

export class LocalStorage extends ZeraStorage {
    constructor() {
        super(ZeraStorageType.LOCAL_STORAGE);
    }

    async setItem(key: string, value: string): Promise<void> {
        localStorage.setItem(key, value);
    }

    async getItem(key: string): Promise<string | null> {
        return localStorage.getItem(key);
    }

    async removeItem(key: string): Promise<void> {
        localStorage.removeItem(key);
    }

    async clear(): Promise<void> {
        localStorage.clear();
    }
}
