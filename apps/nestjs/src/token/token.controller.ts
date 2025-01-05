import { CacheInterceptor } from "@nestjs/cache-manager";
import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { TokenMetadataService } from "./metadata/token-metadata.service";
import { TokenPriceService } from "./price/token-price.service";
import { TokenService } from "./token.service";

@Controller("token")
@UseInterceptors(CacheInterceptor)
export class TokenController {
    constructor(
        private readonly tokenService: TokenService,
        private readonly tokenMetadataService: TokenMetadataService,
        private readonly tokenPriceService: TokenPriceService,
    ) {}

    @Get("/:caip19Id/metadata")
    getTokenMetadata(@Param("caip19Id") caip19Id: string) {
        return this.tokenMetadataService.getTokenMetadata(caip19Id);
    }

    @Get("/:caip19Id/price")
    getTokenPrice(@Param("caip19Id") caip19Id: string) {
        return this.tokenPriceService.getTokenPrice(caip19Id);
    }
}
