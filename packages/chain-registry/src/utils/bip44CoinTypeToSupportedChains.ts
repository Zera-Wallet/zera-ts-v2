import { ChainRegistry } from "@/types";

export function bip44CoinTypeToSupportedChains(bip44CoinType: number, chainRegistry: ChainRegistry) {
    return chainRegistry.filter((chain) => chain.bip44CoinType === bip44CoinType);
}
