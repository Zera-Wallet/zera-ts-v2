export abstract class BalancesService {
    abstract getBalances(address: string): any[];
}

type Balance = {
    caip2ChainId: string;
    balance: number;
};

class SolanaBalanceService extends BalancesService {
    getBalances(address: string) {
        return [];
    }
}
3;
