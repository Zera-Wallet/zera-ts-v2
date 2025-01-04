import { createKeyPairSignerFromPrivateKeyBytes } from "@solana/web3.js";
import { bytesToHex } from "@zera-ts/bytes";
import { ZeraHDPath, ZeraHDWallet } from "@zera-ts/hd-wallet";
import ZeraMnemonic from "@zera-ts/mnemonic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { privateKeyToAddress } from "viem/accounts";
import { GenerateMnemonic } from "../GenerateMnemonic/GenerateMnemonic";
import { useZeraKeyring } from "../Zera/hooks/useZeraKeyring";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

import { install } from "@solana/webcrypto-ed25519-polyfill";

install();

export function SaveMnemonic() {
    const { keyring, setSelectVaultAccountId } = useZeraKeyring();

    const router = useRouter();

    const [zeraMnemonic, setZeraMnemonic] = useState<ZeraMnemonic | null>(null);
    const [haveSavedMnemonic, setHaveSavedMnemonic] = useState(false);

    async function onContinue() {
        if (!zeraMnemonic) {
            throw new Error("Missing ZeraMnemonic");
        }
        // create vault
        const vaultId = keyring.createVault({
            type: "seed",
            seed: bytesToHex(zeraMnemonic.toSeed()),
        });

        // add solana and evm accounts
        const vaultAccount = keyring.createVaultAccount({
            type: "seed-derivation",
            vaultId,
            derivationPaths: [
                await generateSolanaFirstDerivationAccount(zeraMnemonic),
                generateEvmFirstDerivationAccount(zeraMnemonic),
            ],
        });

        setSelectVaultAccountId(vaultAccount.id);
        router.push("/");
    }

    return (
        <div className="flex w-full justify-center items-center flex-col">
            <h1 className="text-xl font-medium mb-1">Save your secret recovery phrase</h1>
            <p className="text-sm mb-4 text-center text-warning">
                This phrase is the ONLY way to recover your wallet. Do NOT share it with anyone!
            </p>

            <GenerateMnemonic zeraMnemonic={zeraMnemonic} setZeraMnemonic={setZeraMnemonic} />

            <div className="flex items-center space-x-2 w-full mt-5">
                <Checkbox
                    id="have-saved-mnemonic"
                    checked={haveSavedMnemonic}
                    onCheckedChange={(checked) => setHaveSavedMnemonic(checked === "indeterminate" ? false : checked)}
                />
                <label htmlFor="have-saved-mnemonic" className="text-sm leading-none text-muted-foreground">
                    I have saved my secret recovery phrase
                </label>
            </div>

            <Button onClick={onContinue} type="submit" className="w-full mt-3" disabled={!haveSavedMnemonic}>
                Continue
            </Button>
        </div>
    );
}

async function generateSolanaFirstDerivationAccount(zeraMnemonic: ZeraMnemonic) {
    const hdWallet = ZeraHDWallet.fromMasterSeed(zeraMnemonic.toSeed(), "ed25519");
    const path = ZeraHDPath.fromString("m/44'/501'/0'/0'");
    const solanaAccount = hdWallet.derive(path);
    const keypair = await createKeyPairSignerFromPrivateKeyBytes(solanaAccount.privateKey);
    return {
        path: path.toString(),
        address: keypair.address,
    };
}

function generateEvmFirstDerivationAccount(zeraMnemonic: ZeraMnemonic) {
    const hdWallet = ZeraHDWallet.fromMasterSeed(zeraMnemonic.toSeed(), "secp256k1");
    const path = ZeraHDPath.fromString("m/44'/60'/0'/0/0");
    const evmAccount = hdWallet.derive(path);
    const address = privateKeyToAddress(`0x${bytesToHex(evmAccount.privateKey)}`);
    return {
        path: path.toString(),
        address,
    };
}
