import { ChainBalances } from "./ChainBalances";
import { AddressBalancesSectionProps } from "./types";

export function AddressBalancesSection({ address, chainBalances }: AddressBalancesSectionProps) {
    return (
        <div className="mb-6 rounded-lg p-4">
            <p className="text-xs mb-3 font-mono">{address}</p>
            {Object.entries(chainBalances).map(([chainId, balanceList]) => (
                <ChainBalances key={chainId} chainId={chainId} balanceList={balanceList} />
            ))}
        </div>
    );
}
