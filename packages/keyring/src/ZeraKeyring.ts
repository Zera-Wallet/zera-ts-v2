import { bytesToHex } from "@noble/ciphers/utils";
import { randomBytes } from "@zera-ts/bytes";
import { MemoryStorage, ZeraEncryptedKVStorage } from "@zera-ts/storage";

const KEYRING_STORAGE_KEYS = {
    MASTER_KEY: "zera.keyring:master-key",
    VAULT: "zera.keyring:vault",
};

export class ZeraKeyring {
    #memoryStorage: MemoryStorage;

    constructor(
        private readonly encryptedStorage: ZeraEncryptedKVStorage,
        private readonly storageKeys: typeof KEYRING_STORAGE_KEYS = KEYRING_STORAGE_KEYS,
    ) {
        this.#memoryStorage = new MemoryStorage();
    }

    /**
     * Creates a new keyring and stores the encryption key in the hard storage.
     * @param password - The password to use to encrypt the encryption key.
     */
    create(password: string) {
        this.createAndStoreMasterKey(password);
    }

    async exists() {
        const masterKey = this.encryptedStorage.get(this.storageKeys.MASTER_KEY);
        return masterKey != null;
    }

    /**
     * Unlocks the keyring and stores the master key in the memory storage.
     * @param password - The password to use to decrypt the master key.
     */
    unlock(password: string) {
        if (this.isUnlocked()) {
            return;
        }

        let masterKey: string;
        try {
            const _masterKey = this.encryptedStorage.getDecrypted(password, this.storageKeys.MASTER_KEY);
            if (!_masterKey) {
                throw new Error(`${this.storageKeys.MASTER_KEY} not found`);
            }
            masterKey = _masterKey;
        } catch (error) {
            console.error("Failed to unlock keyring", error);
            throw new Error("Failed to unlock keyring");
        }

        this.#memoryStorage.set(this.storageKeys.MASTER_KEY, masterKey);
    }

    /**
     * UTILITY
     */
    /**
     * Checks if the keyring is unlocked.
     * @returns true if the keyring is unlocked, false otherwise.
     */
    isUnlocked() {
        const memoryMasterKey = this.#memoryStorage.get(this.storageKeys.MASTER_KEY);
        return memoryMasterKey != null;
    }

    lock() {
        this.#memoryStorage.del(this.storageKeys.MASTER_KEY);
    }

    /**
     * PRIVATE HELPERS
     */
    private createAndStoreMasterKey(password: string) {
        const masterKey = randomBytes(32);
        const hexMasterKey = bytesToHex(masterKey);
        this.encryptedStorage.set(password, this.storageKeys.MASTER_KEY, hexMasterKey);
    }
}
