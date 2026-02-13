# Antecipy Blog 🚀

Blog institucional e estratégico da Antecipy, focado em educação financeira e antecipação de recebíveis.

## 🛠️ Tecnologias
- **Framework:** Next.js 15+ (App Router)
- **Estilização:** Tailwind CSS
- **Banco de Dados & Auth:** Supabase
- **IA:** Integração customizada para geração de artigos estratégicos

## 🚀 Como rodar localmente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env.local`
   - Preencha com suas chaves do Supabase
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🌐 Deploy na Vercel

Para subir o projeto na Vercel:

1. Conecte seu repositório do GitHub à Vercel.
2. Adicione as seguintes **Environment Variables** no painel da Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. O deploy será feito automaticamente a cada push na `main`.

## 📁 Estrutura do Projeto
- `/src/app`: Rotas e páginas (Next.js App Router)
- `/src/components`: Componentes reutilizáveis (UI, Layout, Editor)
- `/src/services`: Lógica de negócio e gerador de artigos por IA
- `/src/lib`: Configurações de clientes (Supabase, API)
- `/public`: Ativos estáticos (Logo, imagens)
