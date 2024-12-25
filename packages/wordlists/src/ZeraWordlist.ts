/**
 * A constant array of supported languages for the Zera wordlists.
 */
export const ZeraValidLanguages = ["en", "es"] as const;

/**
 * A type alias for the supported languages of Zera wordlists.
 */
export type ZeraLanguage = (typeof ZeraValidLanguages)[number];

/**
 * Class representing a wordlist for a specific language.
 */
export class ZeraWordlist {
    readonly language: ZeraLanguage;
    readonly words: ReadonlyArray<string>;
    private static wordlistCache: Map<ZeraLanguage, ZeraWordlist> = new Map();

    /**
     * Private constructor for creating a new ZeraWordlist instance.
     * @param language The language of the wordlist.
     * @param words A readonly array of words for the wordlist.
     */
    private constructor(language: ZeraLanguage, words: ReadonlyArray<string>) {
        this.language = language;
        this.words = words;
    }

    /**
     * Retrieves the wordlist for a specified language.
     * @param language The language of the desired wordlist.
     * @returns A Promise that resolves with the ZeraWordlist instance for the specified language.
     */
    public static async get(language: ZeraLanguage = "en"): Promise<ZeraWordlist> {
        let wordlist = ZeraWordlist.wordlistCache.get(language);
        if (!wordlist) {
            const words = await ZeraWordlist.loadLanguage(language);
            wordlist = new ZeraWordlist(language, words);
            if (!ZeraWordlist.validateWordlist(wordlist)) {
                throw new Error(`Invalid wordlist for language: ${language}`);
            }
            ZeraWordlist.wordlistCache.set(language, wordlist);
        }
        return wordlist;
    }

    /**
     * Loads the wordlist data for a specified language.
     * @param language The language of the wordlist to load.
     * @returns A Promise that resolves with an array of words for the specified language.
     */
    private static async loadLanguage(language: ZeraLanguage): Promise<string[]> {
        try {
            const { wordlist } = await import(`./words/${language}.ts`);
            const words = wordlist.split("\n");
            if (words.length !== 2048) {
                throw new Error(`Invalid wordlist format for language: ${language}`);
            }
            return words;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to load wordlist file: ${error.message}`);
            }
            throw error;
        }
    }

    /**
     * Validates a wordlist by checking its length and uniqueness of words.
     * @param wordlist The wordlist to validate.
     * @returns A boolean indicating whether the wordlist is valid or not.
     */
    static validateWordlist(wordlist: ZeraWordlist): boolean {
        if (!wordlist || !wordlist.words) {
            return false;
        }
        const wordsSet = new Set(wordlist.words);
        return wordsSet.size === 2048;
    }
}
