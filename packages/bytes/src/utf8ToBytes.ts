export function utf8ToBytes(utf8String: string): Uint8Array {
    if (typeof utf8String !== "string") {
        throw new Error(`utf8ToBytes expected string, got ${typeof utf8String}`);
    }
    return new Uint8Array(new TextEncoder().encode(utf8String)); // https://bugzil.la/1681809
}
