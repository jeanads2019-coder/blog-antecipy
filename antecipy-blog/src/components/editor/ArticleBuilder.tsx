
"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ReactMarkdown from 'react-markdown'
import { Sparkles, Loader2, Save, Eye, Edit3, Wand2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ArticleBuilderProps {
    initialContent?: string;
    onSave?: (content: string) => void;
}

export function ArticleBuilder({ initialContent = '', onSave }: ArticleBuilderProps) {
    const { toast } = useToast()
    const [topic, setTopic] = useState('')
    const [keyword, setKeyword] = useState('')
    const [audience, setAudience] = useState('')
    const [content, setContent] = useState(initialContent)
    const [isGenerating, setIsGenerating] = useState(false)
    const [activeTab, setActiveTab] = useState('editor')

    const handleGenerate = async () => {
        if (!topic || !keyword) {
            toast({
                title: "Campos obrigatórios",
                description: "Preencha o tópico e a palavra-chave.",
                variant: "destructive"
            })
            return
        }

        setIsGenerating(true)
        try {
            const response = await fetch('/api/admin/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, keyword, targetAudience: audience })
            })

            const data = await response.json()
            if (data.markdown) {
                setContent(data.markdown)
                toast({
                    title: "Artigo Gerado!",
                    description: "O conteúdo segue o padrão estratégico Inlead.",
                })
            } else {
                throw new Error(data.error || 'Erro na geração')
            }
        } catch (error) {
            toast({
                title: "Erro na geração",
                description: "Não foi possível gerar o artigo no momento.",
                variant: "destructive"
            })
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4">
            {/* Sidebar de Configuração IA */}
            <aside className="lg:col-span-3 space-y-6">
                <Card className="border-primary/20 shadow-lg">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            Geração IA
                        </CardTitle>
                        <CardDescription>Padrão Estratégico Antecipy</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="topic">Tema do Artigo</Label>
                            <Input
                                id="topic"
                                placeholder="Ex: Capital de Giro"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="keyword">Palavra-Chave SEO</Label>
                            <Input
                                id="keyword"
                                placeholder="Ex: antecipação de recebíveis"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="audience">Público Alvo</Label>
                            <Input
                                id="audience"
                                placeholder="Ex: Gestores de Frota"
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                            />
                        </div>
                        <Button
                            className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-bold"
                            onClick={handleGenerate}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Gerando...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="mr-2 h-4 w-4" />
                                    Gerar com IA
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </aside>

            {/* Área do Editor/Preview */}
            <main className="lg:col-span-9 space-y-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="flex items-center justify-between mb-4">
                        <TabsList className="grid grid-cols-2 w-[200px]">
                            <TabsTrigger value="editor" className="flex items-center gap-2">
                                <Edit3 className="h-4 w-4" />
                                Editor
                            </TabsTrigger>
                            <TabsTrigger value="preview" className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                Preview
                            </TabsTrigger>
                        </TabsList>

                        <Button
                            variant="outline"
                            className="border-green-500/50 hover:bg-green-50 text-green-700"
                            onClick={() => onSave && onSave(content)}
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Salvar Artigo
                        </Button>
                    </div>

                    <TabsContent value="editor" className="mt-0 ring-offset-background focus-visible:outline-none">
                        <Textarea
                            className="min-h-[600px] font-mono p-6 resize-none bg-background border-muted shadow-inner leading-relaxed focus:ring-1"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="O conteúdo do seu artigo aparecerá aqui..."
                        />
                    </TabsContent>

                    <TabsContent value="preview" className="mt-0">
                        <Card className="min-h-[600px] border-none shadow-none">
                            <CardContent className="p-0">
                                <div className="prose prose-blue prose-lg max-w-none dark:prose-invert p-8 bg-white dark:bg-zinc-950 border rounded-lg shadow-sm">
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
