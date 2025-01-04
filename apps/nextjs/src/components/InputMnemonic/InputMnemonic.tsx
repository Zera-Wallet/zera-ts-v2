"use client";

import { StrengthControl } from "../GenerateMnemonic/StrengthControl";
import { InputMnemonicProvider, useInputMnemonic } from "./useInputMnemonic";

export function InputMnemonic() {
    return (
        <InputMnemonicProvider>
            <_InputMnemonic />
        </InputMnemonicProvider>
    );
}

function _InputMnemonic() {
    const { strength, setStrength } = useInputMnemonic();

    return (
        <div className="flex flex-col w-full text-sm">
            <div className="flex w-full justify-between mb-4">
                <StrengthControl currentStrength={strength} setStrength={setStrength} />
                <ValidationStatus />
            </div>
            <MnemonicInput />
        </div>
    );
}

function ValidationStatus() {
    const { isValid, words, strength } = useInputMnemonic();

    const expectedLength = Math.floor(strength / 10.666);
    const areAnyWordsEmpty = words.some((word) => word.trim() === "");
    if (words.length !== expectedLength || areAnyWordsEmpty) {
        return null;
    }

    return isValid ? (
        <span className="bg-green-500 w-2 h-2 rounded-full" />
    ) : (
        <span className="bg-red-500 w-2 h-2 rounded-full" />
    );
}

function MnemonicInput() {
    const { words } = useInputMnemonic();

    return (
        <div className="group relative">
            <div className="grid grid-cols-3 gap-4">
                {words.map((word, index) => (
                    <MnemonicInputWord
                        // biome-ignore lint/suspicious/noArrayIndexKey: dont have anything else :(
                        key={index}
                        index={index}
                        word={word}
                    />
                ))}
            </div>
        </div>
    );
}

function MnemonicInputWord({ index, word }: { index: number; word: string }) {
    const { updateWord, pasteWords } = useInputMnemonic();

    return (
        <div className="flex items-center justify-start w-full py-0.5">
            <p className="text-muted-foreground mr-1 select-none">{index + 1}.</p>
            <input
                type="text"
                className="w-full bg-transparent outline-none"
                value={word}
                onChange={(e) => updateWord(index, e.target.value)}
                onPaste={(e) => {
                    console.log("paste");
                    e.preventDefault();
                    pasteWords(index, e.clipboardData.getData("text"));
                }}
            />
        </div>
    );
}
