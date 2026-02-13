
export interface Category {
    id: string
    name: string
    slug: string
}

export interface Post {
    id: string
    title: string
    slug: string
    excerpt: string
    content_md?: string
    content_html?: string
    cover_image_url: string
    category?: Category
    category_id?: string
    tags: string[]
    author_name: string
    status: 'draft' | 'published' | 'scheduled' | 'archived'
    published_at: string | null
    created_at: string
    updated_at: string
}
