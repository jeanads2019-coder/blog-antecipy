
import { AIArticleParams } from '../lib/cms/ai';

export interface StructuredArticleJson {
    title: string;
    intro: string;
    learning_points: string[];
    problem_deep_dive: {
        title: string;
        content: string;
    };
    strategic_strategies: {
        h3: string;
        actionable_content: string;
        real_world_metric: string;
    }[];
    authority_callout: string;
    success_indicators: string[];
    mistakes_to_avoid: string[];
    implementation_checklist: string[];
    conclusion_summary: string;
    cta_integrated: string;
}

export class ArticleGeneratorService {
    private static SYSTEM_PROMPT = `
    Você é o Editor Estratégico Sênior do Blog Antecipy, especialista em Marketing de Conteúdo B2B e Engenharia de Autoridade.
    Seu benchmark absoluto de qualidade é o blog da Inlead Digital (https://inlead.digital/blog/).

    OBJETIVO: Criar artigos que educam o empresário, destroem objeções e posicionam a Antecipy como a solução de liquidez definitiva.

    DIRETRIZES TÉCNICAS DE ESCRITA (ESTILO INLEAD):
    1. **Bolding Estratégico**: Destaque em negrito conceitos-chave, números de impacto e verbos de ação. NUNCA negrite frases inteiras, apenas o 'ouro' do parágrafo.
    2. **Autoridade Instantânea**: Use termos como "Na prática", "Padrão de mercado", "ROI", "Gargalo operacional".
    3. **Escaneabilidade Extrema**: Frases de no máximo 15 palavras. Parágrafos de no máximo 3 linhas.
    4. **Exemplos de Campo**: Use cenários reais (mesmo que hipotéticos mas realistas) com números (R$, %, tempo).
    5. **Tom**: Educativo, estratégico, profissional e levemente provocador (cutucando a dor da falta de caixa).

    ESTRUTURA RÍGIDA DO JSON DE SAÍDA:
    {
      "title": "Título SEO com Gatilho de Curiosidade ou Resultado",
      "intro": "Introdução com Gancho (Problema + Promessa em 3-4 linhas)",
      "learning_points": ["4-5 tópicos de valor real"],
      "problem_deep_dive": {
        "title": "Subtítulo H2 focado na 'Dor'",
        "content": "Explicação do porquê o modelo atual do empresário está falhando."
      },
      "strategic_strategies": [
        {
          "h3": "Título da Estratégia",
          "actionable_content": "Conteúdo com negritos estratégicos.",
          "real_world_metric": "Exemplo real com números e resultados."
        }
      ],
      "authority_callout": "Uma frase de impacto (estilo quote) que resume a autoridade do post.",
      "success_indicators": ["3-4 KPIs que o leitor deve monitorar"],
      "mistakes_to_avoid": ["Lista de erros infantis que custam caro"],
      "implementation_checklist": ["Passos práticos de execução"],
      "conclusion_summary": "Fechamento estratégico rápido",
      "cta_integrated": "CTA que flui naturalmente do conteúdo para a Antecipação Antecipy"
    }
  `;

    static validate(data: StructuredArticleJson): boolean {
        if (!data.title || data.title.length < 10) return false;
        if (data.strategic_strategies.length < 2) return false; // Queremos pelo menos 2 estratégias
        if (data.learning_points.length < 3) return false;
        if (!data.cta_integrated || data.cta_integrated.length < 20) return false;
        return true;
    }

