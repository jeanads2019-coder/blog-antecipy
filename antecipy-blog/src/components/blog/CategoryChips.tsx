
'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Category } from '@/lib/types'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface CategoryChipsProps {
    categories: Category[]
}

export function CategoryChips({ categories }: CategoryChipsProps) {
    const searchParams = useSearchParams()
    const currentCategory = searchParams.get('category') || 'todas'

    return (
        <div className="flex w-full overflow-x-auto pb-4 gap-2 no-scrollbar mask-gradient-x">
            <Link href="/blog">
                <Badge
                    variant={currentCategory === 'todas' || !currentCategory ? 'default' : 'outline'}
                    className={cn(
                        "cursor-pointer px-4 py-1 whitespace-nowrap text-sm font-medium transition-colors h-9 rounded-full",
                        (currentCategory === 'todas' || !currentCategory)
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "bg-background hover:bg-muted"
                    )}
                >
                    Todas
                </Badge>
            </Link>

            {categories.filter(c => c.slug !== 'todas').map(cat => (
                <Link key={cat.id} href={`/blog?category=${cat.slug}`}>
                    <Badge
                        variant={currentCategory === cat.slug ? 'default' : 'outline'}
                        className={cn(
                            "cursor-pointer px-4 py-1 whitespace-nowrap text-sm font-medium transition-colors h-9 rounded-full",
                            currentCategory === cat.slug
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "bg-background hover:bg-muted"
                        )}
                    >
                        {cat.name}
                    </Badge>
                </Link>
            ))}
        </div>
    )
}
