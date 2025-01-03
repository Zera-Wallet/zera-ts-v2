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

    getKeys(prefix?: string): string[] {
        const keys: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const keyForIndex = localStorage.key(i);
            if (!keyForIndex) {
                continue;
            }
            if (prefix) {
                if (keyForIndex.startsWith(prefix)) {
                    keys.push(keyForIndex);
                }
            } else {
                keys.push(keyForIndex);
            }
        }
        return keys;
    }

    del(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}
