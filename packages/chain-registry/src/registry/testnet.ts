import { ChainRegistry } from "@/types/ChainRegistry";

export const TESTNET_CHAIN_REGISTRY: ChainRegistry = [
    {
        bip44CoinType: 501,
        caip2ChainId: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
        isMainnet: false,
        name: "Solana Devnet",
    },
    {
        bip44CoinType: 60,
        caip2ChainId: "eip155:11155111",
        isMainnet: false,
        name: "Ethereum Sepolia",
    },
    {
        bip44CoinType: 60,
        caip2ChainId: "eip155:84532",
        isMainnet: false,
        name: "Base Sepolia",
    },
];
