"use client";

import { MyBalances } from "@/app/components/home/fungible-balances/MyBalances";
import { cn } from "@/lib/utils";
import { ChartCandlestick, HomeIcon, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "../ui/loader";
import { useZeraKeyring } from "./hooks/useZeraKeyring";

export function Zera() {
    const { keyring, selectedVaultAccount } = useZeraKeyring();
    const router = useRouter();

    const vaultAccounts = keyring.getVaultAccounts();

    useEffect(() => {
        if (vaultAccounts.length === 0) {
            router.push("/onboarding");
        }
    }, [vaultAccounts, router]);

    if (vaultAccounts.length === 0) {
        return <Loader />;
    }

    if (!selectedVaultAccount) {
        return <Loader />;
    }

    return (
        <div className="grow flex overflow-hidden w-full h-full flex-row-reverse">
            <div className="grow flex flex-col overflow-auto">
                <Topbar />
                <div className="grid z-0 grow overflow-y-auto">
                    <div className="px-2 w-full mx-auto flex flex-col gap-2 2xl:max-w-8xl">
                        <div className="grid gap-2 grid-cols-12">
                            <div className="gap-2 col-span-9">
                                <MyBalances />
                            </div>
                            <div className="gap-2 col-span-3 flex flex-col">right</div>
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar />
        </div>
    );
}

const NAV_ITEMS = [
    {
        name: "Home",
        icon: <HomeIcon className="w-5 h-5" />,
        href: "/",
    },
    {
        name: "Trade",
        icon: <ChartCandlestick className="w-5 h-5" />,
        href: "/trade",
    },
];

function Sidebar() {
    return (
        <div className="grow-0">
            <div className="h-full flex flex-col">
                <aside className="flex flex-col h-full pl-2 py-0.5 gap-1.5 justify-start transition-all ease-in-out duration-150 w-[9.25rem]">
                    <div className="flex items-center h-10">
                        <h1 className="text-xl font-bold pl-3 text-zera-green">zera</h1>
                    </div>
                    <div className="grow flex flex-col items-start gap-1 w-full">
                        {NAV_ITEMS.map((item) => (
                            <NavItem key={item.name} {...item} />
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}

function NavItem({ name, icon, href }: (typeof NAV_ITEMS)[number]) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center justify-start w-full px-3 py-2.5 rounded-lg transition-all",
                isActive
                    ? "bg-zera-green text-zera-green-foreground font-semibold"
                    : "hover:bg-zera-green/10 font-medium",
            )}
        >
            {icon}
            <p className="text-xs ml-2">{name}</p>
        </Link>
    );
}

function Topbar() {
    const { selectedVaultAccount } = useZeraKeyring();

    if (!selectedVaultAccount) {
        return null;
    }

    return (
        <div className="transition-all duration-300 sticky top-0 shrink-0">
            <div className="flex w-full grow h-8 gap-1 justify-between items-center my-2 px-2">
                <div />
                <div className="font-medium bg-zera-green/10 px-2 h-[32px] flex items-center justify-center text-xs rounded-lg">
                    <UserRound className="w-4 h-4 mr-1" />
                    <p>{selectedVaultAccount.name}</p>
                </div>
            </div>
        </div>
    );
}
