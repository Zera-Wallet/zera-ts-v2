"use client";

import { useState } from "react";

import { ZeraMnemonic, ZeraMnemonicStrength } from "@zera-ts/mnemonic";
import { Copy } from "lucide-react";
import { useEffect } from "react";
import { MnemonicDisplay } from "./MnemonicDisplay";
import { StrengthControl } from "./StrengthControl";

export function GenerateMnemonic({
    zeraMnemonic,
    setZeraMnemonic,
}: { zeraMnemonic: ZeraMnemonic | null; setZeraMnemonic: (zeraMnemonic: ZeraMnemonic) => void }) {
    const [strength, setStrength] = useState<ZeraMnemonicStrength>(128);

    const loading = zeraMnemonic == null;

    useEffect(() => {
        (async () => {
            const zeraMnemonic = await ZeraMnemonic.generate(strength);
            setZeraMnemonic(zeraMnemonic);
        })();
    }, [strength]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col w-full text-sm">
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
            className="hover:text-foreground transition-all active:scale-95 text-muted-foreground"
            onClick={() => {
                navigator.clipboard.writeText(text);
            }}
        >
            <Copy className="w-4 h-4" />
        </button>
    );
}
