import { useZeraKeyring } from "@/components/Zera/hooks/useZeraKeyring";
import { Loader } from "@/components/ui/loader";
import { AddressBalancesSection } from "./AddressBalancesSection";
import { useBalances } from "./useBalances";

export function MyBalances() {
    const { selectedVaultAccount } = useZeraKeyring();
    const { balances, loading, error } = useBalances(selectedVaultAccount);

    if (!selectedVaultAccount || loading) {
        return (
            <div className="px-5 py-5 overflow-hidden flex flex-col items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (error && Object.keys(balances).length === 0) {
        return (
            <div className="px-5 py-5 overflow-hidden flex flex-col">
                <p className="text-red-500">Error loading balances: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="px-5 py-5 overflow-hidden flex flex-col">
            <h2 className="font-semibold text-lg mb-4">My Balances</h2>
            {Object.entries(balances).map(([address, chainBalances]) => (
                <AddressBalancesSection key={address} address={address} chainBalances={chainBalances} />
            ))}
        </div>
    );
}
