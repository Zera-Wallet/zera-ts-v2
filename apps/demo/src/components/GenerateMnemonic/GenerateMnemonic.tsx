"use client";

import { useState } from "react";

import { ZeraMnemonic } from "@zera-ts/mnemonic";
import { Copy } from "lucide-react";
import { useEffect } from "react";
import { MnemonicDisplay } from "./MnemonicDisplay";
import { StrengthControl } from "./StrengthControl";

export function GenerateMnemonic() {
    const [strength, setStrength] = useState<128 | 256>(128);
    const [zeraMnemonic, setZeraMnemonic] = useState<ZeraMnemonic | null>(null);

    const loading = zeraMnemonic == null;

    useEffect(() => {
        (async () => {
            const zeraMnemonic = await ZeraMnemonic.generate(strength);
            console.log(zeraMnemonic);
            setZeraMnemonic(zeraMnemonic);
        })();
    }, [strength]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col w-full max-w-[420px] p-4 border border-border rounded-lg text-sm">
            <div className="flex w-full justify-between mb-4">
                <StrengthControl currentStrength={strength} setStrength={setStrength} />
                <CopyButton text={zeraMnemonic.toString()} />
            </div>
            <MnemonicDisplay zeraMnemonic={zeraMnemonic} />
        </div>
    );
}

function CopyButton({ text }: { text: string }) {
    return (
        <button
            type="button"
            className="opacity-50 hover:opacity-100 transition-all active:scale-95"
            onClick={() => {
                navigator.clipboard.writeText(text);
            }}
        >
            <Copy className="w-4 h-4" />
        </button>
    );
}
