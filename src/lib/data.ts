
import { Post, Category } from './types'

export const mockCategories: Category[] = [
    { id: '1', name: 'Todas', slug: 'todas' },
    { id: '2', name: 'Educação Financeira', slug: 'educacao-financeira' },
    { id: '3', name: 'Pix e Recebimento', slug: 'pix-e-recebimento' },
    { id: '4', name: 'Segurança', slug: 'seguranca' },
    { id: '5', name: 'Dicas', slug: 'dicas' },
]

export const mockPosts: Post[] = [
    {
        id: '1',
        title: 'Como automatizar o funil de vendas de forma interativa',
        slug: 'como-automatizar-funil-vendas',
        excerpt: 'Descubra estratégias para melhorar a conversão do seu negócio utilizando automação inteligente e interativa.',
        content_md: '# Como automatizar...\n\nO funil de vendas...',
        cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3',
        category: { id: '5', name: 'Dicas', slug: 'dicas' },
        tags: ['Vendas', 'Automação'],
        author_name: 'Equipe Antecipy',
        status: 'published',
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Segurança no PIX: O que sua empresa precisa saber',
        slug: 'seguranca-pix-empresa',
        excerpt: 'Garanta que suas transações via PIX estejam protegidas contra fraudes e conheça as melhores práticas de segurança.',
        content_md: '# Segurança no PIX...',
        cover_image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3',
        category: { id: '4', name: 'Segurança', slug: 'seguranca' },
        tags: ['PIX', 'Segurança'],
        author_name: 'Equipe Antecipy',
        status: 'published',
        published_at: new Date(Date.now() - 86400000).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: '3',
        title: 'Educação Financeira para PMEs: Por onde começar?',
        slug: 'educacao-financeira-pmes',
        excerpt: 'Um guia prático para organizar as finanças da sua pequena ou média empresa e garantir crescimento sustentável.',
        content_md: '# Educação Financeira...',
        cover_image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2626&ixlib=rb-4.0.3',
        category: { id: '2', name: 'Educação Financeira', slug: 'educacao-financeira' },
        tags: ['Gestão', 'Finanças'],
        author_name: 'Equipe Antecipy',
        status: 'published',
        published_at: new Date(Date.now() - 172800000).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
]
