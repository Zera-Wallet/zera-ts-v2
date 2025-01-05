import { BadRequestException, Inject, Injectable, Logger } from "@nestjs/common";
import { CoinGeckoClient, PLATFORMS } from "coingecko-api-v3";

export const TOKEN_PRICE_PROVIDER = "TOKEN_PRICE_PROVIDER";

export interface TokenPriceResponse {
    currentPrice: number;
    priceChange24h: number;
}

export interface TokenPriceProvider {
    getTokenPrice(caip19Id: string): Promise<TokenPriceResponse>;
}

@Injectable()
export class CoinGeckoPriceProvider implements TokenPriceProvider {
    private readonly logger = new Logger(CoinGeckoPriceProvider.name);
    private readonly coinGeckoClient: CoinGeckoClient;
    private readonly priceCache = new Map<string, { data: TokenPriceResponse; timestamp: number }>();
    private readonly CACHE_TTL = 60 * 1000; // 1 minute
    private readonly REQUEST_TIMEOUT = 10000; // 10 seconds

    constructor() {
        this.coinGeckoClient = new CoinGeckoClient({
            timeout: 10000,
            autoRetry: true,
        });
    }

    async getTokenPrice(caip19Id: string): Promise<TokenPriceResponse> {
        try {
            // Check cache first
            const cached = this.priceCache.get(caip19Id);
            if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
                return cached.data;
            }

            // Parse CAIP-19 ID format: chain:address
            const [caip2, caip19AssetDetails] = caip19Id.split("/");
            const [namespace, reference] = caip2.split(":");
            const [assetNamespace, assetReference] = caip19AssetDetails.split(":");

            // Map chain to CoinGecko platform ID
            const platform = this.mapChainToPlatform(namespace);
            if (!platform) {
                throw new Error(`Unsupported namespace: ${namespace}`);
            }

            // Create a promise that rejects after timeout
            // const timeoutPromise = new Promise<never>((_, reject) => {
            //     setTimeout(() => reject(new Error("Request timeout")), this.REQUEST_TIMEOUT);
            // });

            // throw new BadRequestException({
            //     message: "test",
            //     id: platform,
            //     contract_address: assetReference,
            // });

            // // Get token data from CoinGecko with timeout
            const result = await this.coinGeckoClient.contract({
                id: platform,
                contract_address: assetReference,
            });

            console.log("cg result", result);

            // // Race between the fetch and timeout
            // const response = await Promise.race([fetchPromise, timeoutPromise]);

            // if (!response) {
            //     throw new Error(`No price data found for token: ${assetReference}`);
            // }

            const priceData = {
                currentPrice: result.market_data?.current_price?.usd || 0,
                priceChange24h: result.market_data?.price_change_percentage_24h || 0,
            };

            // Cache the result
            this.priceCache.set(caip19Id, {
                data: priceData,
                timestamp: Date.now(),
            });

            return priceData;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            this.logger.error(
                `Failed to fetch token price for ${caip19Id}: ${errorMessage}`,
                error instanceof Error ? error.stack : undefined,
            );

            // Return cached data even if expired
            const cached = this.priceCache.get(caip19Id);
            if (cached) {
                this.logger.log(`Returning stale cache for ${caip19Id}`);
                return cached.data;
            }

            return {
                currentPrice: 0,
                priceChange24h: 0,
            };
        }
    }

    private mapChainToPlatform(chain: string): PLATFORMS | null {
        const chainMapping: Record<string, PLATFORMS> = {
            eip155: "ethereum",
            solana: "solana",
        };

        return chainMapping[chain] || null;
    }
}

@Injectable()
export class TokenPriceService {
    constructor(@Inject(TOKEN_PRICE_PROVIDER) private readonly priceProvider: TokenPriceProvider) {}

    async getTokenPrice(caip19Id: string): Promise<TokenPriceResponse> {
        return this.priceProvider.getTokenPrice(caip19Id);
    }
}
