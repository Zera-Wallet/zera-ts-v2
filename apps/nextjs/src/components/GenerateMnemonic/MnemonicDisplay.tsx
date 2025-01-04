import { ZeraMnemonic } from "@zera-ts/mnemonic";
import { EyeOff } from "lucide-react";

export function MnemonicDisplay({
    zeraMnemonic,
}: {
    zeraMnemonic: ZeraMnemonic;
}) {
    return (
        <div className="group relative">
            <div className="grid grid-cols-3 gap-4">
                {zeraMnemonic.words.map((word, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: we are combining the word and index to create a unique key
                    <MnemonicWord key={`${word}-${index}`} word={word} index={index} />
                ))}
            </div>
            <div className="absolute inset-0 bg-background/90 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-200 pointer-events-none">
                <EyeOff className="w-4 h-4" />
            </div>
        </div>
    );
}

function MnemonicWord({ word, index }: { word: string; index: number }) {
    return (
        <div className="flex items-center justify-start w-full py-0.5">
            <p className="text-muted-foreground mr-1 select-none">{index + 1}.</p>
            <p className="text-start">{word}</p>
        </div>
    );
}
