
// Basic SEO Analysis without external API
// Heuristics based on content structure, length, and keyword presence

export interface SEOAnalysis {
    score: number;
    readability: 'Baixa' | 'Média' | 'Alta';
    wordCount: number;
    warnings: string[];
    suggestions: string[];
}

export function analyzeSEO(content: string, title?: string, keyword?: string): SEOAnalysis {
    const words = content.split(/\s+/).length;
    const warnings: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    // 1. Length Check
    if (words < 300) {
        score -= 20;
        warnings.push('Conteúdo muito curto (mínimo 300 palavras recomendado).');
    } else if (words > 2500) {
        suggestions.push('Conteúdo muito longo, considere dividir em partes ou usar mais subtítulos.');
    }

    // 2. Title Check
    if (title) {
        if (title.length < 30) {
            score -= 5;
            warnings.push('Título muito curto.');
        } else if (title.length > 60) {
            score -= 5;
            suggestions.push('Título pode ser cortado nos resultados de busca (ideal: 50-60 caracteres).');
        }
    }

    // 3. Structure Check (Headings)
    const h1Count = (content.match(/^# /gm) || []).length;
    const h2Count = (content.match(/^## /gm) || []).length;

    if (h1Count > 1) {
        score -= 10;
        warnings.push('Evite usar múltiplos H1 (use apenas um título principal).');
    }
    if (h2Count === 0 && words > 500) {
        score -= 5;
        suggestions.push('Use subtítulos (H2) para quebrar o texto e facilitar a leitura.');
    }

    // 4. Keyword Density (Basic)
    if (keyword) {
        const regex = new RegExp(keyword, 'gi');
        const count = (content.match(regex) || []).length;
        const density = (count / words) * 100;

        if (density < 0.5) {
            score -= 5;
            suggestions.push(`A palavra-chave "${keyword}" aparece pouco (${count} vezes). Tente usar mais.`);
        } else if (density > 3) {
            score -= 5;
            warnings.push(`Excesso de palavra-chave "${keyword}" (${density.toFixed(1)}%). Pode ser considerado spam.`);
        }
    }

    // 5. Paragraph Length
    const longParagraphs = content.split('\n\n').filter(p => p.split(/\s+/).length > 100).length;
    if (longParagraphs > 0) {
        score -= 5;
        suggestions.push(`${longParagraphs} parágrafos são muito longos. Tente encurtá-los.`);
    }

    // Cap Score
    score = Math.max(0, Math.min(100, score));

    // Readability
    let readability: 'Baixa' | 'Média' | 'Alta' = 'Alta';
    if (score < 50) readability = 'Baixa';
    else if (score < 80) readability = 'Média';

    return {
        score,
        readability,
        wordCount: words,
        warnings,
        suggestions
    };
}
