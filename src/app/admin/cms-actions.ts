
'use server'

import { createClient } from '@/lib/supabase-server'
import { generateArticle, AIArticleParams } from '@/lib/cms/ai'
import { analyzeSEO } from '@/lib/cms/seo'
import { revalidatePath, revalidateTag } from 'next/cache'


import { ArticleGeneratorService } from '@/services/article-generator'

// AI Generation
export async function generateArticleAction(params: AIArticleParams & { keyword?: string }) {
    const supabase = await createClient()

    // Check permissions
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    // Generate using the Strategic Engine
    const markdown = await ArticleGeneratorService.generate({
        topic: params.topic,
        keyword: params.keyword || params.topic,
        targetAudience: params.targetAudience,
        objective: params.objective,
        tone: params.tone
    });

    // Extract basic meta for the existing form
    const markdownLines = markdown.split('\n');
    const titleLine = markdownLines.find(l => l.startsWith('# '));
    const title = titleLine ? titleLine.replace('# ', '').trim() : params.topic;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Summary/Excerpt extraction (find first paragraph that isn't a header)
    const firstParagraph = markdownLines.find(l => l.trim().length > 20 && !l.startsWith('#')) || '';
    const excerpt = firstParagraph.substring(0, 160).trim() + (firstParagraph.length > 160 ? '...' : '');

    return {
        title,
        slug,
        excerpt,
        content: markdown,
        tags: [params.keyword || params.topic, 'Estratégia', 'Antecipy']
    }
}

// SEO Analysis
export async function runSEOAnalysis(postId: string, content: string, title: string, keyword?: string) {
    const supabase = await createClient()

    // Analyze
    const analysis = analyzeSEO(content, title, keyword)

    // Save to DB
    await supabase.from('seo_scores').insert({
        post_id: postId,
        total_score: analysis.score,
        readability_score: analysis.readability === 'Alta' ? 100 : analysis.readability === 'Média' ? 50 : 0,
        keyword_density: { keyword, density: 'calculated_in_client_lib' }, // Simplified
        warnings: analysis.warnings
    })

    return analysis
}

// Newsletter
export async function scheduleNewsletter(postId: string) {
    const supabase = await createClient()

    await supabase.from('newsletter_queue').insert({
        post_id: postId,
        status: 'pending'
    })

    return { success: true }
}

// Distribution
export async function scheduleDistribution(postId: string, platforms: string[]) {
    const supabase = await createClient()

    const inserts = platforms.map(p => ({
        post_id: postId,
        platform: p,
        status: 'pending'
    }))

    await supabase.from('distribution_queue').insert(inserts)

    return { success: true }
}

// Versioning
export async function saveVersion(postId: string, content: string, title?: string) {
    const supabase = await createClient()

    await supabase.from('content_versions').insert({
        post_id: postId,
        content_md: content,
        title: title
    })
}
