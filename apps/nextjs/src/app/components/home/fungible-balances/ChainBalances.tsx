import { TokenBalance } from "./TokenBalance";
import { ChainBalancesProps } from "./types";

export function ChainBalances({ chainId, balanceList }: ChainBalancesProps) {
    return (
        <div className="mb-4">
            <p className="text-sm font-medium mb-2">{chainId}</p>
            {(balanceList ?? []).length > 0 ? (
                <div className="space-y-2">
                    {balanceList.map((balance) => (
                        <TokenBalance key={balance.token.caip19Id} balance={balance} />
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-400 italic">No balances found</p>
            )}
        </div>
    );
}
