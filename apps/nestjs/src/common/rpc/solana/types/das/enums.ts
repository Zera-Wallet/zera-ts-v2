export enum WebhookType {
    ENHANCED = "enhanced",
    RAW = "raw",
    DISCORD = "discord",
    ENHANCED_DEVNET = "enhancedDevnet",
    RAW_DEVNET = "rawDevnet",
    DISCORD_DEVNET = "discordDevnet",
}

export enum TxnStatus {
    ALL = "all",
    SUCCESS = "success",
    FAILED = "failed",
}

export enum AccountWebhookEncoding {
    JSON_PARSED = "jsonParsed",
}

export enum TransactionType {
    ANY = "ANY",
    UNKNOWN = "UNKNOWN",
    NFT_BID = "NFT_BID",
    NFT_GLOBAL_BID = "NFT_GLOBAL_BID",
    NFT_GLOBAL_BID_CANCELLED = "NFT_GLOBAL_BID_CANCELLED",
    NFT_BID_CANCELLED = "NFT_BID_CANCELLED",
    NFT_LISTING = "NFT_LISTING",
    NFT_CANCEL_LISTING = "NFT_CANCEL_LISTING",
    NFT_SALE = "NFT_SALE",
    NFT_MINT = "NFT_MINT",
    NFT_AUCTION_CREATED = "NFT_AUCTION_CREATED",
    NFT_AUCTION_UPDATED = "NFT_AUCTION_UPDATED",
    NFT_AUCTION_CANCELLED = "NFT_AUCTION_CANCELLED",
    NFT_PARTICIPATION_REWARD = "NFT_PARTICIPATION_REWARD",
    NFT_MINT_REJECTED = "NFT_MINT_REJECTED",
    CREATE_STORE = "CREATE_STORE",
    WHITELIST_CREATOR = "WHITELIST_CREATOR",
    ADD_TO_WHITELIST = "ADD_TO_WHITELIST",
    REMOVE_FROM_WHITELIST = "REMOVE_FROM_WHITELIST",
    AUCTION_MANAGER_CLAIM_BID = "AUCTION_MANAGER_CLAIM_BID",
    EMPTY_PAYMENT_ACCOUNT = "EMPTY_PAYMENT_ACCOUNT",
    UPDATE_PRIMARY_SALE_METADATA = "UPDATE_PRIMARY_SALE_METADATA",
    ADD_TOKEN_TO_VAULT = "ADD_TOKEN_TO_VAULT",
    ACTIVATE_VAULT = "ACTIVATE_VAULT",
    INIT_VAULT = "INIT_VAULT",
    INIT_BANK = "INIT_BANK",
    INIT_STAKE = "INIT_STAKE",
    MERGE_STAKE = "MERGE_STAKE",
    SPLIT_STAKE = "SPLIT_STAKE",
    SET_BANK_FLAGS = "SET_BANK_FLAGS",
    SET_VAULT_LOCK = "SET_VAULT_LOCK",
    UPDATE_VAULT_OWNER = "UPDATE_VAULT_OWNER",
    UPDATE_BANK_MANAGER = "UPDATE_BANK_MANAGER",
    RECORD_RARITY_POINTS = "RECORD_RARITY_POINTS",
    ADD_RARITIES_TO_BANK = "ADD_RARITIES_TO_BANK",
    INIT_FARM = "INIT_FARM",
    INIT_FARMER = "INIT_FARMER",
    REFRESH_FARMER = "REFRESH_FARMER",
    UPDATE_FARM = "UPDATE_FARM",
    AUTHORIZE_FUNDER = "AUTHORIZE_FUNDER",
    DEAUTHORIZE_FUNDER = "DEAUTHORIZE_FUNDER",
    FUND_REWARD = "FUND_REWARD",
    CANCEL_REWARD = "CANCEL_REWARD",
    LOCK_REWARD = "LOCK_REWARD",
    PAYOUT = "PAYOUT",
    VALIDATE_SAFETY_DEPOSIT_BOX_V2 = "VALIDATE_SAFETY_DEPOSIT_BOX_V2",
    SET_AUTHORITY = "SET_AUTHORITY",
    INIT_AUCTION_MANAGER_V2 = "INIT_AUCTION_MANAGER_V2",
    UPDATE_EXTERNAL_PRICE_ACCOUNT = "UPDATE_EXTERNAL_PRICE_ACCOUNT",
    AUCTION_HOUSE_CREATE = "AUCTION_HOUSE_CREATE",
    CLOSE_ESCROW_ACCOUNT = "CLOSE_ESCROW_ACCOUNT",
    WITHDRAW = "WITHDRAW",
    DEPOSIT = "DEPOSIT",
    TRANSFER = "TRANSFER",
    BURN = "BURN",
    BURN_NFT = "BURN_NFT",
    PLATFORM_FEE = "PLATFORM_FEE",
    LOAN = "LOAN",
    RESCIND_LOAN = "RESCIND_LOAN",
    OFFER_LOAN = "OFFER_LOAN",
    CANCEL_OFFER = "CANCEL_OFFER",
    LEND_FOR_NFT = "LEND_FOR_NFT",
    REQUEST_LOAN = "REQUEST_LOAN",
    CANCEL_LOAN_REQUEST = "CANCEL_LOAN_REQUEST",
    BORROW_SOL_FOR_NFT = "BORROW_SOL_FOR_NFT",
    CLAIM_NFT = "CLAIM_NFT",
    REBORROW_SOL_FOR_NFT = "REBORROW_SOL_FOR_NFT",
    REPAY_LOAN = "REPAY_LOAN",
    TAKE_LOAN = "TAKE_LOAN",
    FORECLOSE_LOAN = "FORECLOSE_LOAN",
    UPDATE_OFFER = "UPDATE_OFFER",
    ADD_TO_POOL = "ADD_TO_POOL",
    REMOVE_FROM_POOL = "REMOVE_FROM_POOL",
    CLOSE_POSITION = "CLOSE_POSITION",
    UNLABELED = "UNLABELED",
    CLOSE_ACCOUNT = "CLOSE_ACCOUNT",
    WITHDRAW_GEM = "WITHDRAW_GEM",
    DEPOSIT_GEM = "DEPOSIT_GEM",
    STAKE_TOKEN = "STAKE_TOKEN",
    UNSTAKE_TOKEN = "UNSTAKE_TOKEN",
    STAKE_SOL = "STAKE_SOL",
    UNSTAKE_SOL = "UNSTAKE_SOL",
    CLAIM_REWARDS = "CLAIM_REWARDS",
    BUY_SUBSCRIPTION = "BUY_SUBSCRIPTION",
    SWAP = "SWAP",
    INIT_SWAP = "INIT_SWAP",
    CANCEL_SWAP = "CANCEL_SWAP",
    REJECT_SWAP = "REJECT_SWAP",
    INITIALIZE_ACCOUNT = "INITIALIZE_ACCOUNT",
    TOKEN_MINT = "TOKEN_MINT",
    CREATE_APPRAISAL = "CREATE_APPRAISAL",
    CANDY_MACHINE_WRAP = "CANDY_MACHINE_WRAP",
    CANDY_MACHINE_UNWRAP = "CANDY_MACHINE_UNWRAP",
    CANDY_MACHINE_UPDATE = "CANDY_MACHINE_UPDATE",
    CANDY_MACHINE_ROUTE = "CANDY_MACHINE_ROUTE",
    FRACTIONALIZE = "FRACTIONALIZE",
    DEPOSIT_FRACTIONAL_POOL = "DEPOSIT_FRACTIONAL_POOL",
    FUSE = "FUSE",
    CREATE_RAFFLE = "CREATE_RAFFLE",
    BUY_TICKETS = "BUY_TICKETS",
    UPDATE_ITEM = "UPDATE_ITEM",
    LIST_ITEM = "LIST_ITEM",
    DELIST_ITEM = "DELIST_ITEM",
    ADD_ITEM = "ADD_ITEM",
    CLOSE_ITEM = "CLOSE_ITEM",
    BUY_ITEM = "BUY_ITEM",
    FILL_ORDER = "FILL_ORDER",
    UPDATE_ORDER = "UPDATE_ORDER",
    CREATE_ORDER = "CREATE_ORDER",
    CLOSE_ORDER = "CLOSE_ORDER",
    CANCEL_ORDER = "CANCEL_ORDER",
    KICK_ITEM = "KICK_ITEM",
    UPGRADE_FOX = "UPGRADE_FOX",
    UPGRADE_FOX_REQUEST = "UPGRADE_FOX_REQUEST",
    LOAN_FOX = "LOAN_FOX",
    BORROW_FOX = "BORROW_FOX",
    SWITCH_FOX_REQUEST = "SWITCH_FOX_REQUEST",
    SWITCH_FOX = "SWITCH_FOX",
    CREATE_ESCROW = "CREATE_ESCROW",
    ACCEPT_REQUEST_ARTIST = "ACCEPT_REQUEST_ARTIST",
    CANCEL_ESCROW = "CANCEL_ESCROW",
    ACCEPT_ESCROW_ARTIST = "ACCEPT_ESCROW_ARTIST",
    ACCEPT_ESCROW_USER = "ACCEPT_ESCROW_USER",
    PLACE_BET = "PLACE_BET",
    PLACE_SOL_BET = "PLACE_SOL_BET",
    CREATE_BET = "CREATE_BET",
    INIT_RENT = "INIT_RENT",
    NFT_RENT_LISTING = "NFT_RENT_LISTING",
    NFT_RENT_CANCEL_LISTING = "NFT_RENT_CANCEL_LISTING",
    NFT_RENT_UPDATE_LISTING = "NFT_RENT_UPDATE_LISTING",
    NFT_RENT_ACTIVATE = "NFT_RENT_ACTIVATE",
    NFT_RENT_END = "NFT_RENT_END",
    UPGRADE_PROGRAM_INSTRUCTION = "UPGRADE_PROGRAM_INSTRUCTION",
    FINALIZE_PROGRAM_INSTRUCTION = "FINALIZE_PROGRAM_INSTRUCTION",
    EXECUTE_TRANSACTION = "EXECUTE_TRANSACTION",
    APPROVE_TRANSACTION = "APPROVE_TRANSACTION",
    ACTIVATE_TRANSACTION = "ACTIVATE_TRANSACTION",
    CREATE_TRANSACTION = "CREATE_TRANSACTION",
    CANCEL_TRANSACTION = "CANCEL_TRANSACTION",
    REJECT_TRANSACTION = "REJECT_TRANSACTION",
    ADD_INSTRUCTION = "ADD_INSTRUCTION",
    CREATE_MASTER_EDITION = "CREATE_MASTER_EDITION",
    ATTACH_METADATA = "ATTACH_METADATA",
    REQUEST_PNFT_MIGRATION = "REQUEST_PNFT_MIGRATION",
    START_PNFT_MIGRATION = "START_PNFT_MIGRATION",
    MIGRATE_TO_PNFT = "MIGRATE_TO_PNFT",
    UPDATE_RAFFLE = "UPDATE_RAFFLE",
    CREATE_MERKLE_TREE = "CREATE_MERKLE_TREE",
    DELEGATE_MERKLE_TREE = "DELEGATE_MERKLE_TREE",
    COMPRESSED_NFT_MINT = "COMPRESSED_NFT_MINT",
    COMPRESSED_NFT_TRANSFER = "COMPRESSED_NFT_TRANSFER",
    COMPRESSED_NFT_REDEEM = "COMPRESSED_NFT_REDEEM",
    COMPRESSED_NFT_CANCEL_REDEEM = "COMPRESSED_NFT_CANCEL_REDEEM",
    COMPRESSED_NFT_BURN = "COMPRESSED_NFT_BURN",
    COMPRESSED_NFT_VERIFY_CREATOR = "COMPRESSED_NFT_VERIFY_CREATOR",
    COMPRESSED_NFT_UNVERIFY_CREATOR = "COMPRESSED_NFT_UNVERIFY_CREATOR",
    COMPRESSED_NFT_VERIFY_COLLECTION = "COMPRESSED_NFT_VERIFY_COLLECTION",
    COMPRESSED_NFT_UNVERIFY_COLLECTION = "COMPRESSED_NFT_UNVERIFY_COLLECTION",
    COMPRESSED_NFT_SET_VERIFY_COLLECTION = "COMPRESSED_NFT_SET_VERIFY_COLLECTION",
    DECOMPRESS_NFT = "DECOMPRESS_NFT",
    COMPRESS_NFT = "COMPRESS_NFT",
    COMPRESSED_NFT_DELEGATE = "COMPRESSED_NFT_DELEGATE",
    CREATE_POOL = "CREATE_POOL",
    DISTRIBUTE_COMPRESSION_REWARDS = "DISTRIBUTE_COMPRESSION_REWARDS",
    CHANGE_COMIC_STATE = "CHANGE_COMIC_STATE",
    UPDATE_RECORD_AUTHORITY_DATA = "UPDATE_RECORD_AUTHORITY_DATA",
}

