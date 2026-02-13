import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Blog Antecipy</h1>
      <p className="text-xl text-muted-foreground mb-8">Notícias e dicas sobre antecipação de recebíveis.</p>
      <Link href="/blog">
        <Button size="lg" className="rounded-full px-8">Ver Blog</Button>
      </Link>
    </div>
  )
}
