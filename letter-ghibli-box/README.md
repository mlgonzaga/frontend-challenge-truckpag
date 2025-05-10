# Letter Ghibli Box

Uma aplicação web moderna para gerenciar e explorar filmes do Studio Ghibli com layout inspirado no site https://letterboxd.com/. Construída com React e TypeScript, esta aplicação permite que os usuários naveguem, filtrem e organizem seus filmes favoritos dos estudios Ghibli.

Pode ser acessado através do link: https://frontend-challenge-truckpag.vercel.app/

## 🚀 Funcionalidades

- Navegue pelos filmes do Studio Ghibli com informações detalhadas
- Funcionalidade de busca (por título e sinopse)
- Múltiplas opções de ordenação:
  - Título (A-Z, Z-A)
  - Duração (Mais curto para mais longo)
  - Avaliação (Maior para menor)
  - Pontuação (Maior para menor)
- Sistema avançado de filtros:
  - Filmes assistidos
  - Favoritos
  - Filmes com notas
  - Filtros por avaliação (1-5 estrelas)
- Gerenciamento pessoal de filmes:
  - Marcar filmes como assistidos
  - Adicionar aos favoritos
  - Adicionar notas pessoais
  - Avaliar filmes (1-5 estrelas)
- Design responsivo para todos os tamanhos de tela

## 🛠️ Ferramentas e Tecnologias

- **Framework Frontend:** React com TypeScript
- **Gerenciamento de Estado:** Redux Toolkit
- **Estilização:** Tailwind CSS
- **Componentes UI:** Shadcn/ui
- **Ícones:** Lucide React
- **Manipulação de Datas:** date-fns
- **Notificações:** Sonner
- **Integração com API:** RTK Query

## 📋 Requisitos

### Requisitos Implementados

1. **Exibição da Lista de Filmes**
   - Layout em grade com design responsivo
   - Cards de filmes com informações essenciais
   - Estados de carregamento e tratamento de erros

2. **Busca e Filtragem**
   - Funcionalidade de busca em tempo real
   - Múltiplas opções de filtro
   - Capacidades avançadas de ordenação

3. **Interações do Usuário**
   - Sistema de avaliação de filmes
   - Acompanhamento de status de visualização
   - Gerenciamento de favoritos
   - Sistema de notas

4. **UI/UX**
   - Interface moderna e limpa
   - Design responsivo
   - Estados de carregamento
   - Feedback ao usuário (toasts)

## 🚀 Instalação e Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/mlgonzaga/frontend-challenge-truckpag.git
   cd letter-ghibli-box
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Abra seu navegador e acesse:
   ```
   http://localhost:5173
   ```

## 🧪 Executando Testes

Para executar a suite de testes:

```bash
npm test
```



## 📦 Estrutura do Projeto

```
src/
├── __tests__/      # Testes de alguns componentes
├── components/     # Componentes React
├── interfaces/     # Interfaces TypeScript
├── store/         # Configuração do Redux store
├── services/      # Serviços de API
├── slices/        # Slice para manipular localStorage
└── utils/         # Funções utilitárias
```


