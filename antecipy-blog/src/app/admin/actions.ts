
'use server'

import { createClient } from '@/lib/supabase-server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
    const supabase = await createClient()

    // Extract data
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const coverUrl = formData.get('cover_image_url') as string
    const categoryId = formData.get('category_id') as string
    const status = formData.get('status') as string
    const publishedAt = formData.get('published_at') as string

    // Validation (Simple)
    if (!title || !slug || !content || !categoryId) {
        return { error: "Campos obrigatórios faltando." }
    }

    const postData = {
        title,
        slug,
        excerpt,
        content_md: content,
        cover_image_url: coverUrl,
        category_id: categoryId,
        status,
        published_at: status === 'published' && !publishedAt ? new Date().toISOString() : publishedAt,
        author_name: 'Equipe Antecipy', // Hardcoded for now
        updated_at: new Date().toISOString()
    }

    const { error } = await supabase.from('posts').insert(postData)

    if (error) {
        return { error: error.message }
    }

    // Revalidate Config
    // revalidateTag('blog-posts')
    revalidatePath('/blog', 'page')

    // Redirect
    redirect('/admin')
}
