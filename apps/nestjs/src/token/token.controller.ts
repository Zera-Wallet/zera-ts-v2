import { CacheInterceptor } from "@nestjs/cache-manager";
import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { TokenMetadataService } from "./metadata/token-metadata.service";
import { TokenService } from "./token.service";

@Controller("token")
@UseInterceptors(CacheInterceptor)
export class TokenController {
    constructor(
        private readonly tokenService: TokenService,
        private readonly tokenMetadataService: TokenMetadataService,
    ) {}

    @Get("/:caip19Id/metadata")
    getTokenMetadata(@Param("caip19Id") caip19Id: string) {
        return this.tokenMetadataService.getTokenMetadata(caip19Id);
    }
}
