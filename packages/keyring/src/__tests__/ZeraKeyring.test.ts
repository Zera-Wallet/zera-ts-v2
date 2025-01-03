import { ZeraEncryptedKVStorage } from "@zera-ts/storage";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ZeraKeyring } from "../ZeraKeyring";
import { ZeraCreateVaultParams } from "../schemas/createVault";
import { ZeraCreateVaultAccountParams } from "../schemas/createVaultAccount";

// Mock the external dependencies
vi.mock("@noble/ciphers/utils", () => ({
    bytesToHex: (bytes: Uint8Array) => Buffer.from(bytes).toString("hex"),
}));

vi.mock("@zera-ts/bytes", () => ({
    randomBytes: (length: number) => new Uint8Array(length).fill(1),
}));

describe("ZeraKeyring", () => {
    let keyring: ZeraKeyring;
    let mockStorage: {
        get: ReturnType<typeof vi.fn>;
        getDecrypted: ReturnType<typeof vi.fn>;
        set: ReturnType<typeof vi.fn>;
        setDecrypted: ReturnType<typeof vi.fn>;
        getKeys: ReturnType<typeof vi.fn>;
    };

    beforeEach(() => {
        // Create mock storage
        mockStorage = {
            get: vi.fn(),
            getDecrypted: vi.fn(),
            set: vi.fn(),
            setDecrypted: vi.fn(),
            getKeys: vi.fn(),
        };

        keyring = new ZeraKeyring(mockStorage as unknown as ZeraEncryptedKVStorage);
    });

    describe("create", () => {
        it("should create a new keyring with the given password", () => {
            const password = "testPassword";
            keyring.create(password);

            expect(mockStorage.set).toHaveBeenCalledWith(password, "zera.keyring:master-key", expect.any(String));
        });
    });

    describe("unlock", () => {
        it("should unlock the keyring with correct password", () => {
            const password = "testPassword";
            const mockMasterKey = "mockMasterKey";

            mockStorage.getDecrypted.mockReturnValue(mockMasterKey);

            keyring.unlock(password);
            expect(keyring.isUnlocked()).toBe(true);
        });

        it("should throw error if master key not found", () => {
            const password = "testPassword";
            mockStorage.getDecrypted.mockReturnValue(null);

            expect(() => keyring.unlock(password)).toThrow("Failed to unlock keyring");
        });

        it("should not unlock twice if already unlocked", () => {
            const password = "testPassword";
            const mockMasterKey = "mockMasterKey";

            mockStorage.getDecrypted.mockReturnValue(mockMasterKey);

            keyring.unlock(password);
            keyring.unlock(password);

            expect(mockStorage.getDecrypted).toHaveBeenCalledTimes(1);
        });
    });

    describe("createVault", () => {
        it("should create a seed vault", () => {
            const password = "testPassword";
            const mockMasterKey = "mockMasterKey";
            const vaultParams: ZeraCreateVaultParams = {
                type: "seed",
                seed: "test seed phrase",
            };

            // Setup
            mockStorage.getDecrypted.mockReturnValue(mockMasterKey);
            keyring.unlock(password);

            const vaultId = keyring.createVault(vaultParams);

            expect(mockStorage.set).toHaveBeenCalledWith(
                mockMasterKey,
                expect.stringContaining("zera.keyring:seed-vault"),
                vaultParams.seed,
            );
            expect(vaultId).toBeTruthy();
        });

        it("should throw error if keyring is locked", () => {
            const vaultParams: ZeraCreateVaultParams = {
                type: "seed",
                seed: "test seed phrase",
            };

            expect(() => keyring.createVault(vaultParams)).toThrow("Keyring is not unlocked");
        });
    });

    describe("createVaultAccount", () => {
        it("should create a vault account", () => {
            const password = "testPassword";
            const mockMasterKey = "mockMasterKey";
            const accountParams: ZeraCreateVaultAccountParams = {
                type: "seed-derivation",
                vaultId: "testVaultId",
                derivationPaths: [
                    {
                        path: "m/44'/0'/0'/0/0",
                        address: "test-address",
                    },
                ],
            };

            // Setup
            mockStorage.getDecrypted.mockReturnValue(mockMasterKey);
            keyring.unlock(password);

            const accountId = keyring.createVaultAccount(accountParams);

            expect(mockStorage.setDecrypted).toHaveBeenCalledWith(
                expect.stringContaining("zera.keyring:vault-account"),
                expect.any(String),
            );
            expect(accountId).toBeTruthy();
        });
    });

    describe("getVaultAccounts", () => {
        it("should return vault accounts", () => {
            const mockAccounts = [
                {
                    type: "seed-derivation" as const,
                    vaultId: "testVaultId",
                    derivationPaths: [
                        {
                            path: "m/44'/0'/0'/0/0",
                            address: "test-address-1",
                        },
                    ],
                },
                {
                    type: "seed-derivation" as const,
                    vaultId: "testVaultId",
                    derivationPaths: [
                        {
                            path: "m/44'/0'/0'/0/1",
                            address: "test-address-2",
                        },
                    ],
                },
            ];

            mockStorage.getKeys.mockReturnValue(["account1", "account2"]);
            mockStorage.get.mockReturnValueOnce(mockAccounts[0]).mockReturnValueOnce(mockAccounts[1]);

            const accounts = keyring.getVaultAccounts("testVaultId");

            expect(accounts).toHaveLength(2);
            expect(accounts).toEqual(mockAccounts);
        });
    });

    describe("lock", () => {
        it("should lock the keyring", () => {
            const password = "testPassword";
            const mockMasterKey = "mockMasterKey";

            mockStorage.getDecrypted.mockReturnValue(mockMasterKey);

            keyring.unlock(password);
            expect(keyring.isUnlocked()).toBe(true);

            keyring.lock();
            expect(keyring.isUnlocked()).toBe(false);
        });
    });
});