// A list of common collections and their collection query
export const Collections = {
    ABC: {
        firstVerifiedCreators: ["GVkb5GuwGKydA4xXLT9PNpx63h7bhFNrDLQSxi6j5NuF"],
    },
    DEGODS: {
        verifiedCollectionAddresses: ["6XxjKYFbcndh2gDcsUrmZgVEsoDxXMnfsaGY6fpTJzNr"],
    },
};

export const NftEventTypes = [
    TransactionType.NFT_BID,
    TransactionType.NFT_BID_CANCELLED,
    TransactionType.NFT_GLOBAL_BID,
    TransactionType.NFT_GLOBAL_BID_CANCELLED,
    TransactionType.NFT_LISTING,
    TransactionType.NFT_CANCEL_LISTING,
    TransactionType.NFT_SALE,
    TransactionType.NFT_MINT,
    TransactionType.NFT_MINT_REJECTED,
    TransactionType.NFT_AUCTION_CREATED,
    TransactionType.NFT_AUCTION_UPDATED,
    TransactionType.NFT_AUCTION_CANCELLED,
    TransactionType.NFT_PARTICIPATION_REWARD,
    TransactionType.BURN_NFT,
    TransactionType.NFT_RENT_LISTING,
    TransactionType.NFT_RENT_CANCEL_LISTING,
    TransactionType.NFT_RENT_UPDATE_LISTING,
    TransactionType.NFT_RENT_ACTIVATE,
    TransactionType.NFT_RENT_END,
    TransactionType.ATTACH_METADATA,
    TransactionType.MIGRATE_TO_PNFT,
];

