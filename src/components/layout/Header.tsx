
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Linkedin, Youtube, MessageCircle, Phone } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Blog', href: '/' },
        { name: 'Sobre', href: '/sobre' },
    ]

    return (
        <div className="w-full relative">
            {/* 1. HEADER ESTÁTICO (Fica no fluxo da página) */}
            <header className={`w-full bg-white z-40 transition-all duration-500 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                {/* Top Bar */}
                <div className="w-full bg-zinc-50 border-b py-2 px-6">
                    <div className="container mx-auto flex justify-between items-center text-[10px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                        <div className="flex items-center space-x-6">
                            <Link href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
                                <Phone className="h-3 w-3" /> Suporte
                            </Link>
                            <Link href="#" className="flex items-center gap-2 hover:text-green-600 transition-colors text-green-700 bg-green-100/30 px-2 py-0.5 rounded-full border border-green-200/50">
                                <MessageCircle className="h-3 w-3" /> WhatsApp
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="https://www.instagram.com/antecipy/" target="_blank" className="hover:text-primary transition-colors"><Instagram className="h-3.5 w-3.5" /></Link>
                        </div>
                    </div>
                </div>

                {/* Main Nav (Static) */}
                <div className="container mx-auto h-20 flex items-center justify-between px-6 border-b border-zinc-100">
                    <Link href="/" className="shrink-0">
                        <img src="/logo.svg" alt="Antecipy" className="h-7 md:h-8 w-auto" />
                    </Link>

                    <nav className="flex items-center space-x-12 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition-all hover:text-primary ${pathname === link.href ? 'text-primary' : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden lg:block w-32" />
                </div>
            </header>

            {/* 2. HEADER FLUTUANTE (PILL) */}
            <AnimatePresence>
                {isScrolled && (
                    <motion.div
                        initial={{ y: -60, x: '-50%', opacity: 0, scale: 0.95 }}
                        animate={{ y: 20, x: '-50%', opacity: 1, scale: 1 }}
                        exit={{ y: -60, x: '-50%', opacity: 0, scale: 0.95 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        className="fixed top-0 left-1/2 z-[100] w-auto pointer-events-auto"
                    >
                        <header className="bg-white/90 backdrop-blur-md border border-zinc-200/50 shadow-lg px-8 md:px-10 h-16 md:h-20 rounded-full flex items-center justify-between gap-12 md:gap-16">
                            <Link href="/" className="shrink-0">
                                <img src="/logo.svg" alt="Antecipy" className="h-4 md:h-5 w-auto" />
                            </Link>

                            <nav className="flex items-center space-x-6 md:space-x-10 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`transition-all hover:text-primary whitespace-nowrap ${pathname === link.href ? 'text-primary' : ''}`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </header>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
