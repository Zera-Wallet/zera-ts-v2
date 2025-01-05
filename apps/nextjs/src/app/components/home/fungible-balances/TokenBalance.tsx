import { cutMiddleAndAddEllipsis } from "@/utils/strings/cutMiddleAndAddEllipsis";
import { useQuery } from "@tanstack/react-query";
import { TokenEstimatedValue } from "./TokenEstimatedValue";
import { TokenBalanceProps, TokenMetadata } from "./types";

export function TokenBalance({ balance: { token, amount } }: TokenBalanceProps) {
    const { data: tokenMetadata, isLoading: isLoadingMetadata } = useTokenMetadata(token.caip19Id);

    return (
        <div className="flex items-center justify-between gap-x-2">
            <div className="flex items-center gap-x-2">
                <TokenImage
                    tokenMetadata={tokenMetadata ?? null}
                    isLoading={isLoadingMetadata}
                    caip19Id={token.caip19Id}
                />
                {isLoadingMetadata ? (
                    <span className="inline-block w-24 h-3 bg-gray-200 animate-pulse rounded" />
                ) : (
                    <div className="text-xs font-medium text-foreground">
                        <span>{tokenMetadata?.name || "Unknown Token"}</span>
                        <span className="text-muted-foreground ml-1">
                            {tokenMetadata?.symbol || cutMiddleAndAddEllipsis(token.caip19Id.split(":")[2], 3, 3)}
                        </span>
                    </div>
                )}
            </div>
            <div className="flex flex-col items-end">
                <div className="text-xs font-medium">
                    {(Number(amount) / 10 ** token.decimals).toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </div>
                <TokenEstimatedValue amount={amount} token={token} />
            </div>
        </div>
    );
}

function TokenImage({
    tokenMetadata,
    isLoading,
    caip19Id,
}: { tokenMetadata: TokenMetadata | null; isLoading: boolean; caip19Id: string }) {
    if (isLoading) {
        return <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />;
    }
    if (!tokenMetadata?.imageUrl) {
        return (
            <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center">
                <p className="text-[10px] tracking-tight font-medium text-gray-500">
                    {tokenMetadata?.symbol?.slice(0, 3) ||
                        tokenMetadata?.name?.slice(0, 3) ||
                        caip19Id.split(":")[2].slice(0, 3)}
                </p>
            </div>
        );
    }
    return (
        <img
            src={tokenMetadata.imageUrl}
            alt={tokenMetadata.name || tokenMetadata.symbol || "Unknown Token"}
            className="w-6 h-6 rounded-full bg-gray-200"
        />
    );
}

async function fetchTokenMetadata(caip19Id: string): Promise<TokenMetadata> {
    const response = await fetch(`/api/token/${encodeURIComponent(caip19Id)}/metadata`);
    if (!response.ok) {
        throw new Error("Failed to fetch token metadata");
    }
    return response.json();
}

function useTokenMetadata(caip19Id: string) {
    return useQuery({
        queryKey: ["tokenMetadata", caip19Id],
        queryFn: () => fetchTokenMetadata(caip19Id),
        staleTime: 1000 * 60 * 60, // Consider data stale after 1 hour
    });
}
