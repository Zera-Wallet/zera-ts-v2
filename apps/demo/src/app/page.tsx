import { Zera } from "@/components/Zera/Zera";
import { ZeraClientProviders } from "@/components/Zera/ZeraClientProviders";

export default async function Home() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-4 h-screen">
            {/* <EmbeddedCard>
                <GenerateMnemonic />
            </EmbeddedCard>
            <EmbeddedCard>
                <InputMnemonic />
            </EmbeddedCard>
            <EmbeddedCard>
                <SignUpFlow />
            </EmbeddedCard> */}

            <ZeraClientProviders>
                <Zera />
            </ZeraClientProviders>
        </div>
    );
}
