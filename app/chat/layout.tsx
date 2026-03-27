import Navbar from "@/components/Navbar";

export default function ChatLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 min-h-0 overflow-hidden">{children}</main>
        </div>
    );
}