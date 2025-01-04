"use client";

import { ZeraKeyringProvider } from "./hooks/useZeraKeyring";

export function ZeraClientProviders({ children }: { children: React.ReactNode }) {
    return <ZeraKeyringProvider>{children}</ZeraKeyringProvider>;
}
