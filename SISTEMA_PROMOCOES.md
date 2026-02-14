# 🎯 Sistema de Promoções - Guia Completo

## 📋 Visão Geral

O sistema de promoções permite que você mova produtos para a categoria especial "Promoções" com preços reduzidos. Produtos em promoção **NÃO aparecem** em suas categorias originais.

---

## ✨ Funcionalidades

### 1️⃣ **Adicionar Produto à Promoção**

Quando você clica no botão de estrela (⭐) para promover um produto:

1. **Sistema solicita o preço promocional**
   - Mostra o produto e preço atual
   - Você digita o novo preço (ex: `10,50` ou `10.50`)

2. **Validações automáticas:**
   - ✅ Verifica se o preço é válido (número positivo)
   - ⚠️ Alerta se o preço promocional for maior ou igual ao preço atual
   - 🛡️ Permite confirmar mesmo se o preço for maior (flexibilidade)

3. **O que acontece:**
   - 💾 **Preço original** é salvo em `oldPrice`
   - 💰 **Preço promocional** substitui o `price`
   - 📂 **Categoria original** é salva em `originalCategory`
   - 🏷️ **Categoria** muda para "Promoções"
   - 📊 **Calcula o desconto** automaticamente

4. **Mensagem de confirmação:**
   ```
   🎉 Produto adicionado à promoção!
   
   📦 Arroz Branco
   💰 De: R$ 24,90
   🔥 Por: R$ 19,90
   📊 Desconto: 20%
   
   ✅ O produto agora aparece APENAS na categoria "Promoções"!
   ```

---

### 2️⃣ **Remover Produto da Promoção**

Quando você clica no botão de estrela (⭐) em um produto que já está em promoção:

1. **O que acontece:**
   - 💰 **Preço original** é restaurado (de `oldPrice`)
   - 🗑️ **oldPrice** é removido
   - 📂 **Categoria original** é restaurada
   - 🧹 **originalCategory** é limpo

2. **Mensagem de confirmação:**
   ```
   ✅ Produto "Arroz Branco" removido da promoção!
   
   💰 Preço restaurado: R$ 24,90
   📂 Categoria: Alimentos Básicos
   ```

---

## 🎨 Interface Visual

### No Painel Admin

**Produto Normal:**
- Botão: ⭐ (estrela vazia, cinza)
- Hover: Amarelo
- Tooltip: "Mover para promoção"

**Produto em Promoção:**
- Botão: ⭐ (estrela preenchida, roxa)
- Background: Roxo
- Tooltip: "Remover da promoção"

---

## 📊 Estrutura de Dados

### Produto Normal
```json
{
  "id": "abc123",
  "name": "Arroz Branco",
  "category": "Alimentos Básicos",
  "price": 24.90,
  "oldPrice": undefined,
  "originalCategory": undefined
}
```

### Produto em Promoção
```json
{
  "id": "abc123",
  "name": "Arroz Branco",
  "category": "Promoções",
  "price": 19.90,
  "oldPrice": 24.90,
  "originalCategory": "Alimentos Básicos"
}
```

---

## 🔍 Comportamento no Catálogo

### Categoria "Promoções"
- ✅ Mostra **TODOS** os produtos em promoção
- 🎨 Botão de categoria com animação pulsante
- 🔥 Destaque visual especial

### Categorias Normais
- ❌ **NÃO mostra** produtos que estão em promoção
- ✅ Mostra apenas produtos da categoria específica
- 🔄 Produtos voltam automaticamente ao remover da promoção

### Busca
- ✅ Encontra produtos em **qualquer categoria** (incluindo promoções)
- 🔍 Busca por nome, descrição ou categoria

---

## 🎯 Casos de Uso

### Exemplo 1: Promoção de Fim de Semana
```
1. Sexta-feira: Mover "Arroz Branco" para promoção (R$ 24,90 → R$ 19,90)
2. Fim de semana: Produto aparece APENAS em "Promoções"
3. Segunda-feira: Remover da promoção
4. Produto volta para "Alimentos Básicos" com preço R$ 24,90
```

### Exemplo 2: Queima de Estoque
```
1. Selecionar vários produtos
2. Mover todos para "Promoções" com preços reduzidos
3. Produtos somem das categorias originais
4. Clientes veem todos juntos em "Promoções"
```

### Exemplo 3: Promoção Relâmpago
```
1. Criar promoção com desconto agressivo (50% off)
2. Sistema alerta que preço promocional é muito baixo
3. Confirmar mesmo assim
4. Produto vai para promoção
5. Após vender, remover da promoção ou marcar como esgotado
```

---

## ⚙️ Configurações Técnicas

### Validações
- ✅ Preço deve ser número positivo
- ⚠️ Alerta se preço promocional ≥ preço atual
- 🛡️ Permite continuar mesmo com alerta (flexibilidade)

### Cálculo de Desconto
```javascript
const discount = ((precoOriginal - precoPromocional) / precoOriginal * 100).toFixed(0);
// Exemplo: ((24.90 - 19.90) / 24.90 * 100) = 20%
```

### Restauração Automática
- Se `oldPrice` existir, usa ele na restauração
- Se não existir, usa o `price` atual
- Categoria padrão: `CATEGORIES[1]` se `originalCategory` não existir

---

## 🚀 Fluxo Completo

```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUTO NORMAL                           │
│  Category: "Alimentos Básicos"                              │
│  Price: R$ 24,90                                            │
│  oldPrice: undefined                                        │
│  originalCategory: undefined                                │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Clicar ⭐ (Adicionar à Promoção)
                            ↓
                    ┌───────────────┐
                    │ Solicita Preço│
                    │  Promocional  │
                    └───────────────┘
                            │
                            │ Digite: 19,90
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                 PRODUTO EM PROMOÇÃO                         │
│  Category: "Promoções"                                      │
│  Price: R$ 19,90                                            │
│  oldPrice: R$ 24,90                                         │
│  originalCategory: "Alimentos Básicos"                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Clicar ⭐ (Remover da Promoção)
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              PRODUTO RESTAURADO                             │
│  Category: "Alimentos Básicos"                              │
│  Price: R$ 24,90                                            │
│  oldPrice: undefined                                        │
│  originalCategory: undefined                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 💡 Dicas

1. **Organize suas promoções:** Use a categoria "Promoções" como vitrine especial
2. **Monitore o estoque:** Produtos em promoção tendem a vender mais rápido
3. **Planeje o retorno:** Defina quando cada produto sairá da promoção
4. **Teste os preços:** O sistema permite ajustar preços promocionais facilmente
5. **Comunique aos clientes:** A categoria "Promoções" tem destaque visual automático

---

## 🎨 Destaque Visual no Catálogo

A categoria "Promoções" tem design especial:
- 🔴 Gradiente vermelho vibrante
- ✨ Animação pulsante
- 💫 Sombra brilhante
- 🎯 Hover com escala aumentada

Isso chama a atenção dos clientes automaticamente!

---

## 📝 Notas Importantes

- ⚠️ Produtos em promoção **NÃO aparecem** na categoria original
- 💾 Todos os dados originais são preservados
- 🔄 Restauração é automática e segura
- 📊 Desconto é calculado automaticamente
- ✅ Sistema valida todos os inputs

---

**Desenvolvido para facilitar a gestão de promoções do seu catálogo!** 🚀
