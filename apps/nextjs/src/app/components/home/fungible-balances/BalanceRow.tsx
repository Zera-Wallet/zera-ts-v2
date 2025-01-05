import { TableCell } from "@/components/ui/table";
import { cutMiddleAndAddEllipsis } from "@/utils/strings/cutMiddleAndAddEllipsis";
import { useEffect, useState } from "react";
import { TokenEstimatedValue } from "./TokenEstimatedValue";
import { Balance, TokenMetadata } from "./types";

export function BalanceRow({ balance }: { balance: Balance }) {
    const { tokenMetadata, isLoading } = useTokenMetadata(balance.token.caip19Id);
    const formattedAmount = Number(balance.amount) / 10 ** balance.token.decimals;

    return (
        <>
            <TableCell>
                <div className="flex items-center gap-x-2">
                    <TokenImage tokenMetadata={tokenMetadata} isLoading={isLoading} caip19Id={balance.token.caip19Id} />
                    {isLoading ? (
                        <span className="inline-block w-24 h-3 bg-gray-200 animate-pulse rounded" />
                    ) : (
                        <div className="text-xs font-medium text-foreground flex items-center">
                            <span>{tokenMetadata?.name || "Unknown Token"}</span>
                            <span className="text-muted-foreground ml-1">
                                {tokenMetadata?.symbol ||
                                    cutMiddleAndAddEllipsis(balance.token.caip19Id.split(":")[2], 3, 3)}
                            </span>
                        </div>
                    )}
                </div>
            </TableCell>
            <TableCell className="text-right text-xs font-medium">
                {formattedAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: Math.min(balance.token.decimals, 8), // Cap at 8 decimal places for readability
                })}
            </TableCell>
            <TableCell className="text-right text-muted-foreground text-xs font-medium">
                <TokenEstimatedValue amount={balance.amount} token={balance.token} />
            </TableCell>
        </>
    );
}

function TokenImage({
    tokenMetadata,
    isLoading,
    caip19Id,
}: {
    tokenMetadata: TokenMetadata | null;
    isLoading: boolean;
    caip19Id: string;
}) {
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

function useTokenMetadata(caip19Id: string) {
    const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTokenMetadata = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/token/${encodeURIComponent(caip19Id)}/metadata`);
                const data = await response.json();
                setTokenMetadata(data);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTokenMetadata();
    }, [caip19Id]);

    return { tokenMetadata, isLoading };
}
