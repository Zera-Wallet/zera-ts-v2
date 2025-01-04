"use client";

import { KEYRING_STORAGE_KEYS, ZeraAesStorage, ZeraKeyring, ZeraVaultAccount } from "@zera-ts/keyring";
import { LocalStorage } from "@zera-ts/storage";
import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export interface ZeraKeyringContext {
    keyring: ZeraKeyring;
    selectVaultAccountId: string | null;
    setSelectVaultAccountId: (vaultAccountId: string) => void;
    selectedVaultAccount: ZeraVaultAccount | null;
}

const ZeraKeyringContext = createContext<ZeraKeyringContext | undefined>(undefined);

export function ZeraKeyringProvider({ children }: { children: React.ReactNode }) {
    const [keyring, setKeyring] = useState<ZeraKeyring>(new ZeraKeyring(new ZeraAesStorage(new LocalStorage())));
    const [selectVaultAccountId, setSelectVaultAccountId] = useLocalStorage<string | null>(
        KEYRING_STORAGE_KEYS.SELECTED_VAULT_ACCOUNT_ID,
        () => {
            const vaultAccounts = keyring.getVaultAccounts();
            console.log("vaultAccounts", vaultAccounts);
            if (vaultAccounts.length === 0) {
                return null;
            }
            return vaultAccounts[0].id;
        },
    );

    const selectedVaultAccount =
        keyring.getVaultAccounts().find((vaultAccount) => vaultAccount.id === selectVaultAccountId) ?? null;

    return (
        <ZeraKeyringContext.Provider
            value={{ keyring, selectVaultAccountId, setSelectVaultAccountId, selectedVaultAccount }}
        >
            {children}
        </ZeraKeyringContext.Provider>
    );
}

export function useZeraKeyring() {
    const context = useContext(ZeraKeyringContext);
    if (context == null) {
        throw new Error("useZeraKeyring must be used within a ZeraKeyringProvider");
    }
    return context;
}
