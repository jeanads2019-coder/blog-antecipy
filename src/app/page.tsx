
import { getCategories, getPosts } from "@/lib/api"
import { PostCard } from "@/components/blog/PostCard"
import { CategoryChips } from "@/components/blog/CategoryChips"
import { Suspense } from "react"
import { SearchInput } from "@/components/blog/SearchInput"

export const dynamic = 'force-dynamic'

export default async function BlogHomePage({
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
    <div className="container min-h-screen py-10 space-y-12">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center space-y-8 py-12 md:py-20">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-950">
            Blog Antecipy
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 leading-relaxed">
            Acompanhe as novidades e dicas da Antecipy para impulsionar o seu negócio.
          </p>
        </div>

        <SearchInput />
      </div>
      {/* Content Section */}
      <div className="space-y-8">
        {/* Categories */}
        <Suspense fallback={<div className="h-10 w-full animate-pulse bg-muted rounded-full" />}>
          <CategoryChips categories={categories} />
        </Suspense>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-zinc-50 rounded-3xl border border-dashed">
            <p className="text-zinc-400 text-lg">Nenhum artigo encontrado para sua busca.</p>
          </div>
        )}
      </div>
    </div>
  )
}
