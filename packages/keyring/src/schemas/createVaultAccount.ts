import { z } from "zod";

export const zeraCreateSeedVaultAccountParamsSchema = z.object({
    type: z.literal("seed-derivation"),
    vaultId: z.string(),
    derivationPaths: z.array(
        z.object({
            path: z.string(),
            address: z.string(),
        }),
    ),
    name: z.string().optional(),
});
export type ZeraCreateSeedVaultAccountParams = z.infer<typeof zeraCreateSeedVaultAccountParamsSchema>;

// TODO: Union of vault account types
export const zeraCreateVaultAccountParamsSchema = zeraCreateSeedVaultAccountParamsSchema;
export type ZeraCreateVaultAccountParams = z.infer<typeof zeraCreateVaultAccountParamsSchema>;

export const storedZeraVaultAccountSchema = zeraCreateSeedVaultAccountParamsSchema.extend({
    name: z.string(),
});
export type StoredZeraVaultAccount = z.infer<typeof storedZeraVaultAccountSchema>;

export const zeraVaultAccountSchema = storedZeraVaultAccountSchema.extend({
    id: z.string(),
});
export type ZeraVaultAccount = z.infer<typeof zeraVaultAccountSchema>;
