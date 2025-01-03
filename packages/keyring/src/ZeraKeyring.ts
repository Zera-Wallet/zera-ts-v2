import { bytesToHex } from "@noble/ciphers/utils";
import { randomBytes } from "@zera-ts/bytes";
import { MemoryStorage, ZeraEncryptedKVStorage } from "@zera-ts/storage";
import { ZeraCreateVaultParams } from "./schemas/createVault";
import {
    ZeraCreateVaultAccountParams,
    ZeraVaultAccount,
    storedZeraVaultAccountSchema,
} from "./schemas/createVaultAccount";

export const KEYRING_STORAGE_KEYS = {
    MASTER_KEY: "zera.keyring:master-key",
    SEED_VAULT: "zera.keyring:seed-vault",
    PRIVATE_KEY_VAULT: "zera.keyring:private-key-vault",
    VAULT_ACCOUNT: "zera.keyring:vault-account",
    SELECTED_VAULT_ACCOUNT_ID: "zera.keyring:selected-vault-account-id",
};

export class ZeraKeyring {
    // TODO: Use jwt session service
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
     * ACCOUNT MANAGEMENT
     */
    createVault(params: ZeraCreateVaultParams): string {
        if (!this.isUnlocked()) {
            throw new Error("Keyring is not unlocked");
        }

        const masterKey = this.#memoryStorage.get(this.storageKeys.MASTER_KEY);
        if (!masterKey) {
            throw new Error("Master key not found");
        }

        const vaultId = randomBytes(32);
        const vaultIdString = bytesToHex(vaultId);

        let vaultPrefix: string;
        switch (params.type) {
            case "seed":
                vaultPrefix = this.storageKeys.SEED_VAULT;
                break;
            default:
                throw new Error(`Unsupported vault type: ${params.type}`);
        }
        this.encryptedStorage.set(masterKey, `${vaultPrefix}.${vaultIdString}`, params.seed);

        return vaultIdString;
    }
    createVaultAccount(params: ZeraCreateVaultAccountParams): ZeraVaultAccount {
        if (!this.isUnlocked()) {
            throw new Error("Keyring is not unlocked");
        }

        const masterKey = this.#memoryStorage.get(this.storageKeys.MASTER_KEY);
        if (!masterKey) {
            throw new Error("Master key not found");
        }

        const accountPrefix = this.storageKeys.VAULT_ACCOUNT;
        const accountId = randomBytes(32);
        const accountIdString = bytesToHex(accountId);

        params.name = params.name ?? this.getNewVaultAccountName();

        this.encryptedStorage.setDecrypted(`${accountPrefix}.${accountIdString}`, JSON.stringify(params));

        return {
            id: accountIdString,
            name: params.name,
            type: params.type,
            vaultId: params.vaultId,
            derivationPaths: params.derivationPaths,
        };
    }

    getVaultAccounts(vaultId?: string): ZeraVaultAccount[] {
        const queryKey = vaultId ? `${this.storageKeys.VAULT_ACCOUNT}.${vaultId}` : this.storageKeys.VAULT_ACCOUNT;
        const accountStorageKeys = this.encryptedStorage.getKeys(queryKey);
        console.log({ accountStorageKeys });
        const maybeNullableAccounts = accountStorageKeys.map((accountKey) => {
            const account = this.encryptedStorage.get(accountKey);
            if (!account) {
                return null;
            }
            let jsonParsed: object;
            try {
                jsonParsed = JSON.parse(account);
            } catch (error) {
                return null;
            }
            const parseResult = storedZeraVaultAccountSchema.safeParse(jsonParsed);
            if (!parseResult.success) {
                return null;
            }
            const accountId = accountKey.split(".")[2];
            return {
                id: accountId,
                ...parseResult.data,
            };
        });
        return maybeNullableAccounts.filter((account) => account != null);
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
        this.#memoryStorage.set(this.storageKeys.MASTER_KEY, hexMasterKey);
    }
    private getNewVaultAccountName() {
        const vaultAccounts = this.getVaultAccounts();
        return `Account ${vaultAccounts.length + 1}`;
    }
}
