
import Link from 'next/link'
import { Instagram, Linkedin, Youtube, ArrowRight, ShieldCheck } from 'lucide-react'

export function Footer() {
    return (
        <footer className="w-full bg-zinc-950 text-zinc-400 border-t border-zinc-800">
            {/* Top Section - Newsletter & Brand */}
            <div className="container mx-auto px-6 py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16 border-b border-zinc-900 pb-16">
                    <div className="space-y-6">
                        <img src="/logo.svg" alt="Antecipy" className="h-8 md:h-10 w-auto brightness-0 invert" />
                        <p className="text-lg md:text-xl font-medium text-zinc-300 max-w-md leading-relaxed">
                            Impulsionando o crescimento de empresas com soluções financeiras inteligentes e antecipação de recebíveis.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider border border-green-500/20">
                                <ShieldCheck className="w-3.5 h-3.5" /> Site Seguro
                            </span>
                            <span className="text-zinc-600 text-sm">•</span>
                            <span className="text-zinc-500 text-sm">Desde 2024</span>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 rounded-2xl p-6 md:p-10 border border-zinc-800">
                        <h3 className="text-white text-lg font-bold mb-2">Receba insights financeiros</h3>
                        <p className="text-zinc-500 mb-6 text-sm">Junte-se a +5.000 empreendedores que recebem nossas análises semanais.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Seu e-mail corporativo"
                                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-zinc-700"
                            />
                            <button className="bg-white text-zinc-950 px-5 py-3 rounded-lg font-bold text-sm hover:bg-zinc-200 transition-colors flex items-center gap-2 group">
                                Assinar <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-14">
                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider">Produto</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/funcionalidades" className="hover:text-white transition-colors">Como funciona</Link></li>
                            <li><Link href="/vantagens" className="hover:text-white transition-colors">Vantagens</Link></li>
                            <li><Link href="/integracoes" className="hover:text-white transition-colors">Integrações</Link></li>
                            <li><Link href="/precos" className="hover:text-white transition-colors">Taxas e Prazos</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider">Empresa</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre nós</Link></li>
                            <li><Link href="/carreira" className="hover:text-white transition-colors flex items-center gap-2">Carreiras <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded ml-1">Vagas</span></Link></li>
                            <li><Link href="/imprensa" className="hover:text-white transition-colors">Imprensa</Link></li>
                            <li><Link href="/contato" className="hover:text-white transition-colors">Fale Conosco</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider">Conteúdo</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/materiais" className="hover:text-white transition-colors">E-books e Guias</Link></li>
                            <li><Link href="/calculadora" className="hover:text-white transition-colors">Calculadora de Taxas</Link></li>
                            <li><Link href="/glossario" className="hover:text-white transition-colors">Glossário Financeiro</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider">Social</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></Link>
                            <Link href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></Link>
                            <Link href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 hover:text-white transition-colors"><Youtube className="w-5 h-5" /></Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-16 mt-16 border-t border-zinc-900 text-xs md:text-sm">
                    <p>&copy; {new Date().getFullYear()} Antecipy Tecnologia Financeira Ltda. CNPJ 00.000.000/0001-00</p>
                    <div className="flex gap-6">
                        <Link href="/termos" className="hover:text-white transition-colors">Termos de uso</Link>
                        <Link href="/privacidade" className="hover:text-white transition-colors">Política de privacidade</Link>
                        <Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
