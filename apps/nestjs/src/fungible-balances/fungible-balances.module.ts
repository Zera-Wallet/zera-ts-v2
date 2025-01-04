import { Module } from "@nestjs/common";
import { FungibleBalancesController } from "./fungible-balances.controller";
import { FungibleBalancesService } from "./fungible-balances.service";

@Module({
    controllers: [FungibleBalancesController],
    providers: [FungibleBalancesService],
})
export class FungibleBalancesModule {}
