
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Post } from '@/lib/types'

interface PostCardProps {
    post: Post
}

export function PostCard({ post }: PostCardProps) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block h-full">
            <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-shadow bg-background/50 backdrop-blur-sm">
                <div className="relative aspect-video w-full overflow-hidden">

                    <Image
                        src={post.cover_image_url || '/placeholder.svg'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                </div>
                <CardContent className="p-6">
                    <div className="flex gap-2 mb-3">
                        {post.category && (
                            <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground hover:bg-secondary/20">
                                {post.category.name}
                            </Badge>
                        )}
                        {post.tags?.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 border-primary/20">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                    <div className="text-muted-foreground text-sm line-clamp-3 prose prose-zinc prose-sm dark:prose-invert">
                        <ReactMarkdown
                            allowedElements={['p', 'strong', 'em', 'span', 'b', 'i']} // Limit elements for safety in cards
                            components={{
                                p: ({ node, ...props }) => <span {...props} /> // Render p as span to avoid nesting issues if simple text
                            }}
                        >
                            {post.excerpt}
                        </ReactMarkdown>
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 text-xs text-muted-foreground flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span>{post.author_name}</span>
                    </div>
                    {post.published_at && (
                        <time dateTime={post.published_at}>
                            {format(new Date(post.published_at), "d 'de' MMMM, yyyy", { locale: ptBR })}
                        </time>
                    )}
                </CardFooter>
            </Card>
        </Link>
    )
}