export enum TransactionContext {
    AUCTION = "AUCTION",
    INSTANT_SALE = "INSTANT_SALE",
    OFFER = "OFFER",
    GLOBAL_OFFER = "GLOBAL_OFFER",
    MINT = "MINT",
    UNKNOWN = "UNKNOWN",
}

export enum Source {
    FORM_FUNCTION = "FORM_FUNCTION",
    EXCHANGE_ART = "EXCHANGE_ART",
    CANDY_MACHINE_V3 = "CANDY_MACHINE_V3",
    CANDY_MACHINE_V2 = "CANDY_MACHINE_V2",
    CANDY_MACHINE_V1 = "CANDY_MACHINE_V1",
    UNKNOWN = "UNKNOWN",
    SOLANART = "SOLANART",
    SOLSEA = "SOLSEA",
    MAGIC_EDEN = "MAGIC_EDEN",
    HOLAPLEX = "HOLAPLEX",
    METAPLEX = "METAPLEX",
    OPENSEA = "OPENSEA",
    SOLANA_PROGRAM_LIBRARY = "SOLANA_PROGRAM_LIBRARY",
    ANCHOR = "ANCHOR",
    PHANTOM = "PHANTOM",
    SYSTEM_PROGRAM = "SYSTEM_PROGRAM",
    STAKE_PROGRAM = "STAKE_PROGRAM",
    COINBASE = "COINBASE",
    CORAL_CUBE = "CORAL_CUBE",
    HEDGE = "HEDGE",
    LAUNCH_MY_NFT = "LAUNCH_MY_NFT",
    GEM_BANK = "GEM_BANK",
    GEM_FARM = "GEM_FARM",
    DEGODS = "DEGODS",
    BSL = "BLOCKSMITH_LABS",
    YAWWW = "YAWWW",
    ATADIA = "ATADIA",
    DIGITAL_EYES = "DIGITAL_EYES",
    HYPERSPACE = "HYPERSPACE",
    TENSOR = "TENSOR",
    BIFROST = "BIFROST",
    JUPITER = "JUPITER",
    MERCURIAL = "MERCURIAL_STABLE_SWAP",
    SABER = "SABER",
    SERUM = "SERUM",
    STEP_FINANCE = "STEP_FINANCE",
    CROPPER = "CROPPER",
    RAYDIUM = "RAYDIUM",
    ALDRIN = "ALDRIN",
    CREMA = "CREMA",
    LIFINITY = "LIFINITY",
    CYKURA = "CYKURA",
    ORCA = "ORCA",
    MARINADE = "MARINADE",
    STEPN = "STEPN",
    SENCHA = "SENCHA_EXCHANGE",
    SAROS = "SAROS",
    ENGLISH_AUCTION = "ENGLISH_AUCTION",
    FOXY = "FOXY",
    HADESWAP = "HADESWAP",
    FOXY_STAKING = "FOXY_STAKING",
    FOXY_RAFFLE = "FOXY_RAFFLE",
    FOXY_TOKEN_MARKET = "FOXY_TOKEN_MARKET",
    FOXY_MISSIONS = "FOXY_MISSIONS",
    FOXY_MARMALADE = "FOXY_MARMALADE",
    FOXY_COINFLIP = "FOXY_COINFLIP",
    FOXY_AUCTION = "FOXY_AUCTION",
    CITRUS = "CITRUS",
    ZETA = "ZETA",
    ELIXIR = "ELIXIR",
    ELIXIR_LAUNCHPAD = "ELIXIR_LAUNCHPAD",
    CARDINAL_RENT = "CARDINAL_RENT",
    CARDINAL_STAKING = "CARDINAL_STAKING",
    BPF_LOADER = "BPF_LOADER",
    BPF_UPGRADEABLE_LOADER = "BPF_UPGRADEABLE_LOADER",
    SQUADS = "SQUADS",
    SHARKY_FI = "SHARKY_FI",
    OPEN_CREATOR_PROTOCOL = "OPEN_CREATOR_PROTOCOL",
    BUBBLEGUM = "BUBBLEGUM",

