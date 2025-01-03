import { z } from "zod";

export const passwordSchema = z
    .object({
        password: z
            .string()
            .min(4, "Password must be at least 4 characters long")
            .max(99, "Password must be less than 100 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type PasswordFormData = z.infer<typeof passwordSchema>;
