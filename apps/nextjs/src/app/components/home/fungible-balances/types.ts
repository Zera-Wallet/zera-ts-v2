import { Chain } from "@zera-ts/chain-registry";

export type ChainId = string;
export type Address = string;
export type Amount = string;

export type TokenMetadata = {
    name?: string;
    symbol?: string;
    imageUrl?: string;
};

export type FungibleToken = {
    caip19Id: `${string}:${string}/${string}:${string}`;
    decimals: number;
};

export interface Balance {
    amount: Amount;
    token: FungibleToken;
}

export type AddressBalances = Record<ChainId, Balance[]>;
export type AllBalances = Record<Address, AddressBalances>;

export interface TokenBalanceProps {
    balance: Balance;
}

export interface ChainBalancesProps {
    chainId: ChainId;
    balanceList: Balance[];
}

export interface AddressBalancesSectionProps {
    address: Address;
    chainBalances: AddressBalances;
}
