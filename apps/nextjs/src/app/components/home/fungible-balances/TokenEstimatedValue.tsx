import { useTokenPrice } from "@/app/hooks/useTokenPrice";
import { FungibleToken } from "./types";

interface TokenEstimatedValueProps {
    amount: string;
    token: FungibleToken;
}

export function TokenEstimatedValue({ amount, token }: TokenEstimatedValueProps) {
    const { data: tokenPrice, isLoading } = useTokenPrice(token.caip19Id);

    const estimatedValue =
        tokenPrice?.currentPrice != null ? (Number(amount) / 10 ** token.decimals) * tokenPrice.currentPrice : null;

    if (isLoading) {
        return <span className="inline-block w-16 h-3 bg-gray-200 animate-pulse rounded" />;
    }

    if (!estimatedValue) {
        return "-";
    }

    return (
        <div className="flex items-center justify-end gap-x-1">
            <span>
                $
                {estimatedValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </span>
            {tokenPrice?.priceChange24h && (
                <span className={tokenPrice.priceChange24h >= 0 ? "text-green-500" : "text-red-500"}>
                    {tokenPrice.priceChange24h >= 0 ? "+" : ""}
                    {tokenPrice.priceChange24h.toFixed(1)}%
                </span>
            )}
        </div>
    );
}