    // Mints
    W_SOL = "W_SOL",
    DUST = "DUST",
    SOLI = "SOLI",
    USDC = "USDC",
    FLWR = "FLWR",
    HDG = "HDG",
    MEAN = "MEAN",
    UXD = "UXD",
    SHDW = "SHDW",
    POLIS = "POLIS",
    ATLAS = "ATLAS",
    USH = "USH",
    TRTLS = "TRTLS",
    RUNNER = "RUNNER",
    INVICTUS = "INVICTUS",
}

export enum ProgramName {
    UNKNOWN = "UNKNOWN",
    JUPITER_V1 = "JUPITER_V1",
    JUPITER_V2 = "JUPITER_V2",
    JUPITER_V3 = "JUPITER_V3",
    JUPITER_V4 = "JUPITER_V4",
    MERCURIAL_STABLE_SWAP = "MERCURIAL_STABLE_SWAP",
    SABER_STABLE_SWAP = "SABER_STABLE_SWAP",
    SABER_EXCHANGE = "SABER_EXCHANGE",
    SERUM_DEX_V1 = "SERUM_DEX_V1",
    SERUM_DEX_V2 = "SERUM_DEX_V2",
    SERUM_DEX_V3 = "SERUM_DEX_V3",
    SERUM_SWAP = "SERUM_SWAP",
    STEP_FINANCE = "STEP_FINANCE",
    CROPPER = "CROPPER",
    RAYDIUM_LIQUIDITY_POOL_V2 = "RAYDIUM_LIQUIDITY_POOL_V2",
    RAYDIUM_LIQUIDITY_POOL_V3 = "RAYDIUM_LIQUIDITY_POOL_V3",
    RAYDIUM_LIQUIDITY_POOL_V4 = "RAYDIUM_LIQUIDITY_POOL_V4",
    ALDRIN_AMM_V1 = "ALDRIN_AMM_V1",
    ALDRIN_AMM_V2 = "ALDRIN_AMM_V2",
    CREMA = "CREMA",
    LIFINITY = "LIFINITY",
    LIFINITY_V2 = "LIFINITY_V2",
    CYKURA = "CYKURA",
    ORCA_TOKEN_SWAP_V1 = "ORCA_TOKEN_SWAP_V1",
    ORCA_TOKEN_SWAP_V2 = "ORCA_TOKEN_SWAP_V2",
    ORCA_WHIRLPOOLS = "ORCA_WHIRLPOOLS",
    MARINADE = "MARINADE",
    STEPN = "STEPN",
    SENCHA_EXCHANGE = "SENCHA_EXCHANGE",
    SAROS_AMM = "SAROS_AMM",
    FOXY_STAKE = "FOXY_STAKE",
    FOXY_SWAP = "FOXY_SWAP",
    FOXY_RAFFLE = "FOXY_RAFFLE",
    FOXY_TOKEN_MARKET = "FOXY_TOKEN_MARKET",
    FOXY_MISSIONS = "FOXY_MISSIONS",
    FOXY_MARMALADE = "FOXY_MARMALADE",
    FOXY_COINFLIP = "FOXY_COINFLIP",
    FOXY_AUCTION = "FOXY_AUCTION",
    CITRUS = "CITRUS",
    HADE_SWAP = "HADE_SWAP",
    ZETA = "ZETA",
    CARDINAL_RENT = "CARDINAL_RENT",
    CARDINAL_STAKING = "CARDINAL_STAKING",
    SHARKY_FI = "SHARKY_FI",
    OPEN_CREATOR_PROTOCOL = "OPEN_CREATOR_PROTOCOL",
    BUBBLEGUM = "BUBBLEGUM",
    CORAL_CUBE = "CORAL_CUBE",
}

