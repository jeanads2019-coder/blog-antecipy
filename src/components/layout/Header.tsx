
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
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-primary text-foreground">Blog</Link>
                    <Link href="/funcionalidades" className="transition-colors hover:text-primary text-foreground/60">Como funciona</Link>
                    <Link href="/sobre" className="transition-colors hover:text-primary text-foreground/60">Sobre</Link>
                </nav>

                <div className="flex items-center">
                    {/* Espaço para manter layout ou adicionar social icons no futuro */}
                </div>
            </div>
        </header>
    )
}
