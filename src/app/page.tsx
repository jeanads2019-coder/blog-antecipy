
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

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Antecipy',
    description: 'Dicas sobre antecipação de salário, finanças pessoais e direitos do trabalhador CLT.',
    url: 'https://blog.antecipy.com.br',
    publisher: {
      '@type': 'Organization',
      name: 'Antecipy',
      url: 'https://antecipy.com.br',
    },
  }

  return (
    <div className="min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-white">
        <div className="container relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Conteúdo Atualizado
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-zinc-900 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Inteligência Financeira para <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Trabalhadores CLT</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Descubra como a antecipação de salário pode transformar sua vida financeira, conheça seus direitos e domine suas finanças com a Antecipy.
          </p>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] bg-emerald-50 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[10%] w-[300px] h-[300px] bg-zinc-50 rounded-full blur-[80px]" />
        </div>
      </section>

      <div className="container space-y-12">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-zinc-50/50 p-4 rounded-3xl border border-zinc-100 backdrop-blur-sm">
            <div className="w-full md:flex-1 min-w-0">
              <Suspense fallback={<div className="h-10 w-full animate-pulse bg-muted rounded-full" />}>
                <CategoryChips categories={categories} />
              </Suspense>
            </div>
            <div className="w-full md:w-auto shrink-0">
              <SearchInput />
            </div>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-zinc-50 rounded-[2.5rem] border border-dashed border-zinc-200">
              <div className="max-w-xs mx-auto space-y-4">
                <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto shadow-sm flex items-center justify-center">
                   <svg className="w-8 h-8 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                </div>
                <p className="text-zinc-500 font-medium">Nenhum artigo encontrado para sua busca.</p>
                <button 
                   onClick={() => window.location.href = '/'}
                   className="text-primary font-bold text-sm hover:underline"
                >
                  Ver todos os posts
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
