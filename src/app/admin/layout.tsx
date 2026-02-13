
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-muted/20">
            {children}
            <Toaster />
        </div>
    )
}
