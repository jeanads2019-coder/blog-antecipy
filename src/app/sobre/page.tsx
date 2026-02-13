
import { ShieldCheck, Users, Target, Rocket } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="flex flex-col w-full">
            {/* Header Content */}
            <section className="relative py-24 bg-white overflow-hidden">
                <div className="container px-4">
                    <div className="max-w-3xl space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                            Nossa Jornada
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.9]">
                            Descomplicando a <br />
                            <span className="text-secondary">Liberdade Financeira</span> <br />
                            do empreendedor.
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            A Antecipy nasceu com uma missão clara: erradicar a ansiedade do fluxo de caixa. Acreditamos que o tempo entre a venda e o recebimento não deve ser um obstáculo para o crescimento.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats/Values Grid */}
            <section className="py-12 border-y bg-zinc-50">
                <div className="container px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Operações", value: "10k+" },
                            { label: "Clientes", value: "2.5k" },
                            { label: "Segurança", value: "100%" },
                            { label: "Suporte", value: "24/7" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center md:text-left">
                                <p className="text-3xl font-bold text-zinc-900">{stat.value}</p>
                                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24">
                <div className="container px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold">Nossos Pilares</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">Valores que guiam cada linha de código e cada operação financeira na Antecipy.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Ética Radical",
                                desc: "Transparência total em taxas e processos. Sem pegadinhas.",
                                icon: <ShieldCheck className="h-8 w-8 text-primary" />
                            },
                            {
                                title: "Tecnologia Humana",
                                desc: "Algoritmos potentes a serviço de pessoas reais.",
                                icon: <Users className="h-8 w-8 text-primary" />
                            },
                            {
                                title: "Foco no Resultado",
                                desc: "Sua liquidez é o nosso principal indicador de sucesso.",
                                icon: <Target className="h-8 w-8 text-primary" />
                            },
                            {
                                title: "Inovação Ágil",
                                desc: "Evoluímos nosso motor de IA diariamente para você.",
                                icon: <Rocket className="h-8 w-8 text-primary" />
                            }
                        ].map((pilar, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-white border hover:border-primary/20 hover:bg-primary/[0.02] transition-colors group">
                                <div className="mb-6 group-hover:scale-110 transition-transform">{pilar.icon}</div>
                                <h3 className="text-lg font-bold mb-2">{pilar.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{pilar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision Quote */}
            <section className="py-32 bg-primary text-white">
                <div className="container px-4 text-center">
                    <blockquote className="text-3xl md:text-4xl font-serif italic max-w-4xl mx-auto leading-tight">
                        "O capital de giro não deve ser um luxo das grandes corporações, mas o oxigênio de todo pequeno e médio negócio brasileiro."
                    </blockquote>
                    <p className="mt-8 font-bold text-primary-foreground/80 tracking-widest uppercase text-sm">— Squad Antecipy</p>
                </div>
            </section>
        </div>
    )
}
