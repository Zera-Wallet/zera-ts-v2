import { Module } from "@nestjs/common";
import { TokenMetadataService } from "./metadata/token-metadata.service";
import { CoinGeckoPriceProvider, TOKEN_PRICE_PROVIDER, TokenPriceService } from "./price/token-price.service";
import { TokenController } from "./token.controller";
import { TokenService } from "./token.service";

@Module({
    imports: [],
    controllers: [TokenController],
    providers: [
        TokenService,
        TokenMetadataService,
        TokenPriceService,
        {
            provide: TOKEN_PRICE_PROVIDER,
            useClass: CoinGeckoPriceProvider,
        },
    ],
    exports: [TokenService],
})
export class TokenModule {}
