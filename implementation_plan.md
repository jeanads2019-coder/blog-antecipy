# Implementação do Blog Antecipy - Plano de Projeto

## 1. Fase de Planejamento e Estratégia
- **Objetivo**: Criar um blog completo (Front + Back + Admin) para a marca Antecipy, inspirado na estrutura da Inlead.
- **Stack**: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Supabase (Banco de Dados, Autenticação, Armazenamento), Vercel.

## 2. Perguntas Críticas (A serem respondidas antes da implementação)
1.  **Cores da Marca**: Por favor, forneça os códigos Hex exatos para o "Antecipy Blue" e o verde de destaque para garantir a fidelidade à marca desde o início.
2.  **Ambiente de Dados**: Desenvolveremos contra um projeto Supabase novo (Remote) ou uma instância local (Docker)? (Recomendamos Remote para velocidade inicial).
3.  **Criação do Projeto Supabase**: Confirmar se devemos criar um *novo* projeto Supabase chamado "Blog Antecipy" na região `sa-east-1` (São Paulo) ou usar um existente?

## 3. Estrutura do Projeto
- **Frontend (Público)**:
    - [x] `/blog`: Listagem com chips de categorias e paginação.
    - [x] `/blog/[slug]`: Artigo completo com metadados, compartilhamento e "Veja também".
    - [x] `/categoria/[slug]`: Filtragem por categoria (via query params por enquanto).
    - [x] Busca: Debounce no client + API route (Logica client-side implementada).
- **Backend (Admin)**:
    - [x] `/admin/login`: Login Screen UI.
    - [ ] `/admin`: Dashboard protegido (Pendente Auth).
    - [ ] `/admin/posts/new`: Editor Markdown/MDX (Pendente).
    - [ ] `/api/admin/*`: Rotas de API protegidas (Pendente).
- **Banco de Dados (Supabase)**:
    - [ ] Criar projeto Supabase (FALHOU - Cota atingida).
    - [ ] Definir Schema SQL (Pendente).
    - [ ] Criar Seed Data (Mock Data criado em `src/lib/data.ts`).

## 4. Plano de Execução (Rascunho)
1.  **Configuração Inicial**:
    - [ ] Criar projeto Next.js com TypeScript e Tailwind.
    - [ ] Configurar shadcn/ui e variáveis de tema (cores Antecipy).
    - [ ] Configurar cliente Supabase e variáveis de ambiente local.
2.  **Banco de Dados**:
    - [ ] Criar projeto Supabase (se aprovado).
    - [ ] Definir Schema SQL (Tabelas + RLS).
    - [ ] Criar Seed Data (Categorias e Posts iniciais).
3.  **Desenvolvimento Backend**:
    - [ ] Implementar autenticação Admin.
    - [ ] Criar rotas da API (GET posts, CRUD admin).
4.  **Desenvolvimento Frontend (Admin)**:
    - [ ] Login screen.
    - [ ] Dashboard e Editor de Artigos.
5.  **Desenvolvimento Frontend (Público)**:
    - [ ] Layout e Header inspirado na referência.
    - [ ] Página de Listagem e Detalhe do Post.
6.  **Polimento e Deploy**:
    - [ ] Otimização SEO e Performance (Lighthouse).
    - [ ] Testes finais (Checklist).
    - [ ] Deploy na Vercel.

## 5. Próximos Passos
Aguardando confirmação sobre:
- Cores da marca.
- Criação do projeto Supabase.
