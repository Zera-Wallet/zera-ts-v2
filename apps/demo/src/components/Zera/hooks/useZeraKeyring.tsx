"use client";

import { ZeraKeyring } from "@zera-ts/keyring";
import { LocalStorage } from "@zera-ts/storage";
import { createContext, useContext, useEffect, useState } from "react";

export interface ZeraKeyringContext {
    keyring: ZeraKeyring | null;
}

const ZeraKeyringContext = createContext<ZeraKeyringContext | undefined>(undefined);

export function ZeraKeyringProvider({ children }: { children: React.ReactNode }) {
    const [keyring, setKeyring] = useState<ZeraKeyring | null>(null);

    useEffect(() => {
        (async () => {
            const keyring = new ZeraKeyring(new LocalStorage());
            setKeyring(keyring);
        })();
    }, []);

    return <ZeraKeyringContext.Provider value={{ keyring }}>{children}</ZeraKeyringContext.Provider>;
}

export function useZeraKeyring() {
    const context = useContext(ZeraKeyringContext);
    if (context == null) {
        throw new Error("useZeraKeyring must be used within a ZeraKeyringProvider");
    }
    return context;
}
