import { Controller, Get, Query } from "@nestjs/common";
import { Chain } from "@zera-ts/chain-registry";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { FungibleBalancesService } from "./fungible-balances.service";

const chainSchema = z.object({
    bip44CoinType: z.number(),
    caip2ChainId: z.string(),
    isMainnet: z.boolean(),
    name: z.string(),
});

const QuerySchema = z.object({
    address: z.string(),
    chain: z.string().transform((str) => {
        try {
            const parsed = JSON.parse(str);
            return chainSchema.parse(parsed);
        } catch (e) {
            if (e instanceof z.ZodError) {
                throw e;
            }
            throw new Error("Invalid chain JSON");
        }
    }),
});

class QueryDto extends createZodDto(QuerySchema) {}

type FungibleToken = {
    caip19Id: `${string}:${string}/${string}:${string}`;
    decimals: number;
    metadata?: { name?: string; symbol?: string; imageUrl?: string };
};

interface Balance {
    amount: string;
    token: FungibleToken;
}

@Controller("fungible-balances")
export class FungibleBalancesController {
    constructor(private readonly fungibleBalancesService: FungibleBalancesService = new FungibleBalancesService()) {}

    @Get()
    async getFungibleBalances(@Query() query: QueryDto): Promise<{ balances: Balance[] }> {
        console.log(query.chain); // Will now be a properly parsed object

        const balances = await this.fungibleBalancesService.getFungibleBalances(query.chain as Chain, query.address);
        return { balances };
        // return {
        //     balances: [
        //         { amount: "1000000", denom: "uatom" },
        //         { amount: "2000000", denom: "uosmo" },
        //     ],
        // };
    }
}
