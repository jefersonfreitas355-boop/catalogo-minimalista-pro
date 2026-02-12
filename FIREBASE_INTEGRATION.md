# Guia de Integração Firebase (Firestore)

Siga estes passos para configurar o banco de dados Firebase para o seu catálogo.

## 1. Configuração no Console do Firebase

1. Vá para o [Firebase Console](https://console.firebase.google.com/).
2. Crie um novo projeto ou selecione um existente.
3. No menu lateral, vá para **Build > Cloud Firestore**.
4. Clique em **Create database**.
5. Selecione a localização e escolha **Start in test mode** (para desenvolvimento inicial).
6. Após a criação, vá em **Project Settings** (ícone de engrenagem) > **General**.
7. Na seção **Your apps**, clique no ícone `< >` (Web) para registrar o app.
8. Copie o objeto `firebaseConfig` fornecido.

## 2. Configuração do Projeto Local

1. Instale as dependências necessárias:

   ```bash
   npm install firebase
   ```

2. Abra o arquivo `lib/firebase/config.ts` e substitua os placeholders pelas configurações copiadas anteriormente.

## 3. Estrutura de Pastas (Preparada)

- `lib/firebase/config.ts`: Configuração do SDK.
- `lib/firebase/services/products.ts`: Funções de CRUD para produtos.
- `lib/firebase/seed.ts`: Utilitário para importar os dados do `data.ts`.

## 4. Próximos Passos para Ativação

Para começar a usar dados reais do Firebase em vez dos dados locais:

1. **Rodar o Seed**: No seu componente principal ou em uma rota temporária, chame `seedProductsToFirestore()`.
2. **Atualizar Catalog.tsx**: Substitua o uso da constante `PRODUCTS` pelas chamadas assíncronas em `lib/firebase/services/products.ts`.

   ```typescript
   import { getAllProductsFirestore } from "../lib/firebase/services/products";
   // ... dentro do componente
   const [products, setProducts] = useState<Product[]>([]);
   useEffect(() => {
     getAllProductsFirestore().then(setProducts);
   }, []);
   ```

## 5. Regras de Segurança Recomendadas

No Console do Firebase, vá em **Firestore Database > Rules** e configure:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{product} {
      allow read: if true; // Público
      allow write: if request.auth != null; // Apenas autenticados (Admin)
    }
  }
}
```
