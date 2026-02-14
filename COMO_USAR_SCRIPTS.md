# 🚀 Como Atualizar o Projeto no GitHub - GUIA RÁPIDO

## ✅ Git Instalado! Agora é Fácil!

Criei 2 scripts automáticos para você. Escolha um:

---

## 🎯 OPÇÃO 1: Script Batch (Mais Simples)

### Como usar:

1. **Localize o arquivo**: `atualizar-github.bat` na pasta do projeto
2. **Clique duas vezes** no arquivo
3. **Digite o link do seu repositório** quando solicitado
   - Exemplo: `https://github.com/seu-usuario/catalogo-minimalista-pro`
4. **Escolha** se quer forçar o push ou não
5. **Pronto!** ✅

---

## 🎯 OPÇÃO 2: Script PowerShell (Mais Completo)

### Como usar:

1. **Clique com botão direito** no arquivo `atualizar-github.ps1`
2. Selecione **"Executar com PowerShell"**
3. **Digite o link do seu repositório** quando solicitado
4. **Escolha** o tipo de push (normal ou force)
5. **Pronto!** ✅

### Se der erro de política de execução:

Abra o PowerShell como Administrador e execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 🎯 OPÇÃO 3: Comandos Manuais

Se preferir executar manualmente, abra um **NOVO PowerShell** e execute:

### Passo 1: Navegar até o projeto
```powershell
cd "C:\Users\win10\Downloads\catalogo-minimalista-pro-master\catalogo-minimalista-pro-master"
```

### Passo 2: Verificar status
```powershell
git status
```

### Passo 3: Conectar ao repositório (SUBSTITUA SEU-USUARIO!)
```powershell
# Se ainda não estiver conectado:
git remote add origin https://github.com/SEU-USUARIO/catalogo-minimalista-pro.git

# OU, se já estiver conectado, atualize:
git remote set-url origin https://github.com/SEU-USUARIO/catalogo-minimalista-pro.git
```

### Passo 4: Adicionar arquivos
```powershell
git add .
```

### Passo 5: Fazer commit
```powershell
git commit -m "✨ Atualiza projeto com novas funcionalidades"
```

### Passo 6: Configurar branch
```powershell
git branch -M main
```

### Passo 7: Enviar para GitHub

**Opção A - Push Normal:**
```powershell
git push -u origin main
```

**Opção B - Force Push (se der erro):**
```powershell
git push -u origin main --force
```

---

## ⚠️ IMPORTANTE: Qual Link Usar?

Você precisa do link do seu repositório no GitHub. Ele tem este formato:

```
https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO
```

**Exemplos:**
- `https://github.com/joaosilva/catalogo-minimalista-pro`
- `https://github.com/maria123/meu-catalogo`

**Como encontrar:**
1. Acesse: https://github.com
2. Faça login
3. Clique no seu repositório
4. Copie o link da barra de endereços

---

## 🔐 Autenticação

Quando executar o script, você será solicitado a fazer login:

### Método 1: Navegador (Automático)
- Uma janela do navegador abrirá
- Faça login no GitHub
- Autorize o acesso
- ✅ Pronto!

### Método 2: Token (Manual)
Se pedir usuário e senha no terminal:

1. **Username**: seu nome de usuário do GitHub
2. **Password**: Use um Personal Access Token

**Como criar o token:**
1. Acesse: https://github.com/settings/tokens
2. "Generate new token" → "Generate new token (classic)"
3. Nome: "Meu Computador"
4. Marque: ✅ **repo**
5. "Generate token"
6. **COPIE O TOKEN**
7. Cole como senha

---

## 📋 Arquivos Criados

| Arquivo | Descrição |
|---------|-----------|
| `atualizar-github.bat` | Script batch - clique duas vezes |
| `atualizar-github.ps1` | Script PowerShell - mais completo |
| `ATUALIZAR_GITHUB.md` | Guia detalhado |
| `COMANDOS_GIT.md` | Referência de comandos |

---

## ❓ Qual Script Usar?

- **Iniciante?** → Use `atualizar-github.bat` (clique duas vezes)
- **Quer mais controle?** → Use `atualizar-github.ps1`
- **Sabe o que está fazendo?** → Use comandos manuais

---

## ✅ Checklist

- [x] Git instalado
- [ ] PowerShell reiniciado (ou abra um novo)
- [ ] Link do repositório em mãos
- [ ] Execute um dos scripts
- [ ] Verifique no GitHub se atualizou

---

## 💡 Dica

**Sempre que fizer mudanças no projeto**, basta executar o script novamente!

---

## 🆘 Problemas?

### "Git não reconhecido"
- **Solução**: Reinicie o PowerShell ou abra um novo terminal

### "Authentication failed"
- **Solução**: Use um Personal Access Token (veja seção Autenticação)

### "Updates were rejected"
- **Solução**: Use force push (opção 2 no script)

### "Permission denied"
- **Solução**: Execute o PowerShell como Administrador

---

## 📞 Precisa do Link do Repositório?

Me informe o link do seu repositório e eu crio os comandos exatos para você!

---

**Boa sorte! 🚀**
