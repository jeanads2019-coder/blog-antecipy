
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <img src="/logo.svg" alt="Antecipy" className="h-8 w-auto dark:brightness-200" />
                </Link>

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Home</Link>
                    <Link href="/sobre" className="transition-colors hover:text-foreground/80 text-foreground/60">Sobre</Link>
                    <Link href="/funcionalidades" className="transition-colors hover:text-foreground/80 text-foreground/60">Como funciona</Link>
                    <Link href="/planos" className="transition-colors hover:text-foreground/80 text-foreground/60">Planos</Link>
                    <Link href="/blog" className="transition-colors hover:text-foreground/80 text-foreground">Blog</Link>
                    <Link href="/contato" className="transition-colors hover:text-foreground/80 text-foreground/60">Contato</Link>
                </nav>

                {/* CTA */}
                <div className="flex items-center space-x-4">
                    <Button variant="default" className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                        Comece agora
                    </Button>
                </div>
            </div>
        </header>
    )
}
