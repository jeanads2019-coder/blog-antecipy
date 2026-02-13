
import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusCircle, LogOut } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/admin/login')
    }

    // Fetch posts
    const { data: posts } = await supabase
        .from('posts')
        .select(`
      *,
      category:categories(name)
    `)
        .order('created_at', { ascending: false })

    return (
        <div className="container py-10">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Gerencie suas publicações.</p>
                </div>
                <div className="flex gap-4">
                    <form action="/auth/signout" method="post">
                        <Button variant="outline" className="gap-2">
                            <LogOut className="h-4 w-4" />
                            Sair
                        </Button>
                    </form>
                    <Button asChild>
                        <Link href="/admin/posts/new">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Novo Artigo
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts?.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium">{post.title}</TableCell>
                                <TableCell>
                                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                        {post.status === 'published' ? 'Publicado' : post.status === 'draft' ? 'Rascunho' : post.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{post.category?.name}</TableCell>
                                <TableCell>
                                    {post.published_at
                                        ? format(new Date(post.published_at), "d MMM, yyyy", { locale: ptBR })
                                        : '-'
                                    }
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/admin/posts/${post.id}`}>Editar</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {(!posts || posts.length === 0) && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                    Nenhum artigo encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
