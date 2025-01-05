import { useQuery } from "@tanstack/react-query";

export interface TokenPrice {
    currentPrice: number;
    priceChange24h: number;
}

async function fetchTokenPrice(caip19Id: string): Promise<TokenPrice> {
    const response = await fetch(`/api/token/${encodeURIComponent(caip19Id)}/price`);
    if (!response.ok) {
        throw new Error("Failed to fetch token price");
    }
    return response.json();
}

export function useTokenPrice(caip19Id: string) {
    return useQuery({
        queryKey: ["tokenPrice", caip19Id],
        queryFn: () => fetchTokenPrice(caip19Id),
        staleTime: 1000 * 60, // Consider data stale after 1 minute
        refetchInterval: 1000 * 60, // Refetch every minute
    });
}