export enum Address {
    NONE = "",
    METAPLEX = "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98",
    METAPLEX_AUCTION_HOUSE = "hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk",
    EXCHANGE_ART_AUCTION = "exAuvFHqXXbiLrM4ce9m1icwuSyXytRnfBkajukDFuB",
    EXCHANGE_ART_OFFER = "exofLDXJoFji4Qyf9jSAH59J4pp82UT5pmGgR6iT24Z",
    EXCHANGE_ART_INSTANT_SALE = "AmK5g2XcyptVLCFESBCJqoSfwV3znGoVYQnqEnaAZKWn",
    EXCHANGE_ART_MINT = "EXBuYPNgBUXMTsjCbezENRUtFQzjUNZxvPGTd11Pznk5",
    FORM_FUNCTION = "formn3hJtt8gvVKxpCfzCJGuoz6CNUFcULFZW18iTpC",
    SOLANART = "CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz",
    SOLANART_GLOBAL_OFFER = "5ZfZAwP2m93waazg8DkrrVmsupeiPEvaEHowiUP7UAbJ",
    SOLSEA_MINT = "2669GNmpdcRF2FmpjZmPtnpKD7L9tkFd92XSPEN85i45",
    SOLSEA_V1 = "617jbWo616ggkDxvW1Le8pV38XLbVSyWY8ae6QUmGBAU",
    SOLSEA_V2 = "AARTcKUzLYaWmK7D1otgyAoFn5vQqBiTrxjwrvjvsVJa",
    CANDY_MACHINE_V3 = "Guard1JwRhJkVH6XZhzoYxeBVQe872VH6QggF4BWmS9g",
    CANDY_MACHINE_CORE_V3 = "CndyV3LdqHUfDLmE5naZjVN8rBZz4tqhdefbAnjHG3JR",
    CANDY_MACHINE_V2 = "cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ",
    CANDY_MACHINE_V1 = "cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ",
    METAPLEX_AUCTION = "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8",
    TOKEN_METADATA = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
    METAPLEX_MIGRATION = "migrxZFChTqicHpNa1CAjPcF29Mui2JU2q4Ym7qQUTi",
    TOKEN = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    TOKEN_VAULT = "vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn",
    MAGIC_EDEN_V1 = "MEisE1HzehtrDpAAT8PnLHjpSSkRYakotTuJRPjTpo8",
    MAGIC_EDEN_V2 = "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K",
    ENGLISH_AUCTION = "EA15T2W45BJFm71XmB5VGcsiWGKZTNfnK6aCmE2Hb5eC",
    PHANTOM = "DeJBGdMFa1uynnnKiwrVioatTuHmNLpyFKnmB5kaFdzQ",
    SYSTEM_PROGRAM = "11111111111111111111111111111111",
    STAKE_PROGRAM = "Stake11111111111111111111111111111111111111",
    COINBASE_SHARED_WALLET = "H8sMJSCQxfKiFTCfDR3DUMLPwcRbM61LGFJ8N4dK3WjS",
    MAGIC_EDEN_LAUNCHPAD = "CMZYPASGWeTz7RNGHaRJfCq2XQ5pYK6nDvVQxzkH51zb",
    HEDGE = "HedgeEohwU6RqokrvPU4Hb6XKPub8NuKbnPmY7FoMMtN",
    LAUNCH_MY_NFT = "ArAA6CZC123yMJLUe4uisBEgvfuw2WEvex9iFmFCYiXv",
    GEM_BANK = "bankHHdqMuaaST4qQk6mkzxGeKPHWmqdgor6Gs8r88m",
    GEM_FARM = "farmL4xeBFVXJqtfxCzU9b28QACM7E2W2ctT6epAjvE",
    DEGODS_GEM_BANK = "6VJpeYFy87Wuv4KvwqD5gyFBTkohqZTqs6LgbCJ8tDBA",
    DEGODS_GEM_FARM = "FQzYycoqRjmZTgCcTTAkzceH2Ju8nzNLa5d78K3yAhVW",
    BSL_GEM_BANK = "BRwUybBWZJEin7HVeWBC7AueG1McDeY6v4esBwgryzKe",
    BSL_GEM_FARM = "HUfVysibcL4u6EVoi4GsSDnV993tRX47ntoYH123q9AB",
    YAWWW = "5SKmrbAxnHV2sgqyDXkGrLrokZYtWWVEEk5Soed7VLVN",
    ATADIA_TOKEN_MINT_AUTHORITY = "PassBQMFvYtDmvo7k5S2GVn6quj6RmnLnVfqEZebVMf",
    DIGITAL_EYES = "7t8zVJtPCFAqog1DcnB6Ku1AVKtWfHkCiPi1cAvcJyVF",
    HYPERSPACE = "HYPERfwdTjyJ2SCaKHmpF2MtrXqWxrsotYDsTrshHWq8",
    TENSOR = "TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN",
    BIFROST_LAUNCHPAD = "BFCMkgg9eFSv54HKJZFD5RMG8kNR5eMAEWnAtfRTPCjU",
    FOXY_STAKE = "FoXpJL1exLBJgHVvdSHNKyKu2xX2uatctH9qp6dLmfpP",
    FOXY_SWAP = "8guzmt92HbM7yQ69UJg564hRRX6N4nCdxWE5L6ENrA8P",
    FOXY_RAFFLE = "9ehXDD5bnhSpFVRf99veikjgq8VajtRH7e3D9aVPLqYd",
    FOXY_TOKEN_MARKET = "8BYmYs3zsBhftNELJdiKsCN2WyCBbrTwXd6WG4AFPr6n",
    FOXY_MISSIONS = "6NcdQ5WTnrPoMLbP4kvpLYa4YSwKqkNHRRE8XVf5hmv9",
    FOXY_MARMALADE = "BbGozDEfDKJbqxkSDjcDLWdQfxeZnnoTgD5VhNXV7epn",
    FOXY_COINFLIP = "72D3En8GQycjtunxf9mgyR8onzYdPqYFsKp4myUzhaRZ",
    FOXY_AUCTION = "FFAUags5SYJEioBUkPtKuArccNzcNgUubhssCH2jSbeH",
    CITRUS = "JCFRaPv7852ESRwJJGRy2mysUMydXZgVVhrMLmExvmVp",
    HADE_SWAP = "hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu",
    ELIXIR = "2qGyiNeWyZxNdkvWHc2jT5qkCnYa1j1gDLSSUmyoWMh8",
    ELIXIR_LAUNCHPAD = "1NCHWmQ39XfQuRLgGihckNKXcm9LXbq5EnPVwPptLWy",
    ELIXIR_LAUNCHPAD_V2 = "PADWBS1VeV1LWsY6nciu6dRZjgSmUH2iPsUpHFVz7Wz",
    ELIXIR_V2 = "E1XRkj9fPF2NQUdoq41AHPqwMDHykYfn5PzBXAyDs7Be",
    CARDINAL_RENT = "mgr99QFMYByTqGPWmNqunV7vBLmWWXdSrHUfV8Jf3JM",
    CARDINAL_STAKING = "stkBL96RZkjY5ine4TvPihGqW8UHJfch2cokjAPzV8i",
    MAGIC_EDEN_GLOBAL_BID = "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc",
    BPF_UPGRADEABLE_LOADER = "BPFLoaderUpgradeab1e11111111111111111111111",
    BPF_LOADER = "BPFLoader2111111111111111111111111111111111",
    SQUADS = "SMPLecH534NA9acpos4G6x7uf3LWbCAwZQE9e8ZekMu",
    SHARKY_FI = "SHARKobtfF1bHhxD2eqftjHBdVSCbKo9JtgK71FhELP",
    OPEN_CREATOR_PROTOCOL = "ocp4vWUzA2z2XMYJ3QhM9vWdyoyoQwAFJhRdVTbvo9E",
    BUBBLEGUM = "BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY",
    CORAL_CUBE = "6U2LkBQ6Bqd1VFt7H76343vpSwS5Tb1rNyXSNnjkf9VL",

