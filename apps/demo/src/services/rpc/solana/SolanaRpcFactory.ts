import {
    DEFAULT_RPC_CONFIG,
    SolanaRpcApiMainnet,
    createDefaultRpcTransport,
    createRpc,
    createSolanaRpcApi,
} from "@solana/web3.js";
import { DasRpcMethods } from "./types/das/DasRpcMethods";

export class SolanaRpcFactory {
    get() {
        const api = createSolanaRpcApi<SolanaRpcApiMainnet & DasRpcMethods>(DEFAULT_RPC_CONFIG);
        const transport = createDefaultRpcTransport({ url: "https://api.mainnet-beta.solana.com" });
        return createRpc({
            transport,
            api,
        });
    }
}
