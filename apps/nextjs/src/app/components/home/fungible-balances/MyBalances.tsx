import { useZeraKeyring } from "@/components/Zera/hooks/useZeraKeyring";
import { Loader } from "@/components/ui/loader";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { BalanceRow } from "./BalanceRow";
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
            <Table>
                <TableHeader className="[&_tr]:border-0">
                    <TableRow className="text-[10px] hover:bg-transparent">
                        <TableHead className="h-6">Asset</TableHead>
                        <TableHead className="h-6 text-right">Balance</TableHead>
                        <TableHead className="h-6 text-right">Estimated Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.entries(balances).map(([address, chainBalances]) =>
                        Object.entries(chainBalances).map(([chainId, balanceList]) =>
                            balanceList.map((balance) => (
                                <TableRow
                                    key={`${address}-${chainId}-${balance.token.caip19Id}`}
                                    className="border-0 hover:bg-muted/50"
                                >
                                    <BalanceRow balance={balance} />
                                </TableRow>
                            )),
                        ),
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
