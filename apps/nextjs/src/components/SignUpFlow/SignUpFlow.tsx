"use client";

import { CreatePassword } from "./CreatePassword";
import { SaveMnemonic } from "./SaveMnemonic";
import { SignUpFlowProvider, useSignUpFlow } from "./hooks/useSignUpFlow";

export function SignUpFlow() {
    return (
        <SignUpFlowProvider>
            <_SignUpFlow />
        </SignUpFlowProvider>
    );
}

function _SignUpFlow() {
    const { step } = useSignUpFlow();

    switch (step) {
        case "create-password":
            return <CreatePassword />;
        case "save-mnemonic":
            return <SaveMnemonic />;
    }
}
