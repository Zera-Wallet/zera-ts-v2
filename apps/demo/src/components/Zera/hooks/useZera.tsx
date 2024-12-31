"use client";

import { createContext, useContext, useEffect, useState } from "react";

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
export interface ZeraContext {}

const ZeraContext = createContext<ZeraContext | undefined>(undefined);

export function ZeraProvider({ children }: { children: React.ReactNode }) {
    return <ZeraContext.Provider value={{}}>{children}</ZeraContext.Provider>;
}

export function useZera() {
    const context = useContext(ZeraContext);
    if (context == null) {
        throw new Error("useZera must be used within a ZeraProvider");
    }
    return context;
}
