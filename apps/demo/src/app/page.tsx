import { ZeraValidLanguages, ZeraWordlist } from "@zera-ts/wordlists";

export default async function Home() {
    const wordlists = await Promise.all(
        ZeraValidLanguages.map(async (lang) => ({
            language: lang,
            wordlist: await ZeraWordlist.get(lang),
        })),
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-4xl font-bold">Zera Wordlist Demo</h1>

            <div className="flex flex-col gap-8 w-full max-w-2xl">
                {wordlists.map(({ language, wordlist }) => (
                    <div key={language} className="border rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4 capitalize">{language} Wordlist</h2>

                        <div className="space-y-4">
                            <p className="text-gray-600">Total words: {wordlist.words.length}</p>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Sample Words:</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-black">
                                    {Array.from(
                                        { length: 9 },
                                        () => wordlist.words[Math.floor(Math.random() * wordlist.words.length)],
                                    ).map((word) => (
                                        <div key={word} className="bg-gray-100 p-2 rounded">
                                            {word}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
