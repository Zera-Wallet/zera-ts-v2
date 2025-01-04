import { Chain, TESTNET_CHAIN_REGISTRY, bip44CoinTypeToSupportedChains } from "@zera-ts/chain-registry";
import { ZeraHDPath } from "@zera-ts/hd-wallet";
import { ZeraVaultAccount } from "@zera-ts/keyring";
import { useEffect, useState } from "react";
import { Address, AllBalances } from "./types";

// Utility function to convert vault account to chains and addresses
function vaultAccountToChainsAndAddress(vaultAccount: ZeraVaultAccount): Record<Address, Chain[]> {
    if (vaultAccount.type !== "seed-derivation") {
        return {};
    }

    const chainsByAddress: Record<Address, Chain[]> = {};

    for (const derivationPath of vaultAccount.derivationPaths) {
        const hdPath = ZeraHDPath.fromString(derivationPath.path);
        const chains = bip44CoinTypeToSupportedChains(hdPath.coinType.value, TESTNET_CHAIN_REGISTRY);

        if (!chainsByAddress[derivationPath.address]) {
            chainsByAddress[derivationPath.address] = [];
        }
        chainsByAddress[derivationPath.address].push(...chains);
    }

    return chainsByAddress;
}

export interface UseBalancesResult {
    balances: AllBalances;
    loading: boolean;
    error: Error | null;
}

export function useBalances(vaultAccount: ZeraVaultAccount | null): UseBalancesResult {
    const [balances, setBalances] = useState<AllBalances>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let mounted = true;

        async function fetchBalances() {
            if (!vaultAccount) {
                setLoading(false);
                return;
            }

            try {
                const chainsAndAddresses = vaultAccountToChainsAndAddress(vaultAccount);
                const newBalances: AllBalances = {};

                const fetchPromises = Object.entries(chainsAndAddresses).map(async ([address, chains]) => {
                    if (!mounted) return;
                    newBalances[address] = {};

                    const chainPromises = chains.map(async (chain) => {
                        if (!mounted) return;
                        try {
                            const queryParams = new URLSearchParams();
                            queryParams.set("address", address);
                            queryParams.set("chain", JSON.stringify(chain));
                            const response = await fetch(`/api/fungible-balances?${queryParams.toString()}`);

                            if (!response.ok) {
                                console.warn(`Failed to fetch balances for ${chain.name}: ${response.statusText}`);
                                newBalances[address][chain.name] = [];
                                return;
                            }

                            const data = await response.json();
                            newBalances[address][chain.name] = data.balances;
                        } catch (error) {
                            console.error(`Error fetching balances for ${chain.name}:${address}:`, error);
                            newBalances[address][chain.name] = [];
                        }
                    });

                    await Promise.all(chainPromises);
                });

                await Promise.all(fetchPromises);

                if (mounted) {
                    setBalances(newBalances);
                    setLoading(false);
                }
            } catch (err) {
                if (mounted) {
                    console.error("Catastrophic error in balance fetching:", err);
                    setError(err instanceof Error ? err : new Error("Failed to fetch any balances"));
                    setLoading(false);
                }
            }
        }

        void fetchBalances();

        return () => {
            mounted = false;
        };
    }, [vaultAccount]);

    return { balances, loading, error };
}
