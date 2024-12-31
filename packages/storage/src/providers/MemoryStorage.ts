import { ZeraKVStorage } from "../ZeraStorage";

export class MemoryStorage extends ZeraKVStorage {
    #data: Record<string, string> = {};

    constructor() {
        super("memory");
    }

    set(key: string, value: string): void {
        this.#data[key] = value;
    }

    get(key: string): string | null {
        return this.#data[key] ?? null;
    }

    del(key: string): void {
        delete this.#data[key];
    }

    clear(): void {
        this.#data = {};
    }
}
