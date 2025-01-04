"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { type PasswordFormData, passwordSchema } from "@/lib/schemas/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useZeraKeyring } from "../Zera/hooks/useZeraKeyring";
import { Button } from "../ui/button";
import { PasswordInput } from "../ui/password-input";
import { useSignUpFlow } from "./hooks/useSignUpFlow";

export function CreatePassword() {
    const { setStep } = useSignUpFlow();
    const { keyring } = useZeraKeyring();
    const form = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(data: PasswordFormData) {
        try {
            keyring.create(data.password);
            setStep("save-mnemonic");
        } catch (err) {
            form.setError("root", {
                message: "Failed to create wallet. Please try again.",
            });
        }
    }

    return (
        <div className="flex flex-col items-center justify-start w-full">
            <h1 className="text-xl font-medium mb-1">Create a password</h1>
            <p className="text-sm mb-4 text-center text-muted-foreground">
                You will use this password to unlock your wallet.
            </p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <PasswordInput
                                        placeholder="Password"
                                        {...field}
                                        autoComplete="new-password"
                                        className="border-none text-sm"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <PasswordInput
                                        placeholder="Confirm password"
                                        {...field}
                                        autoComplete="new-password"
                                        className="border-none text-sm"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {form.formState.errors.root && (
                        <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
                    )}

                    <div className="w-full pt-4">
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
