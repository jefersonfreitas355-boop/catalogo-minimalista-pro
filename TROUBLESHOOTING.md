# Diagnóstico: Produtos não aparecem no site

## Possíveis causas

### 1. Regras de Segurança do Firestore

O problema mais comum é que as regras do Firestore estão bloqueando a leitura.

**Solução:**

1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Vá em **Firestore Database > Rules**
3. Certifique-se de que as regras estão assim:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

4. Clique em **"Publicar"** ou **"Publish"**

### 2. Produtos foram importados no Admin mas não no Firebase

Verifique se os produtos realmente estão no Firebase:

1. Acesse o Console do Firebase
2. Vá em **Firestore Database > Data**
3. Procure pela coleção `products`
4. Veja se os produtos aparecem lá

### 3. Erro de conexão com Firebase

Abra o console do navegador (F12) e veja se há erros relacionados ao Firebase.

**Erros comuns:**

- `Permission denied` - Problema nas regras de segurança
- `Firebase: No Firebase App` - Configuração incorreta
- `Network error` - Problema de conexão

### 4. Cache do navegador

Às vezes o navegador mantém dados antigos em cache.

**Solução:**

1. Pressione `Ctrl + Shift + R` (Windows) ou `Cmd + Shift + R` (Mac) para recarregar sem cache
2. Ou limpe o cache do navegador

## Como testar

1. Abra o site: `http://localhost:3000/`
2. Abra o console do navegador (F12)
3. Vá para a aba **Console**
4. Procure por erros em vermelho
5. Me envie uma captura de tela dos erros se houver

## Verificação rápida

No painel Admin (`http://localhost:3000/#/admin`):

- Os produtos aparecem na lista?
- Se sim, o problema é na página principal
- Se não, o problema é no Firebase
