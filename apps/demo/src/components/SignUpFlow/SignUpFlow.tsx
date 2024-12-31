"use client";

import { ZeraKeyring } from "@zera-ts/keyring";
import { LocalStorage } from "@zera-ts/storage";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export function SignUpFlow() {
    const [keyring, setKeyring] = useState<ZeraKeyring | null>(null);

    useEffect(() => {
        (async () => {
            const keyring = new ZeraKeyring(new LocalStorage());
            setKeyring(keyring);
        })();
    }, []);

    if (keyring == null) {
        return <LoaderCircle className="w-4 h-4 animate-spin text-muted-foreground" />;
    }

    return <CreateAPassword keyring={keyring} />;
}

function CreateAPassword({ keyring }: { keyring: ZeraKeyring }) {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const isPasswordValid = password.length > 3 && password.length < 100;
    const isConfirmedPasswordValid = password === confirmPassword;

    const canContinue = isPasswordValid && isConfirmedPasswordValid;

    async function handleContinue() {
        await keyring.create(password);
    }

    return (
        <div className="flex flex-col items-center justify-start w-full">
            <h1 className="text-xl font-medium mb-1">Create a password</h1>
            <p className="text-sm  mb-4 text-center text-muted-foreground">
                You will use this password to unlock your wallet.
            </p>
            <input
                type="password"
                placeholder="Password"
                className="w-full bg-transparent p-2 outline-none mb-2 placeholder:text-muted-foreground/70"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm password"
                className="w-full bg-transparent p-2 outline-none placeholder:text-muted-foreground/70"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button className="w-full mt-4" disabled={!canContinue} onClick={handleContinue}>
                Continue
            </Button>
        </div>
    );
}
