/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [
        {
            name: "fix-dynamic-imports",
            transform(code, id) {
                if (/src\/ZeraWordlist\.ts$/.test(id)) {
                    // biome-ignore lint/style/noParameterAssign: stfu
                    code = code.replace(/\.js/g, ".ts");
                    return code;
                }
            },
        },
    ],
});
