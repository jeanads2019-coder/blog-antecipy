
import Link from 'next/link'
import { Instagram, Linkedin, Youtube, ArrowRight, ShieldCheck, Facebook, MessageCircle } from 'lucide-react'

export function Footer() {
    return (
        <footer className="w-full bg-[#F7FBFC] text-zinc-600 border-t border-zinc-200">
            {/* Top Section - Newsletter & Brand */}
            <div className="container mx-auto px-6 py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16 border-b border-zinc-200 pb-16">
                    <div className="space-y-6">
                        <img src="/logo-new.png" alt="Antecipy" className="h-10 md:h-12 w-auto object-contain" />
                        <p className="text-lg md:text-xl font-medium text-zinc-700 max-w-md leading-relaxed">
                            Impulsionando o crescimento de empresas com soluções financeiras inteligentes e antecipação de recebíveis.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-bold uppercase tracking-wider border border-green-500/20">
                                <ShieldCheck className="w-3.5 h-3.5" /> Site Seguro
                            </span>
                            <span className="text-zinc-300 text-sm">•</span>
                            <span className="text-zinc-500 text-sm">Desde 2024</span>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-zinc-200 shadow-sm">
                        <h3 className="text-zinc-900 text-lg font-bold mb-2">Domine o Fluxo de Caixa</h3>
                        <p className="text-zinc-500 mb-6 text-sm">Receba estratégias exclusivas de antecipação e gestão financeira usadas por líderes de mercado.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Seu e-mail corporativo"
                                className="flex-1 bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-zinc-400"
                            />
                            <button className="bg-primary text-white px-5 py-3 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 group shadow-sm shadow-primary/20">
                                Assinar <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-14">
                    <div className="space-y-4">
                        <h4 className="text-zinc-900 font-bold text-sm uppercase tracking-wider">Sobre</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="https://antecipy.com.br/sobre-nos" target="_blank" className="hover:text-primary transition-colors">Sobre Nós</Link></li>
                            <li><Link href="https://antecipy.com.br/central-de-ajuda" target="_blank" className="hover:text-primary transition-colors">Central de Ajuda</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-zinc-900 font-bold text-sm uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="https://antecipy.com.br/termos-de-uso" target="_blank" className="hover:text-primary transition-colors">Termos de Uso</Link></li>
                            <li><Link href="https://antecipy.com.br/privacidade" target="_blank" className="hover:text-primary transition-colors">Privacidade</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-zinc-900 font-bold text-sm uppercase tracking-wider">Conteúdo</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-primary transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-zinc-900 font-bold text-sm uppercase tracking-wider">Social</h4>
                        <div className="flex flex-wrap gap-3">
                            <Link href="https://www.instagram.com/antecipy/" target="_blank" className="p-2 bg-white border border-zinc-200 rounded-full hover:border-primary/30 hover:text-primary transition-all shadow-sm" title="Instagram">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="https://x.com/antecipy" target="_blank" className="p-2 bg-white border border-zinc-200 rounded-full hover:border-primary/30 hover:text-primary transition-all shadow-sm" title="X (Twitter)">
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5" fill="currentColor">
                                    <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
                                </svg>
                            </Link>
                            <Link href="https://www.facebook.com/profile.php?id=61580893083548" target="_blank" className="p-2 bg-white border border-zinc-200 rounded-full hover:border-primary/30 hover:text-primary transition-all shadow-sm" title="Facebook">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="https://www.youtube.com/@Antecipy" target="_blank" className="p-2 bg-white border border-zinc-200 rounded-full hover:border-primary/30 hover:text-primary transition-all shadow-sm" title="YouTube">
                                <Youtube className="w-5 h-5" />
                            </Link>
                            <Link href="https://linkedin.com/company/antecipy" target="_blank" className="p-2 bg-white border border-zinc-200 rounded-full hover:border-primary/30 hover:text-primary transition-all shadow-sm" title="LinkedIn">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link href="https://api.whatsapp.com/send?phone=5511919310064" target="_blank" className="p-2 bg-white border border-zinc-200 rounded-full hover:border-primary/30 hover:text-primary transition-all shadow-sm" title="WhatsApp">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-16 mt-16 border-t border-zinc-200 text-xs md:text-sm">
                    <p className="text-zinc-500">&copy; 2026 Antecipy</p>
                    <div className="flex gap-6">
                        <Link href="https://antecipy.com.br/termos-de-uso" target="_blank" className="hover:text-primary transition-colors">Termos de uso</Link>
                        <Link href="https://antecipy.com.br/privacidade" target="_blank" className="hover:text-primary transition-colors">Política de privacidade</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
