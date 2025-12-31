# Configuração do WhatsApp

## Número de WhatsApp

Atualmente, o botão de WhatsApp está configurado com um número de exemplo:
`5511999999999`

## Como alterar o número

Para configurar seu próprio número de WhatsApp, você precisa editar 2 arquivos:

### 1. ProductCard.tsx

**Arquivo:** `components/ProductCard.tsx`
**Linha:** 14

Altere de:

```typescript
const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
```

Para:

```typescript
const whatsappUrl = `https://wa.me/SEU_NUMERO?text=${encodeURIComponent(message)}`;
```

### 2. App.tsx (Footer)

**Arquivo:** `App.tsx`
**Linha:** 31

Altere de:

```tsx
href="https://wa.me/5511999999999"
```

Para:

```tsx
href="https://wa.me/SEU_NUMERO"
```

## Formato do Número

O número deve estar no formato internacional, SEM espaços, traços ou parênteses:

- ✅ Correto: `5511987654321`
- ❌ Errado: `+55 (11) 98765-4321`
- ❌ Errado: `11 98765-4321`

**Formato:** `[Código do País][DDD][Número]`

Exemplos:

- Brasil (São Paulo): `5511987654321`
- Brasil (Rio): `5521987654321`
- Portugal: `351912345678`

## Testando

Após alterar o número:

1. Salve os arquivos
2. Recarregue o site
3. Clique no botão "WhatsApp" em qualquer produto
4. Deve abrir o WhatsApp Web com seu número
