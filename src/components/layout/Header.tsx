
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
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            {/* Background Spacer to prevent content jump */}
            <div className="h-[104px] w-full" />

            <div className="fixed top-0 left-0 w-full z-50 flex flex-col items-center pointer-events-none">
                {/* Top Bar - Institutional */}
                <motion.div
                    initial={false}
                    animate={{
                        height: isScrolled ? 0 : 'auto',
                        opacity: isScrolled ? 0 : 1,
                        marginBottom: isScrolled ? 0 : 0
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="w-full bg-zinc-50 border-b overflow-hidden pointer-events-auto"
                >
                    <div className="container flex justify-between items-center py-2 px-6 text-[10px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                        <div className="flex items-center space-x-6">
                            <Link href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
                                <Phone className="h-3 w-3" /> Suporte
                            </Link>
                            <Link href="#" className="flex items-center gap-2 hover:text-green-600 transition-colors text-green-700 bg-green-100/50 px-2 py-0.5 rounded-full border border-green-200">
                                <MessageCircle className="h-3 w-3" /> WhatsApp
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="#" className="hover:text-primary transition-colors"><Instagram className="h-3.5 w-3.5" /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Linkedin className="h-3.5 w-3.5" /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Youtube className="h-3.5 w-3.5" /></Link>
                        </div>
                    </div>
                </motion.div>

                {/* Main Animated Header / Pill */}
                <div className="w-full flex justify-center px-4 pt-2 md:pt-4 pointer-events-none">
                    <motion.header
                        initial={false}
                        animate={{
                            width: isScrolled ? "fit-content" : "100%",
                            maxWidth: isScrolled ? "600px" : "1200px",
                            borderRadius: isScrolled ? "100px" : "0px",
                            backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 1)",
                            paddingLeft: isScrolled ? "24px" : "40px",
                            paddingRight: isScrolled ? "24px" : "40px",
                            boxShadow: isScrolled
                                ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                                : "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                            y: isScrolled ? 0 : 0,
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20
                        }}
                        className={`backdrop-blur-xl border border-zinc-200/50 flex items-center h-14 md:h-16 pointer-events-auto
                            ${!isScrolled && 'border-x-0 border-t-0 border-b shadow-none'}
                        `}
                    >
                        <div className="flex items-center justify-between w-full gap-8 md:gap-12">
                            {/* Logo */}
                            <Link href="/" className="flex items-center shrink-0">
                                <img
                                    src="/logo.svg"
                                    alt="Antecipy"
                                    className={`transition-all duration-300 ${isScrolled ? 'h-5 md:h-6' : 'h-6 md:h-8'}`}
                                />
                            </Link>

                            {/* Navigation */}
                            <nav className="flex items-center space-x-6 md:space-x-10 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em]">
                                <Link href="/" className={`transition-all hover:text-primary ${pathname === '/' ? 'text-primary' : 'text-zinc-500'}`}>Blog</Link>
                                <Link href="/funcionalidades" className={`transition-all hover:text-primary ${pathname === '/funcionalidades' ? 'text-primary' : 'text-zinc-500'}`}>Como funciona</Link>
                                <Link href="/sobre" className={`transition-all hover:text-primary ${pathname === '/sobre' ? 'text-primary' : 'text-zinc-500'}`}>Sobre</Link>
                            </nav>
                        </div>
                    </motion.header>
                </div>
            </div>
        </>
    )
}
