"use client";

import { useState } from "react";

import { Keypair } from "@solana/web3.js";
import { ZeraHDPath, ZeraHDWallet } from "@zera-ts/hd-wallet";
import { ZeraMnemonic, ZeraMnemonicStrength } from "@zera-ts/mnemonic";
import { Copy } from "lucide-react";
import { useEffect } from "react";
import { mnemonicToAccount, privateKeyToAccount } from "viem/accounts";
import { MnemonicDisplay } from "./MnemonicDisplay";
import { StrengthControl } from "./StrengthControl";

export function GenerateMnemonic() {
    const [strength, setStrength] = useState<ZeraMnemonicStrength>(128);
    const [zeraMnemonic, setZeraMnemonic] = useState<ZeraMnemonic | null>(null);

    const loading = zeraMnemonic == null;

    useEffect(() => {
        (async () => {
            const zeraMnemonic = await ZeraMnemonic.generate(strength);
            console.log(zeraMnemonic);
            setZeraMnemonic(zeraMnemonic);

            testLogging(zeraMnemonic);
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

function testLogging(zeraMnemonic: ZeraMnemonic) {
    const zeraHDWallet = ZeraHDWallet.fromMasterSeed(zeraMnemonic.toSeed(), "secp256k1");
    console.log(zeraHDWallet);

    const path = ZeraHDPath.fromString("m/44'/60'/0'/0/0");
    console.log(path.toString());
    const child = zeraHDWallet.derive(path);

    console.log("child private key", child.privateKey.toString());

    const hexPrivateKey = `0x${toHex(child.privateKey)}` as const;
    console.log("hexPrivateKey", hexPrivateKey);

    const account = privateKeyToAccount(hexPrivateKey);
    console.log("child pk account", account);

    const account2 = mnemonicToAccount(zeraMnemonic.toString());
    console.log("mnemonic account", account2);

    const solanaPath = ZeraHDPath.fromString("m/44'/501'/0'/0'");
    console.log(solanaPath.toString());
    const solanaChild = ZeraHDWallet.fromMasterSeed(zeraMnemonic.toSeed(), "ed25519").derive(solanaPath);

    const solanaChildKp = Keypair.fromSeed(solanaChild.privateKey);
    console.log("solana child kp publickey", solanaChildKp.publicKey.toBase58());
}

function toHex(bytes: Uint8Array) {
    return bytes.reduce((acc, byte) => acc + byte.toString(16).padStart(2, "0"), "");
}
