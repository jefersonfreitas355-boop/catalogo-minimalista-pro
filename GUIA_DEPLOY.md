# 🚀 Guia de Deploy - Firebase Hosting

## ⚠️ Configuração Necessária

O Firebase CLI precisa ser configurado antes do primeiro deploy.

---

## 📋 Passo a Passo para Deploy

### **Opção 1: Instalação Global do Firebase CLI (Recomendado)**

#### 1. Instalar Firebase CLI globalmente
```powershell
npm install -g firebase-tools
```

#### 2. Fazer login no Firebase
```powershell
firebase login
```
- Uma janela do navegador será aberta
- Faça login com sua conta Google
- Autorize o Firebase CLI

#### 3. Inicializar o projeto Firebase
```powershell
firebase init hosting
```

Responda as perguntas:
- **Project Setup:** Selecione um projeto existente ou crie um novo
- **Public directory:** Digite `dist`
- **Configure as a single-page app:** Digite `y` (Yes)
- **Set up automatic builds with GitHub:** Digite `n` (No)
- **Overwrite index.html:** Digite `n` (No)

#### 4. Fazer o deploy
```powershell
firebase deploy --only hosting
```

---

### **Opção 2: Usando NPX (Sem Instalação Global)**

#### 1. Fazer login
```powershell
npx firebase-tools login
```

#### 2. Inicializar o projeto
```powershell
npx firebase-tools init hosting
```

Responda as mesmas perguntas da Opção 1.

#### 3. Fazer o deploy
```powershell
npx firebase-tools deploy --only hosting
```

---

### **Opção 3: Deploy Manual via Console Firebase**

Se preferir não usar a linha de comando:

#### 1. Acesse o Firebase Console
https://console.firebase.google.com/

#### 2. Selecione ou crie um projeto

#### 3. Vá em "Hosting" no menu lateral

#### 4. Clique em "Começar"

#### 5. Faça upload da pasta `dist`
- Arraste a pasta `dist` para a área de upload
- OU use o botão "Fazer upload de arquivos"

#### 6. Clique em "Implantar"

---

## 📁 Arquivos Necessários

Após a inicialização, estes arquivos serão criados:

### `.firebaserc`
```json
{
  "projects": {
    "default": "seu-projeto-id"
  }
}
```

### `firebase.json` (já existe)
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## ✅ Verificação Pós-Deploy

Após o deploy bem-sucedido, você verá:

```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/seu-projeto/overview
Hosting URL: https://seu-projeto.web.app
```

### Testar o deploy:
1. Acesse a URL fornecida
2. Verifique se o site carrega corretamente
3. Teste as funcionalidades principais:
   - ✅ Carrinho
   - ✅ Busca
   - ✅ Categorias
   - ✅ Checkout

---

## 🔧 Comandos Úteis

### Ver projetos disponíveis
```powershell
firebase projects:list
```

### Selecionar projeto ativo
```powershell
firebase use seu-projeto-id
```

### Ver status do hosting
```powershell
firebase hosting:channel:list
```

### Ver logs de deploy
```powershell
firebase hosting:channel:deploy preview
```

---

## 🌐 Configurar Domínio Personalizado

Após o deploy inicial, siga o guia em:
📄 `CONFIGURACAO_DOMINIO.md`

Para configurar: `catalogoauxiliarufapenha.app`

---

## 🚨 Problemas Comuns

### Erro: "No currently active project"
**Solução:**
```powershell
firebase use --add
```
Selecione seu projeto da lista.

### Erro: "firebase: command not found"
**Solução:**
```powershell
npm install -g firebase-tools
```

### Erro: "Permission denied"
**Solução (Windows):**
Execute o PowerShell como Administrador.

### Erro: "Build folder not found"
**Solução:**
```powershell
npm run build
```
Certifique-se de que a pasta `dist` existe.

---

## 📊 Checklist de Deploy

Antes de fazer o deploy:
- [x] Build concluído (`npm run build`)
- [x] Pasta `dist` existe
- [x] `firebase.json` configurado
- [ ] Firebase CLI instalado
- [ ] Login no Firebase feito
- [ ] Projeto Firebase selecionado
- [ ] Deploy executado

Após o deploy:
- [ ] URL de produção testada
- [ ] Funcionalidades verificadas
- [ ] Domínio personalizado configurado (opcional)
- [ ] SSL ativo

---

## 🎯 Resumo Rápido

```powershell
# 1. Instalar Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Inicializar (primeira vez)
firebase init hosting

# 4. Deploy
firebase deploy --only hosting
```

---

## 📞 Suporte

**Documentação Firebase:**
https://firebase.google.com/docs/hosting

**Troubleshooting:**
https://firebase.google.com/docs/hosting/troubleshooting

**Stack Overflow:**
https://stackoverflow.com/questions/tagged/firebase-hosting

---

**Seu build está pronto na pasta `dist`!**  
**Siga um dos métodos acima para fazer o deploy.** 🚀
