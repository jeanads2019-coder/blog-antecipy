
import Link from 'next/link'

export function Footer() {
    return (
        <footer className="w-full border-t bg-background py-16">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <img src="/logo.svg" alt="Antecipy" className="h-6 w-auto dark:brightness-200" />
                        <p className="text-sm text-muted-foreground">
                            Sua solução de antecipação financeira.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Produto</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/funcionalidades" className="hover:text-primary">Como funciona</Link></li>
                            <li><Link href="/planos" className="hover:text-primary">Planos</Link></li>
                            <li><Link href="/seguranca" className="hover:text-primary">Segurança</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Empresa</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/sobre" className="hover:text-primary">Sobre nós</Link></li>
                            <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
                            <li><Link href="/contato" className="hover:text-primary">Carreiras</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/termos" className="hover:text-primary">Termos de uso</Link></li>
                            <li><Link href="/privacidade" className="hover:text-primary">Privacidade</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground pt-8 border-t">
                    <p>&copy; {new Date().getFullYear()} Antecipy. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
