import { SolanaRpcFactory } from "./solana/SolanaRpcFactory";

export class RpcFactory {
    constructor(private readonly solanaRpcFactory: SolanaRpcFactory = new SolanaRpcFactory()) {}

    fromCaip2ChainId(caip2ChainId: string) {
        const [namespace, reference] = caip2ChainId.split(":");

        switch (namespace) {
            case "solana":
                return this.solanaRpcFactory.get(reference);
            default:
                throw new Error(`Unsupported namespace: ${namespace}`);
        }
    }
}
