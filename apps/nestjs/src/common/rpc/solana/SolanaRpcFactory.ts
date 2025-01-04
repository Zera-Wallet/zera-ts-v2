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
                return "https://api.mainnet-beta.solana.com";
            case this.DEVNET_REFERENCE:
                return "https://mainnet.helius-rpc.com/?api-key=73717bb7-3fa1-49f3-8052-f260134d8680";
            // return "https://crossmin-mainbb2-4685.mainnet.rpcpool.com/4a3b32fb-d3f0-4dda-a668-0507156d139c";
            // return "https://crossmin-devd808-5202.devnet.rpcpool.com/9f1d5d54-30a5-4077-ab13-dbba62a6a40a";
            default:
                throw new Error(`Unsupported reference: ${reference}`);
        }
    }
}
