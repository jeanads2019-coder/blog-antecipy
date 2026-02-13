
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
