
import { supabase } from '@/lib/supabase'
import { Category, Post } from '@/lib/types'

export async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

    if (error) {
        console.error('Error fetching categories:', error)
        return []
    }

    // Add 'Todas' manually if not present, though UI handles it
    return data as Category[]
}

export async function getPosts(categorySlug?: string, query?: string): Promise<Post[]> {
    let queryBuilder = supabase
        .from('posts')
        .select(`
      *,
      category:categories(id, name, slug)
    `)
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })

    if (categorySlug && categorySlug !== 'todas') {
        // We need to filter by category slug. 
        // Supabase filtering on joined tables is a bit tricky, normally need !inner join or filter on ID
        // Easiest is to get category ID first or filter on the joined relation
        // Let's try matching on the join first:
        const { data: category } = await supabase.from('categories').select('id').eq('slug', categorySlug).single()
        if (category) {
            queryBuilder = queryBuilder.eq('category_id', category.id)
        }
    }

    if (query) {
        queryBuilder = queryBuilder.ilike('title', `%${query}%`)
    }

    const { data, error } = await queryBuilder

    if (error) {
        console.error('Error fetching posts:', error)
        return []
    }

    return data as Post[]
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const { data, error } = await supabase
        .from('posts')
        .select(`
      *,
      category:categories(id, name, slug)
    `)
        .eq('slug', slug)
        .single()

    if (error) {
        console.error('Error fetching post:', error)
        return null
    }

    return data as Post
}

export async function getRelatedPosts(currentPostId: string, categoryId?: string): Promise<Post[]> {
    if (!categoryId) return []

    const { data, error } = await supabase
        .from('posts')
        .select(`
      *,
      category:categories(id, name, slug)
    `)
        .eq('status', 'published')
        .eq('category_id', categoryId)
        .neq('id', currentPostId)
        .limit(3)

    if (error) {
        console.error('Error fetching related posts:', error)
        return []
    }

    return data as Post[]
}
