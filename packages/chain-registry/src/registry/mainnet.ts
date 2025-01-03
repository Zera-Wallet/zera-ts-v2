import { ChainRegistry } from "@/types/ChainRegistry";

export const MAINNET_CHAIN_REGISTRY: ChainRegistry = [
    {
        bip44CoinType: 501,
        caip2ChainId: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
        isMainnet: true,
        name: "Solana",
    },
    {
        bip44CoinType: 60,
        caip2ChainId: "eip155:1",
        isMainnet: true,
        name: "Ethereum",
    },
    {
        bip44CoinType: 60,
        caip2ChainId: "eip155:8453",
        isMainnet: true,
        name: "Base",
    },
];
