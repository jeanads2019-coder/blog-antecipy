
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Linkedin, Youtube, MessageCircle, Phone, User } from 'lucide-react'

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="w-full z-50 flex flex-col items-center">
            {/* Top Bar - Institutional */}
            {!isScrolled && (
                <div className="w-full bg-zinc-50/50 border-b py-2 hidden md:block">
                    <div className="container flex justify-between items-center text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-widest px-4">
                        <div className="flex items-center space-x-6">
                            <Link href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
                                <Phone className="h-3 w-3" /> Suporte ao Cliente
                            </Link>
                            <Link href="#" className="flex items-center gap-2 hover:text-green-600 transition-colors text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                <MessageCircle className="h-3 w-3" /> Chame no WhatsApp
                            </Link>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-4 pr-6 border-r">
                                <Link href="#" className="hover:text-primary transition-colors"><Instagram className="h-3.5 w-3.5" /></Link>
                                <Link href="#" className="hover:text-primary transition-colors"><Linkedin className="h-3.5 w-3.5" /></Link>
                                <Link href="#" className="hover:text-primary transition-colors"><Youtube className="h-3.5 w-3.5" /></Link>
                            </div>
                            <Link href="#" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                                <User className="h-3.5 w-3.5" /> Login / Cadastre-se
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Animated Header */}
            <motion.header
                initial={false}
                animate={{
                    width: isScrolled ? "90%" : "100%",
                    marginTop: isScrolled ? "20px" : "0px",
                    borderRadius: isScrolled ? "999px" : "0px",
                    maxWidth: isScrolled ? "1000px" : "100%",
                }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className={`sticky top-0 z-50 bg-white shadow-sm border-b overflow-hidden
                    ${isScrolled ? 'fixed top-4 border shadow-xl bg-white/80 backdrop-blur-md' : 'relative'}
                `}
            >
                <div className="container flex h-16 md:h-20 items-center justify-between px-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 shrink-0">
                        <img src="/logo.svg" alt="Antecipy" className="h-7 md:h-9 w-auto dark:brightness-200" />
                    </Link>

                    {/* Navigation - Our specific texts */}
                    <nav className="flex items-center space-x-4 md:space-x-12 text-[13px] font-bold uppercase tracking-tight">
                        <Link href="/" className="transition-colors hover:text-primary text-zinc-900 border-b-2 border-primary pb-0.5">Blog</Link>
                        <Link href="/funcionalidades" className="transition-colors hover:text-primary text-zinc-400">Como funciona</Link>
                        <Link href="/sobre" className="transition-colors hover:text-primary text-zinc-400">Sobre</Link>
                    </nav>

                    <div className="hidden lg:flex items-center space-x-4 shrink-0">
                        {/* Espaço para manter o equilíbrio visual do centro */}
                        <div className="w-24" />
                    </div>
                </div>
            </motion.header>
        </div>
    )
}
