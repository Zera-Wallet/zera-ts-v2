"use client";

import { Loader } from "../ui/loader";
import { useZeraKeyring } from "./hooks/useZeraKeyring";

export function Zera() {
    const { keyring } = useZeraKeyring();

    if (keyring == null) {
        return <Loader />;
    }
    return <div>zera</div>;
}
