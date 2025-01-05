import { getDefaultResponseTransformerForSolanaRpc } from "@solana/rpc-transformers";
import {
    DEFAULT_RPC_CONFIG,
    RpcApi,
    RpcApiConfig,
    RpcPlan,
    SolanaRpcApiMainnet,
    createDefaultRpcTransport,
    createJsonRpcApi,
    createRpc,
    createRpcMessage,
    createSolanaRpcApi,
} from "@solana/web3.js";
import { DasRpcMethods } from "./types/das/DasRpcMethods";

export class SolanaRpcFactory {
    private readonly MAINNET_REFERENCE = "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp";
    private readonly DEVNET_REFERENCE = "EtWTRABZaYq6iMfeYKouRu166VU2xqa1";

    get(reference: string) {
        const solanaRpcApi = createSolanaRpcApi<SolanaRpcApiMainnet>(DEFAULT_RPC_CONFIG);

        const dasRpcApi = createJsonRpcApi<DasRpcMethods>({
            requestTransformer: (request) => {
                const newRequest = {
                    ...request,
                    params: request.params[0],
                };
                return newRequest;
            },
            responseTransformer: getDefaultResponseTransformerForSolanaRpc(),
        });

        const transport = createDefaultRpcTransport({ url: this.getUrl(reference) });
        return {
            rpc: createRpc({
                transport,
                api: solanaRpcApi,
            }),
            das: createRpc({
                transport,
                api: dasRpcApi,
            }),
        };
    }

    private getUrl(reference: string) {
        console.log("reference", reference);
        switch (reference) {
            case this.MAINNET_REFERENCE:
                return process.env.SOLANA_MAINNET_RPC_URL;
            case this.DEVNET_REFERENCE:
                return process.env.SOLANA_DEVNET_RPC_URL;
            default:
                throw new Error(`Unsupported reference: ${reference}`);
        }
    }
}
