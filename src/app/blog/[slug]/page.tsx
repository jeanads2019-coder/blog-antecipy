
import { getPostBySlug, getRelatedPosts } from "@/lib/api"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PostCard } from "@/components/blog/PostCard"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb"
import { Twitter, Linkedin } from "lucide-react"
import { AnalyticsTracker } from "@/components/cms/AnalyticsTracker"


// Mock share buttons (replace with real share URLs later)
const ShareButtons = ({ title, slug }: { title: string, slug: string }) => {
    const url = `https://blog.antecipy.com.br/blog/${slug}`
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    return (
        <div className="flex gap-2">
            <Button variant="outline" size="icon" asChild>
                <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                </a>
            </Button>
            {/* WhatsApp would be nice too */}
            <Button variant="outline" size="icon" asChild>
                <a href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16"> <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" /> </svg>
                </a>
            </Button>
        </div>
    )
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    // Related Posts Logic
    const relatedPosts = await getRelatedPosts(post.id, post.category?.id)

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        image: post.cover_image_url,
        datePublished: post.published_at,
        author: {
            '@type': 'Organization', // Or Person
            name: post.author_name
        }
    }

    return (
        <div className="container py-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <AnalyticsTracker postId={post.id} />

            {/* Breadcrumb */}
            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{post.title.substring(0, 30)}...</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <article className="max-w-4xl mx-auto">
                <div className="space-y-4 text-center mb-8">
                    <div className="flex justify-center gap-2">
                        {post.category && <Badge>{post.category.name}</Badge>}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground md:leading-[1.1]">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-muted-foreground">
                        <span>{post.author_name}</span>
                        <span>•</span>
                        <time dateTime={post.published_at || ""}>
                            {post.published_at ? format(new Date(post.published_at), "d 'de' MMMM, yyyy", { locale: ptBR }) : ''}
                        </time>
                    </div>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-10 shadow-lg">
                    <Image
                        src={post.cover_image_url || '/placeholder.svg'}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-10">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <ReactMarkdown>{post.content_md || ''}</ReactMarkdown>

                    </div>

                    <aside className="space-y-8">
                        <div className="sticky top-24 space-y-6">


                            <div>
                                <h3 className="font-semibold mb-4">Compartilhar</h3>
                                <ShareButtons title={post.title} slug={post.slug} />
                            </div>
                        </div>
                    </aside>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <div className="mt-20 pt-10 border-t">
                    <h2 className="text-2xl font-bold mb-6">Veja também</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedPosts.map(p => <PostCard key={p.id} post={p} />)}
                    </div>
                </div>
            )}
        </div>
    )
}
