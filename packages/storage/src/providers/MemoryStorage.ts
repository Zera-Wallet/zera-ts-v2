import { ZeraStorage } from "../ZeraStorage";

export class MemoryStorage extends ZeraStorage {
    private data: Record<string, string> = {};

    constructor() {
        super("memory");
    }

    async setItem(key: string, value: string): Promise<void> {
        this.data[key] = value;
    }

    async getItem(key: string): Promise<string | null> {
        return this.data[key] ?? null;
    }

    async removeItem(key: string): Promise<void> {
        delete this.data[key];
    }

    async clear(): Promise<void> {
        this.data = {};
    }
}
