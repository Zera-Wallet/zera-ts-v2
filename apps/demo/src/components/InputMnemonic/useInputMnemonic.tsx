import { createContext, useContext, useEffect, useState } from "react";

import { ZeraMnemonic } from "@zera-ts/mnemonic";

export type InputMnemonicContextType = {
    strength: 128 | 256;
    setStrength: (strength: 128 | 256) => void;
    words: string[];
    setWords: React.Dispatch<React.SetStateAction<string[]>>;
    updateWord: (index: number, word: string) => void;
    pasteWords: (index: number, pastedText: string) => void;
    isValid: boolean;
};

const InputMnemonicContext = createContext<InputMnemonicContextType | undefined>(undefined);

export function InputMnemonicProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [strength, setStrength] = useState<128 | 256>(128);
    const [words, setWords] = useState<string[]>(Array(Math.floor(strength / 10.666)).fill(""));
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setWords(Array(Math.floor(strength / 10.666)).fill(""));
    }, [strength]);

    useEffect(() => {
        (async () => {
            try {
                const mnemonic = await ZeraMnemonic.fromWords(words);
                setIsValid(await mnemonic.isValid());
            } catch {
                setIsValid(false);
            }
        })();
    }, [words]);

    const updateWord = (index: number, word: string) => {
        setWords((prevWords) => {
            const newWords = [...prevWords];
            newWords[index] = word;
            return newWords;
        });
    };

    const pasteWords = (index: number, pastedText: string) => {
        const pastedWords = pastedText.trim().split(/\s+/);
        setWords((prevWords) => {
            const newWords = [...prevWords];
            for (let i = 0; i < pastedWords.length && index + i < newWords.length; i++) {
                newWords[index + i] = pastedWords[i];
            }
            return newWords;
        });
    };

    return (
        <InputMnemonicContext.Provider
            value={{
                strength,
                setStrength,
                words,
                setWords,
                updateWord,
                pasteWords,
                isValid,
            }}
        >
            {children}
        </InputMnemonicContext.Provider>
    );
}

export function useInputMnemonic() {
    const context = useContext(InputMnemonicContext);
    if (!context) {
        throw new Error("useInputMnemonic must be used within a InputMnemonicProvider");
    }
    return context;
}
