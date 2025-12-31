# Guia de Integração com Supabase

Este documento fornece instruções passo a passo para integrar o catálogo com o banco de dados Supabase.

## 📋 Pré-requisitos

1. Conta no Supabase (<https://supabase.com>)
2. Projeto criado no Supabase
3. Node.js e npm instalados

## 🔧 Passo 1: Instalar Dependências

Execute o comando abaixo para instalar o cliente Supabase:

```bash
npm install @supabase/supabase-js
```

## 🗄️ Passo 2: Configurar Banco de Dados

### 2.1 Criar Tabela de Produtos

No painel do Supabase, vá para **SQL Editor** e execute o script:

```
supabase/migrations/001_create_products_table.sql
```

Este script irá:

- Criar a tabela `products` com todos os campos necessários
- Adicionar índices para busca otimizada (full-text search em português)
- Configurar triggers para atualização automática de timestamps
- Habilitar Row Level Security (RLS) com políticas de acesso

### 2.2 Popular com Dados Iniciais

Execute o segundo script de migração:

```
supabase/migrations/002_seed_products.sql
```

Este script irá inserir 20 produtos de exemplo no banco de dados.

## 🔑 Passo 3: Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.local.example` para `.env.local`:

```bash
cp .env.local .env.local
```

2. No painel do Supabase, vá para **Settings > API**

3. Copie as seguintes informações:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Adicione ao arquivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

## 🔄 Passo 4: Integrar com o Código

### 4.1 Atualizar data.ts

Substitua o conteúdo de `data.ts` para buscar dados do Supabase:

```typescript
import { getAllProducts } from './lib/supabase/client';

export const CATEGORIES = [
  'Alimentos Básicos',
  'Bebidas',
  'Limpeza',
  'Higiene',
  'Frios e Laticínios',
  'Hortifruti'
];

// Função assíncrona para buscar produtos
export async function getProducts() {
  return await getAllProducts();
}

// Para manter compatibilidade, você pode exportar um array vazio
// e carregar os dados no componente
export const PRODUCTS = [];
```

### 4.2 Atualizar Componentes

Nos componentes que usam `PRODUCTS`, substitua por chamadas assíncronas:

**Exemplo em Catalog.tsx:**

```typescript
import { useState, useEffect } from 'react';
import { searchProducts } from '../lib/supabase/client';

const Catalog: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const data = await searchProducts(query);
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, [query]);

  // ... resto do código
};
```

### 4.3 Usar Busca Inteligente

Substitua o campo de busca atual pelo componente `SmartSearch`:

```typescript
import SmartSearch from '../components/SmartSearch';

// Na página Home.tsx:
<SmartSearch />
```

## 🔍 Funcionalidades Disponíveis

### Busca Inteligente

O componente `SmartSearch` oferece:

- **Autocomplete** com sugestões em tempo real
- **Debouncing** para otimizar requisições
- **Navegação por teclado** (setas, Enter, Escape)
- **Busca por nome, categoria ou descrição**

### Funções de Busca

Disponíveis em `lib/supabase/client.ts`:

```typescript
// Buscar todos os produtos
const products = await getAllProducts();

// Buscar por categoria
const products = await getProductsByCategory('Alimentos Básicos');

// Busca com filtro de texto
const products = await searchProducts('arroz');

// Buscar produto por ID
const product = await getProductById('uuid-do-produto');

// Obter sugestões para autocomplete
const suggestions = await getProductSuggestions('café', 5);
```

## 🔒 Segurança (RLS)

As políticas de Row Level Security estão configuradas para:

- ✅ **Leitura pública**: Qualquer pessoa pode visualizar produtos
- 🔐 **Escrita restrita**: Apenas usuários autenticados podem inserir/atualizar/deletar

Para permitir operações de escrita, você precisará implementar autenticação.

## 📊 Monitoramento

No painel do Supabase, você pode:

- Ver logs de requisições em **Logs**
- Monitorar performance em **Database > Performance**
- Gerenciar dados em **Table Editor**

## 🚀 Próximos Passos

1. Implementar autenticação de admin para gerenciar produtos
2. Adicionar paginação para grandes volumes de dados
3. Implementar cache para melhorar performance
4. Adicionar filtros avançados (faixa de preço, ordenação)

## ❓ Troubleshooting

### Erro: "Invalid API key"

- Verifique se as variáveis de ambiente estão corretas
- Certifique-se de que o arquivo `.env.local` está na raiz do projeto

### Erro: "relation 'products' does not exist"

- Execute o script de migração `001_create_products_table.sql`

### Produtos não aparecem

- Verifique se executou o script de seed `002_seed_products.sql`
- Verifique as políticas RLS no Supabase

## 📚 Recursos

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
