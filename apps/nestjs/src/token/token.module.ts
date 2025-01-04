import { Module } from "@nestjs/common";
import { TokenMetadataService } from "./metadata/token-metadata.service";
import { TokenController } from "./token.controller";
import { TokenService } from "./token.service";

@Module({
    imports: [],
    controllers: [TokenController],
    providers: [TokenService, TokenMetadataService],
    exports: [TokenService],
})
export class TokenModule {}
