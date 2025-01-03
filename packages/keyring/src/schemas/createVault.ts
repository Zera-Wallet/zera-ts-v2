import { z } from "zod";

export const zeraCreateSeedVaultParamsSchema = z.object({
    type: z.literal("seed"),
    seed: z.string(),
});
export type ZeraCreateSeedVaultParams = z.infer<typeof zeraCreateSeedVaultParamsSchema>;

// TODO: Union of vault types
export const zeraCreateVaultParamsSchema = zeraCreateSeedVaultParamsSchema;
export type ZeraCreateVaultParams = z.infer<typeof zeraCreateVaultParamsSchema>;
