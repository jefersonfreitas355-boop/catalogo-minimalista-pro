# Como Acessar o Admin

## Problema: Tela de Login não Aparece

Se a tela de login do Admin não está aparecendo, siga estes passos:

### Solução 1: Limpar Cache do Navegador

1. Abra o site: `http://localhost:3000/#/admin`
2. Pressione **F12** para abrir as ferramentas do desenvolvedor
3. Vá na aba **Console**
4. Digite este comando e pressione Enter:

```javascript
localStorage.removeItem('admin_auth')
```

5. Recarregue a página (**F5** ou **Ctrl+R**)
6. A tela de login deve aparecer

### Solução 2: Limpar Todo o localStorage

1. Abra o site: `http://localhost:3000/#/admin`
2. Pressione **F12**
3. Vá na aba **Application** (ou **Aplicativo**)
4. No menu lateral esquerdo, clique em **Local Storage**
5. Clique em `http://localhost:3000`
6. Clique com botão direito e selecione **Clear** (Limpar)
7. Recarregue a página

### Solução 3: Modo Anônimo

1. Abra uma janela anônima/privada do navegador
2. Acesse: `http://localhost:3000/#/admin`
3. A tela de login deve aparecer

## Credenciais de Acesso

- **Usuário:** `Admin`
- **Senha:** `unlimited00`

## Verificar Erros

Se ainda não funcionar:

1. Pressione **F12**
2. Vá na aba **Console**
3. Procure por mensagens de erro em vermelho
4. Me envie uma captura de tela dos erros
