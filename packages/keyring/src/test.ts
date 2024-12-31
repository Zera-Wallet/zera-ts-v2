import { MemoryStorage } from "@zera-ts/storage";
import { ZeraAesStorage, ZeraKeyring } from "./ZeraKeyring";

async function main() {
    const storage = new ZeraAesStorage(new MemoryStorage());

    const keyring = new ZeraKeyring(storage);

    console.log("exists", await keyring.exists());
    keyring.create("my-password");

    console.log("exists", await keyring.exists());

    keyring.unlock("my-password");

    // await keyring.set("my-key", "my-value");

    // const stored = await storage.getItem("zera.keyring:vault.my-key");
    // console.log("stored", stored);

    // const value = await keyring.get("my-key");
    // console.log("value", value);
}

main();
