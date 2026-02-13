
import { NextRequest, NextResponse } from 'next/server';
import { ArticleGeneratorService } from '@/services/article-generator';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { topic, keyword, targetAudience, objective, tone } = body;

        if (!topic || !keyword) {
            return NextResponse.json({ error: 'Topico e palavra-chave são obrigatórios' }, { status: 400 });
        }

        // Chamada ao gerador estratégico
        const markdown = await ArticleGeneratorService.generate({
            topic,
            keyword,
            targetAudience: targetAudience || 'Empresários e PMEs',
            objective: objective || 'Aumentar a liquidez',
            tone: tone || 'Profissional e Prático'
        });

        return NextResponse.json({ markdown });
    } catch (error: any) {
        console.error('Generation Error:', error);
        return NextResponse.json({ error: error.message || 'Erro ao gerar artigo' }, { status: 500 });
    }
}
