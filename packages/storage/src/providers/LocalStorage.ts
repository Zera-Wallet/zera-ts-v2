import { ZeraKVStorage, ZeraStorageType } from "../ZeraStorage";

export class LocalStorage extends ZeraKVStorage {
    constructor() {
        super(ZeraStorageType.LOCAL_STORAGE);
    }

    set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    get(key: string): string | null {
        return localStorage.getItem(key);
    }

    del(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}
