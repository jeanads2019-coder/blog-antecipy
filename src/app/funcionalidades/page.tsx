
import { CheckCircle2, Zap, Shield, TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HowItWorks() {
    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="py-20 bg-zinc-50 border-b">
                <div className="container px-4 text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 max-w-3xl mx-auto">
                        Transforme suas vendas a prazo em <span className="text-primary">capital imediato</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        A Antecipy simplifica o fluxo de caixa da sua empresa. Entenda como nosso motor de antecipação estratégica coloca o dinheiro no seu bolso em minutos.
                    </p>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-24 bg-white">
                <div className="container px-4">
                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connection Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-zinc-100 -translate-y-1/2 z-0" />

                        {[
                            {
                                step: "01",
                                title: "Conecte sua conta",
                                description: "Integração segura com seu ERP ou emissor de notas fiscais em poucos cliques.",
                                icon: <Zap className="h-6 w-6 text-primary" />
                            },
                            {
                                step: "02",
                                title: "Escolha o que antecipar",
                                description: "Selecione as faturas ou recebíveis de cartão que deseja transformar em saldo.",
                                icon: <CheckCircle2 className="h-6 w-6 text-primary" />
                            },
                            {
                                step: "03",
                                title: "Dinheiro na conta",
                                description: "Aprovação instantânea e transferência via PIX para o seu CNPJ.",
                                icon: <TrendingUp className="h-6 w-6 text-primary" />
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="relative z-10 bg-white p-8 rounded-2xl border hover:shadow-xl transition-all duration-300 group">
                                <div className="text-6xl font-black text-zinc-100 absolute -top-4 -right-2 group-hover:text-primary/10 transition-colors">
                                    {item.step}
                                </div>
                                <div className="h-14 w-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-primary/10">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Differential Section */}
            <section className="py-24 bg-zinc-900 text-white overflow-hidden relative">
                <div className="container px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                                Por que empresas de alto crescimento escolhem a Antecipy?
                            </h2>
                            <div className="grid gap-6">
                                {[
                                    {
                                        title: "Taxas Transparentes",
                                        desc: "Sem letras miúdas ou taxas de surpresa. Você vê exatamente o valor líquido.",
                                        icon: <Shield className="h-5 w-5 text-secondary" />
                                    },
                                    {
                                        title: "Inteligência de Limites",
                                        desc: "Nosso algoritmo avalia o histórico e expande seu crédito conforme você opera.",
                                        icon: <TrendingUp className="h-5 w-5 text-secondary" />
                                    }
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-4 p-6 rounded-xl bg-white/5 border border-white/10">
                                        <div className="shrink-0">{feature.icon}</div>
                                        <div>
                                            <h4 className="font-bold mb-1">{feature.title}</h4>
                                            <p className="text-zinc-400 text-sm">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
                            <div className="relative bg-zinc-800 border border-white/10 p-8 rounded-3xl shadow-2xl">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm font-medium">
                                        <span className="text-zinc-400">PMR (Prazo Médio de Recebimento)</span>
                                        <span className="text-secondary">-42 dias</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-secondary w-[75%]" />
                                    </div>
                                    <div className="pt-6">
                                        <p className="text-2xl font-bold">R$ 142.500,00</p>
                                        <p className="text-xs text-zinc-500">Capital liberado hoje pela Antecipy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 text-center">
                <div className="container px-4">
                    <h2 className="text-3xl font-bold mb-8">Pronto para acelerar seu negócio?</h2>
                    <Link href="/blog">
                        <Button size="lg" className="rounded-full px-12 h-14 text-lg">
                            Explorar Artigos Estratégicos <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
