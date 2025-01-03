"use client";

import { EmbeddedCard } from "@/components/Common/EmbeddedCard";
import { SignUpFlow } from "@/components/SignUpFlow/SignUpFlow";
import { useZeraKeyring } from "@/components/Zera/hooks/useZeraKeyring";
import { Loader } from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Onboarding() {
    const { keyring } = useZeraKeyring();
    const router = useRouter();

    const vaultAccounts = keyring.getVaultAccounts();

    useEffect(() => {
        if (vaultAccounts.length > 0) {
            router.push("/");
        }
    }, [vaultAccounts, router]);

    if (vaultAccounts.length > 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center gap-y-4 h-screen">
            <EmbeddedCard>
                <SignUpFlow />
            </EmbeddedCard>
        </div>
    );
}
