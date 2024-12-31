"use client";
import { cn } from "@/lib/utils";
import { ZeraMnemonicStrength } from "@zera-ts/mnemonic";

export function StrengthControl({
    currentStrength,
    setStrength,
}: {
    currentStrength: ZeraMnemonicStrength;
    setStrength: (strength: ZeraMnemonicStrength) => void;
}) {
    function SetStrengthButton({ strength }: { strength: ZeraMnemonicStrength }) {
        const isActive = currentStrength === strength;
        const text = Math.floor(strength / 10.666).toString();

        return (
            <button
                type="button"
                className={cn(!isActive && "text-muted-foreground hover:text-foreground transition-colors")}
                disabled={isActive}
                onClick={() => setStrength(strength)}
            >
                {text}
            </button>
        );
    }

    return (
        <div className="flex items-center justify-start ">
            <p className="text-muted-foreground mr-2">Length:</p>
            <div className="flex items-center">
                <SetStrengthButton strength={128} />
                <p className="text-muted-foreground mx-1">|</p>
                <SetStrengthButton strength={256} />
            </div>
        </div>
    );
}
