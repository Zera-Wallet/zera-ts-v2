import { cutMiddleAndAddEllipsis } from "@/utils/strings/cutMiddleAndAddEllipsis";
import { useEffect } from "react";
import { useState } from "react";
import { TokenBalanceProps, TokenMetadata } from "./types";

export function TokenBalance({ balance: { token, amount } }: TokenBalanceProps) {
    const { tokenMetadata, isLoading } = useTokenMetadata(token.caip19Id);

    return (
        <div className="flex items-center p-3">
            {/* {isLoading ? (
                <div className="w-6 h-6 rounded-full mr-3 bg-gray-200 animate-pulse" />
            ) : (
                tokenMetadata?.imageUrl && (
                    <img
                        src={tokenMetadata.imageUrl}
                        alt={tokenMetadata.name || tokenMetadata.symbol || "Unknown Token"}
                        className="w-6 h-6 rounded-full mr-3"
                    />
                )
            )} */}
            <TokenImage tokenMetadata={tokenMetadata} isLoading={isLoading} caip19Id={token.caip19Id} />
            <div>
                {/* <p className="text-sm font-medium">
                    {amount}{" "}
                    {isLoading ? (
                        <span className="inline-block w-16 h-4 bg-gray-200 animate-pulse rounded" />
                    ) : (
                        tokenMetadata?.symbol || token.caip19Id.split(":")[2]
                    )}
                </p> */}
                {/* {(isLoading || tokenMetadata?.name) && (
                    <p className="text-xs text-gray-500">
                        {isLoading ? (
                            <span className="inline-block w-24 h-3 bg-gray-200 animate-pulse rounded" />
                        ) : (
                            tokenMetadata?.name
                        )}
                    </p>
                )} */}
                {isLoading ? (
                    <span className="inline-block w-24 h-3 bg-gray-200 animate-pulse rounded" />
                ) : (
                    <p className="text-sm font-medium">{tokenMetadata?.name || "Unknown Token"}</p>
                )}
                <div className="flex items-center">
                    <p className="text-sm font-medium mr-2">{amount}</p>
                    {isLoading ? (
                        <span className="inline-block w-16 h-3 bg-gray-200 animate-pulse rounded" />
                    ) : (
                        <p className="text-sm font-medium">
                            {tokenMetadata?.symbol || cutMiddleAndAddEllipsis(token.caip19Id.split(":")[2], 3, 3)}
                        </p>
                    )}
                </div>
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
        return <div className="w-6 h-6 rounded-full mr-3 bg-gray-200 animate-pulse" />;
    }
    if (!tokenMetadata?.imageUrl) {
        return (
            <div className="w-6 h-6 rounded-full mr-3 bg-gray-400 flex items-center justify-center">
                <p className="text-[10px] tracking-tight text-gray-500">
                    {tokenMetadata?.symbol?.slice(0, 4) ||
                        tokenMetadata?.name?.slice(0, 4) ||
                        caip19Id.split(":")[2].slice(0, 3)}
                </p>
            </div>
        );
    }
    return (
        <img
            src={tokenMetadata.imageUrl}
            alt={tokenMetadata.name || tokenMetadata.symbol || "Unknown Token"}
            className="w-6 h-6 rounded-full mr-3"
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
