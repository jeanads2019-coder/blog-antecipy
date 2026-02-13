
'use client'

import { ArticleBuilder } from '@/components/editor/ArticleBuilder'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'
import { useToast } from '@/hooks/use-toast'

export default function ArticleBuilderPage() {
    const router = useRouter()
    const { toast } = useToast()

    const handleSave = async (content: string) => {
        try {
            // Extrair título do markdown (simplificado)
            const titleMatch = content.match(/^# (.*)/m)
            const title = titleMatch ? titleMatch[1] : 'Artigo sem título'
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

            const supabase = createClient()
            const { error } = await supabase.from('posts').insert({
                title,
                slug,
                content_md: content,
                status: 'draft',
                author_name: 'Editor Estratégico IA',
                excerpt: 'Artigo gerado via Article Builder Engine.',
                updated_at: new Date().toISOString()
            })

            if (error) throw error

            toast({
                title: "Artigo Salvo",
                description: "O rascunho foi criado com sucesso no banco de dados."
            })
            router.push('/admin')
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Erro ao salvar",
                description: error.message
            })
        }
    }

    return (
        <div className="min-h-screen bg-zinc-50/50">
            <header className="border-b bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold text-zinc-900">Article Builder Engine</h1>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Padrão Inlead Digital v2.0</p>
                    </div>
                </div>
            </header>

            <div className="max-w-[1600px] mx-auto">
                <ArticleBuilder onSave={handleSave} />
            </div>
        </div>
    )
}