    // Defi programs - most pulled from here - https://dune.com/queries/665628/1240465
    JUPITER_V1 = "JUP6i4ozu5ydDCnLiMogSckDPpbtr7BJ4FtzYWkb5Rk",
    JUPITER_V2 = "JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo",
    JUPITER_V3 = "JUP3c2Uh3WA4Ng34tw6kPd2G4C5BB21Xo36Je1s32Ph",
    JUPITER_V4 = "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB",
    JUPITER_LIMIT_ORDER = "jupoNjAxXgZ4rjzxzPMP4oxduvQsQtZzyknqvzYNrNu",
    SERUM_DEX_V3 = "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin",
    SERUM_DEX_V2 = "EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o",
    SERUM_DEX_V1 = "BJ3jrUzddfuSrZHXSCxMUUQsjKEyLmuuyZebkcaFp2fg",
    SERUM_DEX_ALT_V1 = "4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn",
    SERUM_SWAP = "22Y43yTVxuUkoRKdm9thyRhQ3SdgQS7c7kB6UNCiaczD",
    ALDRIN_AMM_V1 = "AMM55ShdkoGRB5jVYPjWziwk8m5MpwyDgsMWHaMSQWH6",
    ALDRIN_AMM_V2 = "CURVGoZn8zycx6FXwwevgBTB2gVvdbGTEpvMJDbgs2t4",
    RAYDIUM_LIQUIDITY_POOL_V2 = "RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr",
    RAYDIUM_LIQUIDITY_POOL_V3 = "27haf8L6oxUeXrHrgEgsexjSY5hbVUWEmvv9Nyxg8vQv",
    RAYDIUM_LIQUIDITY_POOL_V4 = "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8",
    SABER_STABLE_SWAP = "SSwpkEEcbUqx4vtoEByFjSkhKdCT862DNVb52nZg1UZ",
    SABER_EXCHANGE = "YAkoNb6HKmSxQN9L8hiBE5tPJRsniSSMzND1boHmZxe",
    MERCURIAL_STABLE_SWAP = "MERLuDFBMmsHnsBPZw2sDQZHvXFMwp8EdjudcU2HKky",
    ORCA_TOKEN_SWAP_V1 = "DjVE6JNiYqPL2QXyCUUh8rNjHrbz9hXHNYt99MQ59qw1",
    ORCA_TOKEN_SWAP_V2 = "9W959DqEETiGZocYWCQPaJ6sBmUzgfxXfqGeTEdp3aQP",
    ORCA_WHIRLPOOLS = "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc",
    STEP_FINANCE_SWAP_PROGRAM = "SSwpMgqNDsyV7mAgN9ady4bDVu5ySjmmXejXvy2vLt1",
    CYKURA = "cysPXAjehMpVKUapzbMCCnpFxUFFryEWEaLgnb9NrR8",
    CREMA_FINANCE = "6MLxLqiXaaSUpkgMnWDTuejNZEz3kE7k2woyHGVFw319",
    LIFINITY = "EewxydAPCCVuNEyrVN68PuSYdQ7wKn27V9Gjeoi8dy3S",
    LIFINITY_V2 = "2wT8Yq49kHgDzXuPxZSaeLaH1qbmGXtEyPy64bL7aD3c",
    STEPN = "Dooar9JkhdZ7J3LHN3A7YCuoGRUggXhQaG4kijfLGU2j",
    SENCHA_EXCHANGE = "SCHAtsf8mbjyjiv4LkhLKutTf6JnZAbdJKFkXQNMFHZ",
    CROPPER = "CTMAxxk34HjKWxQ3QLZK1HpaLXmBveao3ESePXbiyfzh",
    SAROS_AMM = "SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr",
    ZETA = "ZETAx4NhMsyop6gVwH2E2RrAcDiuPs9ABkhLBEvBsb6",

