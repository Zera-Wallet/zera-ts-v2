import { GenerateMnemonic } from "@/components/GenerateMnemonic/GenerateMnemonic";
import { InputMnemonic } from "@/components/InputMnemonic/InputMnemonic";

export default async function Home() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-4 h-screen">
            <GenerateMnemonic />
            <InputMnemonic />
        </div>
    );
}
