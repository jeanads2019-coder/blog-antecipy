
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Loader2, ArrowLeft, Upload, Save, Smartphone, Sparkles, Files, BarChart2, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase-browser'
import { useToast } from '@/hooks/use-toast'
import ReactMarkdown from 'react-markdown'
import { uploadImage } from '@/lib/storage'
import { generateArticleAction, runSEOAnalysis, scheduleDistribution, scheduleNewsletter } from '../../cms-actions'

export default function NewPostPage() {
    const router = useRouter()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [categories, setCategories] = useState<any[]>([])
    const [mobilePreview, setMobilePreview] = useState(false)

    // CMS States
    const [aiGenerating, setAiGenerating] = useState(false)
    const [seoScore, setSeoScore] = useState<any>(null)
    const [openAiDialog, setOpenAiDialog] = useState(false)

    // Distribution State
    const [distributeNewsletter, setDistributeNewsletter] = useState(false)
    const [distributeLinkedin, setDistributeLinkedin] = useState(false)
    const [distributeInstagram, setDistributeInstagram] = useState(false)

    // AI Form
    const [aiTopic, setAiTopic] = useState('')
    const [aiAudience, setAiAudience] = useState('')
    const [aiObjective, setAiObjective] = useState('')

    // Form State
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [content, setContent] = useState('')
    const [coverUrl, setCoverUrl] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [status, setStatus] = useState('draft')
    const [publishedAt, setPublishedAt] = useState<Date | undefined>(new Date())
    const [tags, setTags] = useState('')

    // Load categories
    useState(() => {
        const fetchCategories = async () => {
            const { data } = await createClient().from('categories').select('*')
            if (data) setCategories(data)
        }
        fetchCategories()
    })

    // Auto-generate slug
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setTitle(val)
        if (!slug) {
            setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
        }
    }

    // AI Generator
    const handleGenerateAI = async () => {
        if (!aiTopic) return
        setAiGenerating(true)
        try {
            const article = await generateArticleAction({
                topic: aiTopic,
                targetAudience: aiAudience || 'Profissionais',
                objective: aiObjective || 'Ensinar',
                tone: 'Profissional'
            })

            setTitle(article.title)
            setSlug(article.slug)
            setExcerpt(article.excerpt)
            setContent(article.content)
            setTags(article.tags.join(', '))

            setOpenAiDialog(false)
            toast({ title: "Conteúdo gerado com sucesso!" })
        } catch (e) {
            toast({ variant: "destructive", title: "Erro na IA", description: "Não foi possível gerar." })
        } finally {
            setAiGenerating(false)
        }
    }

    // SEO Analysis
    const handleAnalyzeSEO = async () => {
        const result = await runSEOAnalysis('temp-id', content, title)
        setSeoScore(result)
    }

    // Save
    const handleSubmit = async (e: React.FormEvent, forceStatus?: string) => {
        e.preventDefault()
        setLoading(true)

        try {
            const supabase = createClient()
            const finalStatus = forceStatus || status
            const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean)

            const postData = {
                title,
                slug,
                excerpt,
                content_md: content,
                cover_image_url: coverUrl,
                category_id: categoryId || null,
                status: finalStatus,
                published_at: finalStatus === 'published' ? (publishedAt || new Date()).toISOString() : null,
                tags: tagsArray,
                author_name: 'Equipe Antecipy',
                updated_at: new Date().toISOString()
            }

            const { data, error } = await supabase.from('posts').insert(postData).select().single()

            if (error) throw error

            // Handle CMS Queues
            if (finalStatus === 'published' && data?.id) {
                if (distributeNewsletter) await scheduleNewsletter(data.id)

                const platforms = []
                if (distributeLinkedin) platforms.push('linkedin')
                if (distributeInstagram) platforms.push('instagram')

                if (platforms.length > 0) await scheduleDistribution(data.id, platforms)
            }

            toast({
                title: finalStatus === 'draft' ? "Rascunho salvo!" : "Artigo publicado!",
                description: "Alterações registradas.",
            })

            router.push('/admin')
            router.refresh()

        } catch (error: any) {
            toast({ variant: "destructive", title: "Erro ao salvar", description: error.message })
        } finally {
            setLoading(false)
        }
    }

    // Cover Upload (Kept same)
    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            console.log('Nenhum arquivo selecionado.');
            return;
        }

        const file = e.target.files[0];
        console.log('Arquivo selecionado:', file.name, 'Tamanho:', file.size, 'Tipo:', file.type);

        setUploading(true)
        try {
            console.log('Iniciando upload para o Supabase...');
            const url = await uploadImage(file)
            if (url) {
                setCoverUrl(url)
                toast({ title: "Imagem enviada com sucesso!" })
            } else {
                toast({ variant: "destructive", title: "Erro no upload", description: "Verifique sua conexão ou as permissões do bucket." })
            }
        } catch (err) {
            toast({ variant: "destructive", title: "Erro no upload" })
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex flex-col h-screen bg-background">
            {/* Top Bar */}
            <header className="border-b px-6 py-3 flex items-center justify-between bg-card z-10 sticky top-0">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-lg font-semibold leading-none">Novo Artigo</h1>
                        <span className="text-xs text-muted-foreground">
                            {status === 'draft' ? 'Rascunho' : 'Publicado'} • {content.length} carac.
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {/* AI Button */}
                    <Dialog open={openAiDialog} onOpenChange={setOpenAiDialog}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                                <Sparkles className="h-4 w-4 text-purple-500" />
                                Gerar com IA
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Gerador de Artigos IA 🤖</DialogTitle>
                                <DialogDescription>Preencha os dados e a IA criará uma base para você.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Tema Principal</Label>
                                    <Input placeholder="Ex: Vantagens de antecipar recebíveis" value={aiTopic} onChange={e => setAiTopic(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Público-Alvo</Label>
                                    <Input placeholder="Ex: Pequenos empresários" value={aiAudience} onChange={e => setAiAudience(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Objetivo</Label>
                                    <Input placeholder="Ex: Convencer a usar o serviço" value={aiObjective} onChange={e => setAiObjective(e.target.value)} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setOpenAiDialog(false)}>Cancelar</Button>
                                <Button onClick={handleGenerateAI} disabled={aiGenerating}>
                                    {aiGenerating ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                                    Gerar Agora
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* SEO Button */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={handleAnalyzeSEO}>
                                <BarChart2 className={cn("h-4 w-4 mr-2", seoScore?.score > 80 ? "text-green-500" : seoScore?.score < 50 ? "text-red-500" : "text-yellow-500")} />
                                SEO {seoScore ? `${seoScore.score}/100` : ''}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Análise SEO</h4>
                                <p className="text-sm text-muted-foreground">Baseado em boas práticas.</p>
                                <div className="h-px bg-border my-2" />
                                {seoScore ? (
                                    <div className="text-sm space-y-2">
                                        <div className="flex justify-between">
                                            <span>Score:</span>
                                            <span className="font-bold">{seoScore.score}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Legibilidade:</span>
                                            <span>{seoScore.readability}</span>
                                        </div>
                                        <div className="h-px bg-border my-2" />
                                        {seoScore.suggestions.length > 0 && (
                                            <div>
                                                <p className="font-semibold mb-1 text-xs uppercase">Sugestões:</p>
                                                <ul className="list-disc pl-4 space-y-1 text-xs text-muted-foreground">
                                                    {seoScore.suggestions.map((s: string, i: number) => <li key={i}>{s}</li>)}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                                        <p className="text-xs text-muted-foreground mt-2">Analisando...</p>
                                    </div>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>

                    <div className="h-6 w-px bg-border mx-2" />

                    {/* Save Actions */}
                    <Button variant="outline" size="sm" onClick={(e) => handleSubmit(e, 'draft')} disabled={loading}>
                        <Save className="mr-2 h-4 w-4" />
                        Draft
                    </Button>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="default" size="sm">Publicar</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Publicar e Distribuir</DialogTitle>
                                <DialogDescription>Escolha canais de distribuição automáticos.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="flex items-center space-x-2 border p-3 rounded hover:bg-muted/50">
                                    <Checkbox id="newsletter" checked={distributeNewsletter} onCheckedChange={(c) => setDistributeNewsletter(!!c)} />
                                    <Label htmlFor="newsletter" className="cursor-pointer flex-1">
                                        <div className="font-medium">Newsletter</div>
                                        <div className="text-xs text-muted-foreground">Enviar email para inscritos</div>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2 border p-3 rounded hover:bg-muted/50">
                                    <Checkbox id="linkedin" checked={distributeLinkedin} onCheckedChange={(c) => setDistributeLinkedin(!!c)} />
                                    <Label htmlFor="linkedin" className="cursor-pointer flex-1">
                                        <div className="font-medium">LinkedIn</div>
                                        <div className="text-xs text-muted-foreground">Postar no perfil da empresa</div>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2 border p-3 rounded hover:bg-muted/50">
                                    <Checkbox id="instagram" checked={distributeInstagram} onCheckedChange={(c) => setDistributeInstagram(!!c)} />
                                    <Label htmlFor="instagram" className="cursor-pointer flex-1">
                                        <div className="font-medium">Instagram & Threads</div>
                                        <div className="text-xs text-muted-foreground">Criar card automático</div>
                                    </Label>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={(e) => handleSubmit(e as any, 'published')} disabled={loading}>
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                                    Confirmar Publicação
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Button variant={mobilePreview ? "secondary" : "ghost"} size="icon" onClick={() => setMobilePreview(!mobilePreview)}>
                        <Smartphone className="h-4 w-4" />
                    </Button>
                </div>
            </header>

            {/* Main Content (Kept almost identical, just added tags description) */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left: Editor Form */}
                <div className="w-1/2 overflow-y-auto p-6 border-r scrollbar-thin">
                    <div className="max-w-2xl mx-auto space-y-6">
                        {/* Title & Slug */}
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Título Principal</Label>
                                <Input
                                    className="text-lg font-bold py-6"
                                    placeholder="Digite o título..."
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-xs text-muted-foreground">URL Slug</Label>
                                <Input
                                    className="font-mono text-xs h-8"
                                    value={slug}
                                    onChange={e => setSlug(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label>Imagem de Capa</Label>
                            <Tabs defaultValue="upload" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-4">
                                    <TabsTrigger value="upload">Upload</TabsTrigger>
                                    <TabsTrigger value="link">Link Direto</TabsTrigger>
                                </TabsList>
                                <TabsContent value="upload">
                                    <div
                                        className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer relative overflow-hidden group min-h-[200px]"
                                        onClick={() => document.getElementById('cover-upload')?.click()}
                                    >
                                        <input
                                            id="cover-upload"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleCoverUpload}
                                        />
                                        {coverUrl ? (
                                            <div className="relative w-full aspect-video rounded overflow-hidden">
                                                <img src={coverUrl} alt="Cover" className="object-cover w-full h-full" />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <span className="text-white font-medium flex items-center gap-2">
                                                        <Upload className="h-4 w-4" /> Trocar imagem
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                                    {uploading ? <Loader2 className="h-6 w-6 animate-spin text-primary" /> : <Upload className="h-6 w-6 text-primary" />}
                                                </div>
                                                <p className="text-sm font-semibold text-zinc-700">Clique para selecionar imagem</p>
                                                <p className="text-xs text-muted-foreground mt-1">PNG, JPG ou WEBP (Recomendado: 1200x630px)</p>
                                                {uploading && <p className="text-xs text-primary font-medium animate-pulse mt-2">Enviando arquivo...</p>}
                                            </>
                                        )}
                                    </div>
                                </TabsContent>
                                <TabsContent value="link">
                                    <div className="space-y-4">
                                        <Input
                                            placeholder="Cole o link da imagem aqui (https://...)"
                                            value={coverUrl}
                                            onChange={(e) => setCoverUrl(e.target.value)}
                                        />
                                        {coverUrl && (
                                            <div className="relative w-full aspect-video rounded overflow-hidden border bg-muted">
                                                <img
                                                    src={coverUrl}
                                                    alt="Preview"
                                                    className="object-cover w-full h-full"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=Erro+ao+carregar+imagem"
                                                    }}
                                                />
                                            </div>
                                        )}
                                        {!coverUrl && (
                                            <div className="w-full aspect-video rounded border-2 border-dashed flex items-center justify-center bg-muted/30">
                                                <p className="text-xs text-muted-foreground">Preview da imagem</p>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Meta Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Categoria</Label>
                                <Select value={categoryId} onValueChange={setCategoryId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>Publicação</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={"outline"} className={cn("justify-start text-left font-normal", !publishedAt && "text-muted-foreground")}>
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {publishedAt ? format(publishedAt, "PPP", { locale: ptBR }) : <span>Imediato</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={publishedAt} onSelect={setPublishedAt} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div className="grid gap-2">
                            <Label>Resumo (SEO & Cards)</Label>
                            <Textarea
                                value={excerpt}
                                onChange={e => setExcerpt(e.target.value)}
                                rows={3}
                            />
                        </div>

                        {/* Tags */}
                        <div className="grid gap-2">
                            <Label>Tags</Label>
                            <Input
                                value={tags}
                                onChange={e => setTags(e.target.value)}
                                placeholder="Separe por vírgulas..."
                            />
                        </div>

                        {/* Content Editor */}
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label>Conteúdo (Markdown)</Label>
                                <span className="text-xs text-muted-foreground">{content.split(/\s+/).length} palavras</span>
                            </div>
                            <Textarea
                                className="font-mono min-h-[500px] leading-relaxed resize-none p-4"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                placeholder="# Escreva aqui..."
                            />
                        </div>
                    </div>
                </div>

                {/* Right: Live Preview */}
                <div className={cn(
                    "w-1/2 bg-muted/20 overflow-y-auto p-8 border-l transition-all duration-300",
                    mobilePreview ? "flex items-center justify-center bg-gray-100" : ""
                )}>
                    {mobilePreview ? (
                        // Mobile Frame
                        <div className="mockup-phone border-gray-800 bg-gray-800 rounded-[3rem] border-[10px] w-[375px] h-[750px] overflow-hidden shadow-2xl relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-gray-800 rounded-b-xl z-20"></div>
                            <div className="bg-white h-full overflow-y-auto scrollbar-hide w-full pb-10">
                                {/* Mobile Content */}
                                <PreviewContent
                                    title={title}
                                    coverUrl={coverUrl}
                                    content={content}
                                    category={categories.find(c => c.id === categoryId)?.name}
                                    date={publishedAt}
                                />
                            </div>
                        </div>
                    ) : (
                        // Desktop Preview
                        <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-sm border p-10 min-h-[90%]">
                            <PreviewContent
                                title={title}
                                coverUrl={coverUrl}
                                content={content}
                                category={categories.find(c => c.id === categoryId)?.name}
                                date={publishedAt}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function PreviewContent({ title, coverUrl, content, category, date }: any) {
    return (
        <article className="prose prose-slate dark:prose-invert max-w-none">
            {category && <span className="text-xs font-bold text-primary tracking-wider uppercase mb-2 block">{category}</span>}
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
                {title || 'Sem título'}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <span>Equipe Antecipy</span>
                <span>•</span>
                <time>{date ? format(date, "d 'de' MMMM, yyyy", { locale: ptBR }) : 'Data...'}</time>
            </div>

            {coverUrl ? (
                <div className="rounded-xl overflow-hidden mb-8 shadow-md">
                    <img src={coverUrl} alt="Cover" className="w-full h-auto object-cover" />
                </div>
            ) : (
                <div className="w-full h-48 bg-muted rounded-xl flex items-center justify-center mb-8 border-2 border-dashed">
                    <p className="text-muted-foreground text-sm">Sem imagem de capa</p>
                </div>
            )}

            <div className="markdown-body">
                <ReactMarkdown>{content || '*O conteúdo aparecerá aqui...*'}</ReactMarkdown>
            </div>
        </article>
    )
}
