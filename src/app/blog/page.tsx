
import { getCategories, getPosts } from "@/lib/api"
import { PostCard } from "@/components/blog/PostCard"
import { CategoryChips } from "@/components/blog/CategoryChips"
import { Suspense } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const categorySlug = params?.category as string | undefined
    const query = params?.q as string | undefined

    // Real Data Fetching
    const postsPromise = getPosts(categorySlug, query)
    const categoriesPromise = getCategories()

    const [posts, categories] = await Promise.all([postsPromise, categoriesPromise])

    return (
        <div className="container min-h-screen py-10 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Blog Antecipy</h1>
                    <p className="text-muted-foreground">
                        Dicas, novidades e tudo sobre antecipação de recebíveis.
                    </p>
                </div>

                {/* Search Input would need client interactivity, here just placeholder or SearchInput component */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Buscar artigos..."
                        className="pl-9 bg-background/50"
                    />
                </div>
            </div>

            {/* Categories */}
            <Suspense fallback={<div className="h-10 w-full animate-pulse bg-muted rounded-full" />}>
                <CategoryChips categories={categories} />
            </Suspense>

            {/* Posts Grid */}
            {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">Nenhum artigo encontrado para sua busca.</p>
                </div>
            )}

            {/* Pagination (TBD: if many items, add Limit/Offset loginc) */}
            <div className="flex justify-center pt-8">
                {/* Simple pagination buttons or "Carregar mais" */}
            </div>
        </div>
    )
}