    static validateMarkdown(markdown: string): boolean {
        const hasH1 = /^# /m.test(markdown);
        const h2Count = (markdown.match(/^## /gm) || []).length;
        const hasLists = /- /m.test(markdown) || /^\d+\. /m.test(markdown);
        const hasCTA = markdown.toLowerCase().includes('antecipy') || markdown.includes('👉');
        const hasBold = /\*\*.*?\*\*/.test(markdown);

        return hasH1 && h2Count >= 4 && hasLists && hasCTA && hasBold;
    }

    static jsonToMarkdown(data: StructuredArticleJson): string {
        const md = `
# ${data.title}

${data.intro}

## O que você vai aprender hoje:
${data.learning_points.map((p: string) => `- ${p}`).join('\n')}

## ${data.problem_deep_dive.title}
${data.problem_deep_dive.content}

## Estratégias de Alta Performance
${data.strategic_strategies.map((s: any) => `
### ${s.h3}
${s.actionable_content}

> **Indicador de Sucesso:** ${s.real_world_metric}
`).join('\n')}

---
**💡 Insight do Especialista:** *"${data.authority_callout}"*
---

## Indicadores de Sucesso (KPIs)
Para saber se você está no caminho certo, monitore:
${data.success_indicators.map((i: string) => `- **${i}**`).join('\n')}

## Erros que Asfixiam seu Caixa
${data.mistakes_to_avoid.map((m: string) => `- ${m}`).join('\n')}

## Checklist de Implementação Imediata
${data.implementation_checklist.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n')}

## Conclusão Estratégica
${data.conclusion_summary}

---

### Transforme seu Futuro em Caixa Presente
${data.cta_integrated}

👉 **[Simule sua Liquidez na Antecipy](https://antecipy.com.br)**
    `.trim();

        if (!this.validateMarkdown(md)) {
            throw new Error("O artigo gerado não atingiu o índice de qualidade Antecipy (H1, Negritos, Callouts ou CTA ausentes).");
        }

        return md;
    }

    static async generate(params: AIArticleParams & { keyword: string }): Promise<string> {
        // No mock, vamos entregar o MAIOR nível de detalhamento possível para o usuário ver o padrão
        const mockJson: StructuredArticleJson = {
            title: `${params.topic}: Como Extrair Eficiência Máxima no ${params.keyword}`,
            intro: `Vender é apenas metade do trabalho. A verdadeira sobrevivência de uma empresa de **${params.targetAudience}** depende da sua capacidade de **gerar liquidez** sem depender de crédito bancário caro.`,
            learning_points: [
                "Identificação de gargalos no fluxo de recebimentos",
                "Diferença estratégica entre Factoring e Antecipação Digital",
                "Como reduzir o Custo Efetivo Total (CET) da sua operação",
                "Checklist para migração de modelo de crédito"
            ],
            problem_deep_dive: {
                title: "O Custo Invisível da Espera",
                content: `Muitos gestores acreditam que ter milhões em **contas a receber** é sinal de saúde. Na verdade, sem liquidez, esse valor é apenas um número no balanço enquanto os **juros do cheque especial** corroem sua margem de lucro real.`
            },
            strategic_strategies: [
                {
                    h3: "Gestão Ativa de Recebíveis",
                    actionable_content: `Pare de ser refém do prazo dos adquirentes. Você deve **centralizar seus ativos** em uma plataforma que permita visualização em tempo real de cada centavo que entrará nos próximos 90 dias.`,
                    real_world_metric: "Redução de 12% no custo de capital ao trocar empréstimo por antecipação estratégica."
                },
                {
                    h3: "Otimização de Crédito B2B",
                    actionable_content: `Notas fiscais são **dinheiro vivo parado**. Utilize a tecnologia para transformar suas faturas em capital de giro em menos de **24 horas**, eliminando a burocracia das garantias físicas.`,
                    real_world_metric: "Aumento de 20% no poder de compra junto a fornecedores após injeção de caixa imediato."
                }
            ],
            authority_callout: "Caixa é rei, mas a velocidade do caixa é o que constrói impérios operacionais.",
            success_indicators: [
                "Prazo Médio de Recebimento (PMR) reduzido",
                "Custo de Captação de Recursos (CCR) abaixo de 3% ao mês",
                "Margem EBTIDA preservada"
            ],
            mistakes_to_avoid: [
                "Antecipar sem ter um destino claro para o recurso (Custo de Oportunidade)",
                "Aceitar taxas bancárias sem comparar com **Fintechs de Antecipação**",
                "Não possuir controle rigoroso de fluxo de caixa futuro"
            ],
            implementation_checklist: [
                "Acesse sua plataforma de gestão e liste os próximos 30 dias de vendas",
                "Identifique títulos com vencimento longo e taxa de desconto justa",
                "Selecione o parceiro tech (Antecipy) para operação transparente",
                "Reinvesta o capital em estoque ou redução de passivos caros"
            ],
            conclusion_summary: `Sua empresa não precisa de mais dívidas, ela precisa de **eficiência**. A antecipação estratégica é o caminho mais curto para o crescimento sustentável.`,
            cta_integrated: `Não deixe seu lucro preso no tempo. Na **Antecipy**, somos especialistas em devolver a velocidade ao seu negócio, garantindo que o dinheiro das suas vendas esteja onde deve estar: **na sua conta**.`
        };

        if (!this.validate(mockJson)) {
            throw new Error("Falha na validação do artigo gerado pela IA.");
        }

        return this.jsonToMarkdown(mockJson);
    }
}
