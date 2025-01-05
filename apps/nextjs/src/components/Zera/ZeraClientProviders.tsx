"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ZeraKeyringProvider } from "./hooks/useZeraKeyring";

const queryClient = new QueryClient();

export function ZeraClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ZeraKeyringProvider>{children}</ZeraKeyringProvider>
        </QueryClientProvider>
    );
}
