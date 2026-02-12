# Guia de Deploy - Catálogo Minimalista

## ✅ Build Concluído com Sucesso

O build de produção foi gerado na pasta `dist/` e está pronto para deploy.

## 📦 Arquivos de Produção

Os seguintes arquivos foram gerados:

- `dist/index.html` - Página principal (2.58 kB)
- `dist/assets/index-*.js` - JavaScript otimizado (714.60 kB → 190.71 kB gzipped)
- Todos os assets necessários

## 🚀 Opções de Deploy

### Opção 1: Vercel (Recomendado - Grátis)

**Mais fácil e rápido!**

1. Acesse: <https://vercel.com/>
2. Faça login com GitHub
3. Clique em "Add New Project"
4. Importe o repositório ou faça upload da pasta
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Clique em "Deploy"
7. Pronto! Seu site estará no ar em segundos

**URL de exemplo:** `seu-catalogo.vercel.app`

---

### Opção 2: Netlify (Grátis)

1. Acesse: <https://www.netlify.com/>
2. Faça login
3. Arraste a pasta `dist/` para o site
4. Ou conecte com GitHub e configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Deploy automático!

**URL de exemplo:** `seu-catalogo.netlify.app`

---

### Opção 3: Firebase Hosting (Grátis)

**Já que você usa Firebase, pode hospedar lá também!**

1. Instale Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Faça login:

```bash
firebase login
```

3. Inicialize o hosting:

```bash
firebase init hosting
```

4. Configure:
   - Public directory: `dist`
   - Single-page app: `Yes`
   - Automatic builds: `No`

5. Deploy:

```bash
firebase deploy --only hosting
```

**URL de exemplo:** `seu-projeto.web.app`

---

### Opção 4: GitHub Pages (Grátis)

1. Crie um repositório no GitHub
2. Faça push do código
3. Vá em Settings > Pages
4. Configure:
   - Source: GitHub Actions
   - Crie arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**URL de exemplo:** `seu-usuario.github.io/catalogo`

---

## ⚙️ Configurações Importantes

### 1. Variáveis de Ambiente (Firebase)

Certifique-se de que as credenciais do Firebase em `lib/firebase/config.ts` estão corretas:

```typescript
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO_ID",
    // ...
};
```

### 2. Regras do Firestore

No Firebase Console, configure as regras de segurança:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth != null; // Recomendado para produção
    }
  }
}
```

⚠️ **IMPORTANTE**: Para produção, proteja as escritas com autenticação!

### 3. Número do WhatsApp

Antes de fazer deploy, atualize o número do WhatsApp em:

- `components/ProductCard.tsx` (linha 14)
- `App.tsx` (linha 31)

Substitua `5511999999999` pelo seu número real.

---

## 🔍 Checklist Pré-Deploy

- [ ] Firebase configurado corretamente
- [ ] Regras do Firestore ajustadas
- [ ] Número do WhatsApp atualizado (se for usar)
- [ ] Produtos importados no Admin
- [ ] Categorias corretas
- [ ] Build gerado sem erros
- [ ] Testado localmente

---

## 🧪 Testar Build Localmente

Antes de fazer deploy, teste o build local:

```bash
npm run preview
```

Acesse: `http://localhost:4173`

---

## 📊 Otimizações Aplicadas

✅ **Bundle otimizado**: 714 kB → 190 kB (gzipped)
✅ **Código minificado**
✅ **Assets otimizados**
✅ **Lazy loading** onde possível

---

## 🆘 Problemas Comuns

### Página em branco após deploy

- Verifique se o `base` no `vite.config.ts` está correto
- Para GitHub Pages, adicione: `base: '/nome-do-repo/'`

### Firebase não conecta

- Verifique as credenciais em `lib/firebase/config.ts`
- Certifique-se de que o domínio está autorizado no Firebase Console

### Produtos não aparecem

- Verifique as Regras de Segurança do Firestore
- Certifique-se de que há produtos no banco de dados

---

## 📱 Domínio Personalizado

Após deploy, você pode adicionar um domínio personalizado:

**Vercel/Netlify:**

1. Vá em Settings > Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções

**Firebase:**

```bash
firebase hosting:channel:deploy production --expires 30d
```

---

## 🎉 Pronto para Deploy

Escolha uma das opções acima e faça o deploy do seu catálogo!

**Recomendação:** Comece com **Vercel** - é o mais simples e rápido.
