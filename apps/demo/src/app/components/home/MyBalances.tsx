import { useZeraKeyring } from "@/components/Zera/hooks/useZeraKeyring";
import { Loader } from "@/components/ui/loader";

export function MyBalances() {
    const { selectedVaultAccount } = useZeraKeyring();

    if (!selectedVaultAccount) {
        return (
            <div className="px-5 py-5 overflow-hidden flex flex-col items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="px-5 py-5 overflow-hidden flex flex-col">
            <p className="font-medium text-sm">Balances</p>
        </div>
    );
}
