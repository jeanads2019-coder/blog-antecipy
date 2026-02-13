'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Zap, BarChart3, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function SobrePage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    }

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <main className="min-h-screen bg-white overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-6">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={stagger}
                    className="max-w-4xl mx-auto text-center space-y-8"
                >
                    <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest border border-blue-100">
                        Quem somos
                    </motion.div>

                    <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-black text-zinc-900 tracking-tight leading-[1.1]">
                        Transformando o futuro financeiro de <span className="text-primary">empresas</span>.
                    </motion.h1>

                    <motion.p variants={fadeIn} className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                        A Antecipy nasceu com o propósito de descomplicar o acesso ao crédito e acelerar o fluxo de caixa de negócios que movem o Brasil.
                    </motion.p>
                </motion.div>
            </section>

            {/* Values Grid */}
            <section className="py-20 bg-zinc-50 border-y border-zinc-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {[
                            {
                                icon: Zap,
                                title: "Agilidade Real",
                                description: "Processos desburocratizados para que você receba seus recursos quando mais precisa: agora."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Segurança Total",
                                description: "Tecnologia de ponta e protocolos rigorosos para garantir a integridade de cada transação."
                            },
                            {
                                icon: BarChart3,
                                title: "Inteligência de Dados",
                                description: "Soluções que vão além do crédito, oferecendo insights para a saúde financeira do seu negócio."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-white mb-6">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 mb-3">{item.title}</h3>
                                <p className="text-zinc-500 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-square rounded-3xl bg-zinc-900 overflow-hidden relative">
                            {/* Placeholder for an image - using a clean gradient/pattern if no image available */}
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
                                <span className="text-zinc-700 font-bold text-9xl select-none opacity-20">A</span>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-white p-8 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center border border-zinc-100">
                            <span className="text-4xl font-black text-primary block mb-1">2024</span>
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Ano de fundação</span>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 space-y-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">Nossa História</h2>
                            <div className="space-y-6 text-zinc-600 leading-relaxed text-lg">
                                <p>
                                    Em um cenário onde o acesso ao capital de giro muitas vezes é lento e burocrático, identificamos a necessidade de uma solução que falasse a língua do empreendedor moderno.
                                </p>
                                <p>
                                    Fundada em 2024, a Antecipy combina expertise financeira com tecnologia proprietária para criar uma plataforma de antecipação de recebíveis transparente, justa e incrivelmente rápida.
                                </p>
                                <p>
                                    Acreditamos que o fluxo de caixa não deve ser um gargalo, mas sim um motor de crescimento. Por isso, trabalhamos todos os dias para simplificar a vida de quem empreende.
                                </p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Link href="/contato" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                                Fale com um especialista <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-zinc-900 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Pronto para acelerar seu negócio?</h2>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        Descubra como a Antecipy pode otimizar seu fluxo de caixa hoje mesmo.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link href="/contato" className="bg-white text-zinc-950 px-8 py-4 rounded-full font-bold hover:bg-zinc-100 transition-colors">
                            Começar agora
                        </Link>
                        <Link href="/" className="px-8 py-4 rounded-full font-bold border border-zinc-800 hover:bg-zinc-800 transition-colors">
                            Ler nosso blog
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