    // Mints
    W_SOL_TOKEN = "So11111111111111111111111111111111111111112",
    DUST_TOKEN = "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ",
    SOLI_TOKEN = "8JnNWJ46yfdq8sKgT1Lk4G7VWkAA8Rhh7LhqgJ6WY41G",
    USDC_TOKEN = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    FLWR_TOKEN = "FLWRna1gxehQ9pSyZMzxfp4UhewvLPwuKfdUTgdZuMBY",
    HDG_TOKEN = "5PmpMzWjraf3kSsGEKtqdUsCoLhptg4yriZ17LKKdBBy",
    MEAN_TOKEN = "MEANeD3XDdUmNMsRGjASkSWdC8prLYsoRJ61pPeHctD",
    UXD_TOKEN = "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
    SHDW_TOKEN = "SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y",
    POLIS_TOKEN = "poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk",
    ATLAS_TOKEN = "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx",
    USH_TOKEN = "9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6",
    TRTLS_TOKEN = "q4bpaRKw3fJB1AJBeeBaKv3TjYzWsmntLgnSB275YUb",
    FOXY_TOKEN = "FoXyMu5xwXre7zEoSvzViRk3nGawHUp9kUh97y2NDhcq",
    RUNNER_TOKEN = "6Rqtt2h8dS6pHPGzqrmGtyhjCk3zpk795QcEwXJLfeLn",
    INVICTUS_TOKEN = "inL8PMVd6iiW3RCBJnr5AsrRN6nqr4BTrcNuQWQSkvY",
}

