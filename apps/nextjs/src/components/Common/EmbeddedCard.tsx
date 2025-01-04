export function EmbeddedCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col w-full max-w-[420px] items-center justify-start p-4 border border-border rounded-lg text-sm">
            {children}
        </div>
    );
}
