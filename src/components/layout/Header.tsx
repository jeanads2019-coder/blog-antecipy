
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, MessageCircle, Mail } from 'lucide-react'
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
    ]

    return (
        <div className="w-full relative">
            {/* 1. HEADER ESTÁTICO (Fica no fluxo da página) */}
            <header className={`w-full bg-white z-40 transition-all duration-500 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                {/* Top Bar */}
                <div className="w-full bg-zinc-50/50 border-b border-zinc-100 py-2.5 px-6">
                    <div className="container mx-auto flex justify-between items-center text-[10px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                        <div className="flex items-center space-x-6">
                            <Link href="mailto:suporte@antecipy.com.br" className="flex items-center gap-2 hover:text-primary transition-colors">
                                <Mail className="h-3 w-3" /> suporte@antecipy.com.br
                            </Link>
                            <Link href="https://wa.me/5511919310064" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-600 transition-colors text-green-700 bg-green-100/30 px-3 py-1 rounded-full border border-green-200/50">
                                <MessageCircle className="h-3 w-3" /> WhatsApp
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="https://www.instagram.com/antecipy/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Instagram className="h-3.5 w-3.5" /></Link>
                        </div>
                    </div>
                </div>

                {/* Main Nav (Static) */}
                <div className="container mx-auto h-20 md:h-24 flex items-center justify-between px-4 md:px-6 border-b border-zinc-100/80">
                    <Link href="/" className="shrink-0 transition-transform hover:scale-105">
                        <img
                            src="/logo.svg"
                            alt="Antecipy"
                            className="h-10 md:h-12 w-auto object-contain"
                        />
                    </Link>

                    <nav className="flex items-center space-x-8 md:space-x-12 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition-all hover:text-primary relative group ${pathname === link.href ? 'text-primary' : ''}`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-transform origin-left scale-x-0 group-hover:scale-x-100 ${pathname === link.href ? 'scale-x-100' : ''}`} />
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
                        className="fixed top-0 left-1/2 z-[100] w-full max-w-[95%] md:w-auto flex justify-center pointer-events-auto"
                    >
                        <header className="bg-white/85 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] px-6 md:px-10 h-16 md:h-20 rounded-full flex items-center justify-between w-full md:w-auto gap-8 md:gap-20">
                            <Link href="/" className="shrink-0 transition-transform hover:scale-105">
                                <img
                                    src="/logo.svg"
                                    alt="Antecipy"
                                    className="h-7 md:h-9 w-auto object-contain"
                                />
                            </Link>

                            <nav className="flex items-center space-x-6 md:space-x-12 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-600">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`transition-all hover:text-primary whitespace-nowrap relative group ${pathname === link.href ? 'text-primary' : ''}`}
                                    >
                                        {link.name}
                                        <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-transform origin-left scale-x-0 group-hover:scale-x-100 ${pathname === link.href ? 'scale-x-100' : ''}`} />
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
