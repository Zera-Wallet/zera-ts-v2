import { BadRequestException } from "@nestjs/common";
import {
    Account,
    addCodecSizePrefix,
    address,
    assertAccountDecoded,
    assertAccountExists,
    decodeAccount,
    fetchEncodedAccount,
    fetchJsonParsedAccount,
    getAddressCodec,
    getAddressEncoder,
    getEnumCodec,
    getProgramDerivedAddress,
    getStructDecoder,
    getStructEncoder,
    getU32Codec,
    getUtf8Codec,
} from "@solana/web3.js";
import { Chain } from "@zera-ts/chain-registry";
import { SolanaRpcFactory } from "src/common/rpc/solana/SolanaRpcFactory";

export class FungibleBalancesService {
    async getFungibleBalances(chain: Chain, address: string) {
        const [namespace, reference] = chain.caip2ChainId.split(":");
        switch (namespace) {
            case "solana":
                return new SolanaFungibleBalancesService(reference).getFungibleBalances(address);
            default:
                throw new BadRequestException(`Unsupported chain: ${chain.caip2ChainId}`);
        }
    }
}

const TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
const TOKEN_2022_PROGRAM_ID = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";

export class SolanaFungibleBalancesService {
    constructor(
        private readonly reference: string,
        private readonly solanaRpcFactory: SolanaRpcFactory = new SolanaRpcFactory(),
    ) {}

    async getFungibleBalances(address: string) {
        const balancesMatrix = await Promise.all(
            [TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID].map(async (programId) => {
                const accounts = await this.getParsedTokenAccountsByOwner(address, programId);
                return await Promise.all(accounts.value.map((account) => this.transformParsedTokenAccount(account)));
            }),
        );

        let balances = balancesMatrix.flat();
        balances.sort((a, b) => Number(b.amount) - Number(a.amount));
        //filter where decimals is 0, or amount is 0
        balances = balances.filter((balance) => balance.token.decimals !== 0 && Number(balance.amount) !== 0);
        return balances;
    }

    async getParsedTokenAccountsByOwner(ownerAddress: string, programId: string) {
        const { rpc } = this.solanaRpcFactory.get(this.reference);
        return await rpc
            .getTokenAccountsByOwner(
                address("maxfQWBno84Zfu4sXgmjYvsvLn4LzGFSgSkFMFuzved"),
                {
                    programId: address(programId),
                },
                {
                    encoding: "jsonParsed",
                },
            )
            .send();
    }

    async transformParsedTokenAccount(
        parsedTokenAccount: Awaited<ReturnType<typeof this.getParsedTokenAccountsByOwner>>["value"][number],
    ) {
        return {
            amount: parsedTokenAccount.account.data.parsed.info.tokenAmount.uiAmountString,
            token: {
                caip19Id: `solana:${this.reference}/token:${parsedTokenAccount.account.data.parsed.info.mint}` as const,
                decimals: parsedTokenAccount.account.data.parsed.info.tokenAmount.decimals,
            },
        };
    }
}
