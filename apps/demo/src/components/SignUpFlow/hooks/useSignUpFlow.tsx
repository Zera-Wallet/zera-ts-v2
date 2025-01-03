import { createContext, useContext, useState } from "react";

export interface SignUpFlowContext {
    step: SignUpFlowStep;
    setStep: (step: SignUpFlowStep) => void;
}

const SignUpFlowStep = {
    CREATE_PASSWORD: "create-password",
    SAVE_MNEMONIC: "save-mnemonic",
} as const;
export type SignUpFlowStep = (typeof SignUpFlowStep)[keyof typeof SignUpFlowStep];

export const SignUpFlowContext = createContext<SignUpFlowContext | undefined>(undefined);

export function SignUpFlowProvider({ children }: { children: React.ReactNode }) {
    const [step, setStep] = useState<SignUpFlowStep>(SignUpFlowStep.CREATE_PASSWORD);

    return <SignUpFlowContext.Provider value={{ step, setStep }}>{children}</SignUpFlowContext.Provider>;
}

export function useSignUpFlow() {
    const context = useContext(SignUpFlowContext);
    if (!context) {
        throw new Error("useSignUpFlow must be used within a SignUpFlowProvider");
    }
    return context;
}
