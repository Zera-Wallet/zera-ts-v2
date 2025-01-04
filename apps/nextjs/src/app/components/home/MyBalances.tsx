import { useZeraKeyring } from "@/components/Zera/hooks/useZeraKeyring";
import { Loader } from "@/components/ui/loader";
import { Chain, TESTNET_CHAIN_REGISTRY, bip44CoinTypeToSupportedChains } from "@zera-ts/chain-registry";
import { ZeraHDPath } from "@zera-ts/hd-wallet";
import { ZeraVaultAccount } from "@zera-ts/keyring";
import { useEffect, useState } from "react";

type FungibleToken = {
    caip19Id: `${string}:${string}/${string}:${string}`;
    decimals: number;
    metadata?: { name?: string; symbol?: string; imageUrl?: string };
};

interface Balance {
    amount: string;
    token: FungibleToken;
}

interface AddressBalances {
    [chainId: string]: Balance[];
}

interface AllBalances {
    [address: string]: AddressBalances;
}

export function MyBalances() {
    const { selectedVaultAccount } = useZeraKeyring();
    const [balances, setBalances] = useState<AllBalances>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function fetchBalances() {
            if (!selectedVaultAccount) {
                return;
            }

            const chainsAndAddresses = vaultAccountToChainsAndAddress(selectedVaultAccount);
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
                            throw new Error("Failed to fetch balances");
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
        }

        void fetchBalances();

        return () => {
            mounted = false;
        };
    }, [selectedVaultAccount]);

    if (!selectedVaultAccount || loading) {
        return (
            <div className="px-5 py-5 overflow-hidden flex flex-col items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="px-5 py-5 overflow-hidden flex flex-col">
            <h2 className="font-semibold text-lg mb-4">My Balances</h2>
            {Object.entries(balances).map(([address, chainBalances]) => (
                <div key={address} className="mb-6 rounded-lg p-4">
                    <p className="text-xs mb-3 font-mono">{address}</p>
                    {Object.entries(chainBalances).map(([chainId, balanceList]) => (
                        <div key={chainId} className="mb-4">
                            <p className="text-sm font-medium mb-2">{chainId}</p>
                            {(balanceList ?? []).length > 0 ? (
                                <div className="space-y-2">
                                    {balanceList.map((balance) => (
                                        <div
                                            key={balance.token.caip19Id}
                                            className="flex items-center p-3 rounded-md shadow-sm"
                                        >
                                            {balance.token.metadata?.imageUrl && (
                                                <img
                                                    src={balance.token.metadata.imageUrl}
                                                    alt={balance.token.metadata.symbol || "token"}
                                                    className="w-6 h-6 rounded-full mr-3"
                                                />
                                            )}
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {balance.amount}{" "}
                                                    {balance.token.metadata?.symbol || balance.token.caip19Id}
                                                </p>
                                                {balance.token.metadata?.name && (
                                                    <p className="text-xs text-gray-500">
                                                        {balance.token.metadata.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400 italic">No balances found</p>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

function vaultAccountToChainsAndAddress(vaultAccount: ZeraVaultAccount): Record<string, Chain[]> {
    if (vaultAccount.type !== "seed-derivation") {
        return {};
    }

    const chainsByAddress: Record<string, Chain[]> = {};

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
