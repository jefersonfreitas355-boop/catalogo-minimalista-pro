# Guia de Importação em Lote

## Como usar a funcionalidade de Importação em Lote

1. Acesse o painel administrativo em `http://localhost:3000/#/admin`
2. Clique no botão **"Importar em Lote"** no canto superior direito
3. Cole seus produtos no formato JSON no campo de texto
4. Clique em **"Importar Produtos"**

## Formato JSON Simplificado

### Campos Obrigatórios

- `name` - Nome do produto
- `category` - Categoria do produto
- `price` - Preço (use ponto como separador decimal)

### Campos Opcionais

- `description` - Descrição do produto

### Formato Mínimo

```json
[
  {
    "name": "Arroz Branco",
    "category": "Chocolates e Bombons",
    "price": 24.90
  }
]
```

### Formato com Descrição (Opcional)

```json
[
  {
    "name": "Arroz Branco",
    "category": "Balas e Guloseimas",
    "description": "Arroz tipo 1, grãos selecionados",
    "price": 24.90
  }
]
```

## Categorias Válidas

Use exatamente um destes nomes para o campo `category`:

- `Chocolates e Bombons`
- `Confeitaria e Ingredientes`
- `Balas e Guloseimas`
- `Pirulitos`
- `Chicletes e Pastilhas`
- `Doces e Amendoins`
- `Bebidas`
- `Salgadinhos e Biscoitos`

## Exemplo Completo

```json
[
  {
    "name": "Arroz Branco Tipo 1",
    "category": "Salgadinhos e Biscoitos",
    "description": "Arroz branco tipo 1, grãos selecionados",
    "price": 24.90,
    "unit": "5kg",
    "stock": 150,
    "image": "",
    "status": "Em estoque"
  },
  {
    "name": "Feijão Preto",
    "category": "Doces e Amendoins",
    "description": "Feijão preto de primeira qualidade",
    "price": 8.90,
    "unit": "1kg",
    "stock": 200,
    "image": "",
    "status": "Em estoque"
  },
  {
    "name": "Café Torrado e Moído",
    "category": "Bebidas",
    "description": "Café torrado e moído tradicional",
    "price": 12.90,
    "unit": "500g",
    "stock": 95,
    "image": "",
    "status": "Em estoque"
  }
]
```

## Dicas Importantes

- **Preços**: Use ponto (`.`) como separador decimal, não vírgula
- **Campos opcionais**: `oldPrice`, `image` e `specs` podem ser omitidos
- **Stock padrão**: Se não especificar, será 100
- **Status padrão**: Se não especificar, será "Em estoque"
- **Validação**: O sistema valida cada produto antes de importar
- **Erros**: Se algum produto falhar, os outros ainda serão importados

## Convertendo CSV para JSON

Se você tem um arquivo CSV, pode usar ferramentas online como:

- [CSV to JSON Converter](https://csvjson.com/csv2json)
- [ConvertCSV](https://www.convertcsv.com/csv-to-json.htm)

Ou use este template do Excel/Google Sheets:

| name | category | description | price | unit | stock | image | status |
|------|----------|-------------|-------|------|-------|-------|--------|
| Chocolate | Chocolates e Bombons | Chocolate ao leite | 5.90 | 100g | 150 | | Em estoque |

Depois exporte como CSV e converta para JSON usando as ferramentas acima.
