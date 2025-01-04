import { BadRequestException } from "@nestjs/common";
import {
    Account,
    addCodecSizePrefix,
    address,
    assertAccountDecoded,
    assertAccountExists,
    decodeAccount,
    fetchEncodedAccount,
    fetchJsonParsedAccount,
    getAddressCodec,
    getAddressEncoder,
    getEnumCodec,
    getProgramDerivedAddress,
    getStructDecoder,
    getU32Codec,
    getUtf8Codec,
} from "@solana/web3.js";
import { SolanaRpcFactory } from "src/common/rpc/solana/SolanaRpcFactory";

export class TokenMetadataService {
    async getTokenMetadata(caip19Id: string) {
        const [caip2, caip19AssetDetails] = caip19Id.split("/");
        const [namespace, reference] = caip2.split(":");
        const [assetNamespace, assetReference] = caip19AssetDetails.split(":");

        switch (namespace) {
            case "solana":
                return new SolanaTokenMetadataService(reference).getTokenMetadata(assetReference);
            default:
                throw new BadRequestException(`Unsupported caip19Id: ${caip19Id}`);
        }
    }
}

const TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
const TOKEN_2022_PROGRAM_ID = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
const MPL_METADATA_PROGRAM_ID = address("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

class SolanaTokenMetadataService {
    constructor(
        private readonly reference: string,
        private readonly solanaRpcFactory: SolanaRpcFactory = new SolanaRpcFactory(),
    ) {}

    async getTokenMetadata(mintAddress: string) {
        try {
            return new DasTokenMetadataService(this.reference, this.solanaRpcFactory).getTokenMetadata(mintAddress);
        } catch (error) {
            console.error("Error fetching token metadata from Das", {
                mintAddress,
                error: error instanceof Error ? error.message : error,
            });
        }

        const { rpc } = this.solanaRpcFactory.get(this.reference);
        const mintAccount = await rpc
            .getAccountInfo(address(mintAddress), {
                encoding: "jsonParsed",
            })
            .send();
        const tokenProgramId = mintAccount.value.owner;
        return this.getTokenMetadataByTokenProgramId(mintAddress, tokenProgramId);
    }

    async getTokenMetadataByTokenProgramId(mintAddress: string, tokenProgramId: string) {
        switch (tokenProgramId) {
            case TOKEN_PROGRAM_ID:
                return new SolanaTokenProgramMetadataService(this.reference, this.solanaRpcFactory).getTokenMetadata(
                    mintAddress,
                );
            case TOKEN_2022_PROGRAM_ID:
                return new SolanaToken2022MetadataService(this.reference, this.solanaRpcFactory).getTokenMetadata(
                    mintAddress,
                );
            default:
                throw new BadRequestException(`Unsupported token program id: ${tokenProgramId}`);
        }
    }
}

class DasTokenMetadataService {
    constructor(
        private readonly reference: string,
        private readonly solanaRpcFactory: SolanaRpcFactory = new SolanaRpcFactory(),
    ) {}

    async getTokenMetadata(mintAddress: string) {
        const { das } = this.solanaRpcFactory.get(this.reference);
        const getAssetResponse = await das
            .getAsset({
                id: mintAddress,
                displayOptions: {
                    showFungible: true,
                },
            })
            .send();
        console.log("fromDas", getAssetResponse);
        return {
            name: getAssetResponse.content?.metadata?.name,
            symbol: getAssetResponse.content?.metadata?.symbol,
            imageUrl: getAssetResponse.content?.links?.image,
        };
    }
}

class SolanaToken2022MetadataService {
    constructor(
        private readonly reference: string,
        private readonly solanaRpcFactory: SolanaRpcFactory = new SolanaRpcFactory(),
    ) {}

    async getTokenMetadata(mintAddress: string) {
        const { rpc } = this.solanaRpcFactory.get(this.reference);
        // const mintAccount = await rpc.getAccountInfo(address(mintAddress), { encoding: "jsonParsed" }).send();

        const mintAccount = await fetchJsonParsedAccount<
            {
                extensions: {
                    extension: "tokenMetadata";
                    state: {
                        name?: string;
                        symbol?: string;
                        uri?: string;
                    };
                }[];
            },
            string
        >(rpc, address(mintAddress));

        assertAccountDecoded(mintAccount);
        assertAccountExists(mintAccount);

        console.log("mintAccount", mintAccount);
        console.log("mintAccount.data", mintAccount.data.extensions);

        const tokenMetadataExtension = mintAccount.data.extensions.find(
            (extension) => extension.extension === "tokenMetadata",
        );

        if (!tokenMetadataExtension) {
            throw new BadRequestException("Token metadata extension not found");
        }

        if (!tokenMetadataExtension.state.uri) {
            return {
                name: tokenMetadataExtension.state.name,
                symbol: tokenMetadataExtension.state.symbol,
                imageUrl: undefined,
            };
        }

        let metadataFromUri: { name?: string; symbol?: string; imageUrl?: string } | undefined = undefined;
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
            const response = await fetch(tokenMetadataExtension.state.uri, {
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            const _metadataFromUri = await response.json();
            metadataFromUri = {
                name: _metadataFromUri.name,
                symbol: _metadataFromUri.symbol,
                imageUrl: _metadataFromUri.image,
            };
        } catch (error) {
            console.error("Error fetching metadata from URI", {
                uri: tokenMetadataExtension.state.uri,
                error: error instanceof Error ? error.message : error,
            });
        }

        return {
            name: metadataFromUri?.name || tokenMetadataExtension.state.name,
            symbol: metadataFromUri?.symbol || tokenMetadataExtension.state.symbol,
            imageUrl: metadataFromUri?.imageUrl,
        };
    }
}

class SolanaTokenProgramMetadataService {
    constructor(
        private readonly reference: string,
        private readonly solanaRpcFactory: SolanaRpcFactory = new SolanaRpcFactory(),
    ) {}

    async getTokenMetadata(mintAddress: string) {
        const { rpc } = this.solanaRpcFactory.get(this.reference);

        const [pdaAddress, _] = await this.deriveMplMetadataPda(mintAddress);

        let encodedAccount: (Awaited<ReturnType<typeof fetchEncodedAccount>> & { exists: true }) | undefined =
            undefined;
        try {
            const _encodedAccount = await fetchEncodedAccount(rpc, pdaAddress);
            assertAccountExists(_encodedAccount);
            encodedAccount = _encodedAccount;
        } catch (error) {
            console.error("Error fetching metadata account for token mint", {
                mint: mintAddress,
                program: TOKEN_PROGRAM_ID,
                pdaAddress,
                error: error instanceof Error ? error.message : error,
            });
            return undefined;
        }

        let decodedAccount:
            | Account<{
                  key: MetadataKey;
                  updateAuthority: string;
                  mint: string;
                  name: string;
                  symbol: string;
                  uri: string;
              }>
            | undefined = undefined;
        try {
            const _decodedAccount = await this.decodeMplMetadataAccount(encodedAccount);
            assertAccountDecoded(_decodedAccount);
            assertAccountExists(_decodedAccount);
            decodedAccount = _decodedAccount;
        } catch (error) {
            console.error("Error decoding metadata account for token mint", {
                mint: mintAddress,
                program: TOKEN_PROGRAM_ID,
                pdaAddress,
                error: error instanceof Error ? error.message : error,
            });
        }

        let metadataFromUri: { name?: string; symbol?: string; imageUrl?: string } | undefined = undefined;
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
            const response = await fetch(decodedAccount.data.uri, {
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            const _metadataFromUri = await response.json();
            metadataFromUri = {
                name: _metadataFromUri.name,
                symbol: _metadataFromUri.symbol,
                imageUrl: _metadataFromUri.image,
            };
        } catch (error) {
            console.error("Error fetching metadata from URI", {
                uri: decodedAccount.data.uri,
                error: error instanceof Error ? error.message : error,
            });
        }

        return {
            name: metadataFromUri?.name || decodedAccount.data.name,
            symbol: metadataFromUri?.symbol || decodedAccount.data.symbol,
            imageUrl: metadataFromUri?.imageUrl,
        };
    }

    async deriveMplMetadataPda(mintAddress: string) {
        const addressEncoder = getAddressEncoder();
        return await getProgramDerivedAddress({
            programAddress: MPL_METADATA_PROGRAM_ID,
            seeds: [
                Buffer.from("metadata"),
                addressEncoder.encode(MPL_METADATA_PROGRAM_ID),
                addressEncoder.encode(address(mintAddress)),
            ],
        });
    }

    async decodeMplMetadataAccount(encodedAccount: Awaited<ReturnType<typeof fetchEncodedAccount>>) {
        const mplTokenMetadataDecoder = getStructDecoder([
            ["key", getEnumCodec(MetadataKey)],
            ["updateAuthority", getAddressCodec()],
            ["mint", getAddressCodec()],
            ["name", addCodecSizePrefix(getUtf8Codec(), getU32Codec())],
            ["symbol", addCodecSizePrefix(getUtf8Codec(), getU32Codec())],
            ["uri", addCodecSizePrefix(getUtf8Codec(), getU32Codec())],
        ]);

        return decodeAccount(encodedAccount, mplTokenMetadataDecoder);
    }
}

// Copied from metaplex, needed so we can decode the metadata account
// biome-ignore lint/style/useEnumInitializers: <explanation>
enum MetadataKey {
    Uninitialized,
    EditionV1,
    MasterEditionV1,
    ReservationListV1,
    MetadataV1,
    ReservationListV2,
    MasterEditionV2,
    EditionMarker,
    UseAuthorityRecord,
    CollectionAuthorityRecord,
    TokenOwnedEscrow,
    TokenRecord,
    MetadataDelegate,
    EditionMarkerV2,
    HolderDelegate,
}
