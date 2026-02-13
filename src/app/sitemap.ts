
import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase-browser'

// This will be called at build time or revalidation
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = createClient()
    const baseUrl = process.env.SITE_URL || 'https://blog.antecipy.com.br'

    // Fetch posts
    const { data: posts } = await supabase
        .from('posts')
        .select('slug, updated_at')
        .eq('status', 'published')

    const postUrls = posts?.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    })) || []

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...postUrls,
    ]
}
