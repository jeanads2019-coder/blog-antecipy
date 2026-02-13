
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, Youtube, MessageCircle, Phone } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="w-full z-50 flex flex-col items-center">
            {/* Top Bar - Institutional */}
            <div className={`w-full bg-zinc-50 border-b py-2 transition-all duration-300 ${isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}`}>
                <div className="container flex justify-between items-center text-[10px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-widest px-6">
                    <div className="flex items-center space-x-6">
                        <Link href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
                            <Phone className="h-3 w-3" /> Suporte
                        </Link>
                        <Link href="#" className="flex items-center gap-2 hover:text-green-600 transition-colors text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                            <MessageCircle className="h-3 w-3" /> WhatsApp
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="#" className="hover:text-primary transition-colors"><Instagram className="h-3.5 w-3.5" /></Link>
                        <Link href="#" className="hover:text-primary transition-colors"><Linkedin className="h-3.5 w-3.5" /></Link>
                        <Link href="#" className="hover:text-primary transition-colors"><Youtube className="h-3.5 w-3.5" /></Link>
                    </div>
                </div>
            </div>

            {/* Main Animated Header */}
            <div className={`w-full flex justify-center sticky top-0 md:top-4 z-50 px-4 transition-all duration-500 ${isScrolled ? 'pt-2' : 'pt-0'}`}>
                <motion.header
                    initial={false}
                    animate={{
                        width: isScrolled ? "95%" : "100%",
                        maxWidth: isScrolled ? "1100px" : "100%",
                        borderRadius: isScrolled ? "100px" : "0px",
                        boxShadow: isScrolled ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" : "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                    }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    className={`bg-white/90 backdrop-blur-md border border-zinc-200/50 flex items-center justify-center
                        ${isScrolled ? 'py-2' : 'py-4 border-x-0 border-t-0 shadow-none'}
                    `}
                >
                    <div className="container flex items-center justify-between px-6 md:px-10">
                        {/* Logo */}
                        <Link href="/" className="flex items-center shrink-0">
                            <img src="/logo.svg" alt="Antecipy" className="h-6 md:h-8 w-auto" />
                        </Link>

                        {/* Navigation */}
                        <nav className="flex items-center space-x-6 md:space-x-10 text-[11px] md:text-[12px] font-bold uppercase tracking-widest">
                            <Link href="/" className={`transition-all hover:text-primary ${pathname === '/' ? 'text-primary' : 'text-zinc-500'}`}>Blog</Link>
                            <Link href="/funcionalidades" className={`transition-all hover:text-primary ${pathname === '/funcionalidades' ? 'text-primary' : 'text-zinc-500'}`}>Como funciona</Link>
                            <Link href="/sobre" className={`transition-all hover:text-primary ${pathname === '/sobre' ? 'text-primary' : 'text-zinc-500'}`}>Sobre</Link>
                        </nav>

                        {/* Visual Balance Spacer */}
                        <div className="hidden sm:block w-8 md:w-32" />
                    </div>
                </motion.header>
            </div>
        </div>
    )
}
