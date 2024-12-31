export type EncryptedStoredMasterEncryptionKey = {
    salt: string;
    nonce: string;
    encrypted: string;
};

export type DecryptedStoredMasterEncryptionKey = {
    nonce: string;
    decrypted: string;
};