export enum TokenStandard {
    PROGRAMMABLE_NON_FUNGIBLE = "ProgrammableNonFungible",
    NON_FUNGIBLE = "NonFungible",
    FUNGIBLE = "Fungible",
    FUNGIBLE_ASSET = "FungibleAsset",
    NON_FUNGIBLE_EDITION = "NonFungibleEdition",
    UNKNOWN_STANDARD = "UnknownStandard",
}

export enum Interface {
    V1NFT = "V1_NFT",
    CUSTOM = "Custom",
    V1PRINT = "V1_PRINT",
    LEGACYNFT = "Legacy_NFT",
    V2NFT = "V2_NFT",
    FUNGIBLE_ASSET = "FungibleAsset",
    IDENTITY = "Identity",
    EXECUTABLE = "Executable",
    PROGRAMMABLENFT = "ProgrammableNFT",
    FUNGIBLE_TOKEN = "FungibleToken",
    MPL_CORE_ASSET = "MplCoreAsset",
}

export enum OwnershipModel {
    SINGLE = "single",
    TOKEN = "token",
}

export enum RoyaltyModel {
    CREATORS = "creators",
    FANOUT = "fanout",
    SINGLE = "single",
}

export enum Scope {
    FULL = "full",
    ROYALTY = "royalty",
    METADATA = "metadata",
    EXTENSION = "extension",
}

export enum UseMethods {
    BURN = "Burn",
    SINGLE = "Single",
    MULTIPLE = "Multiple",
}
export enum Context {
    WalletDefault = "wallet-default",
    WebDesktop = "web-desktop",
    WebMobile = "web-mobile",
    AppMobile = "app-mobile",
    AppDesktop = "app-desktop",
    App = "app",
    Vr = "vr",
}

export enum AssetSortBy {
    Id = "id",
    Created = "created",
    Updated = "updated",
    RecentAction = "recent_action",
}
export enum AssetSortDirection {
    Asc = "asc",
    Desc = "desc",
}
export enum SearchConditionType {
    All = "all",
    Any = "any",
}

export enum Group {
    COLLECTION = "collection",
}

export enum MintApiAuthority {
    MAINNET = "HnT5KVAywGgQDhmh6Usk4bxRg4RwKxCK4jmECyaDth5R",
    DEVNET = "2LbAtCJSaHqTnP9M5QSjvAMXk79RNLusFspFN5Ew67TC",
}

export enum PriorityLevel {
    MIN = "Min",
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
    VERY_HIGH = "VeryHigh",
    UNSAFE_MAX = "UnsafeMax",
    DEFAULT = "Default",
}

export enum UiTransactionEncoding {
    Binary = "binary",
    Base64 = "base64",
    Base58 = "base58",
    Json = "json",
    JsonParsed = "jsonParsed",
}
