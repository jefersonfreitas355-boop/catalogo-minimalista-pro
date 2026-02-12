# 🔄 Guia: Atualizar Projeto Existente no GitHub

Este guia é para quando você já tem o projeto no GitHub e quer enviar as atualizações mais recentes.

---

## ⚠️ PASSO 1: Instalar o Git (se ainda não tiver)

### Verificar se o Git está instalado:
```powershell
git --version
```

Se aparecer um erro, você precisa instalar:

1. **Baixe o Git**: https://git-scm.com/download/win
2. **Execute o instalador**
3. **IMPORTANTE**: Selecione "Git from the command line and also from 3rd-party software"
4. **Reinicie o PowerShell** após a instalação

---

## 🚀 PASSO 2: Atualizar o Repositório

### Opção A: Se o projeto já está conectado ao Git

Abra o PowerShell e execute:

```powershell
# 1. Navegar até o projeto
cd "C:\Users\win10\Downloads\catalogo-minimalista-pro-master\catalogo-minimalista-pro-master"

# 2. Ver o status (quais arquivos mudaram)
git status

# 3. Adicionar todas as mudanças
git add .

# 4. Fazer commit com mensagem descritiva
git commit -m "✨ Atualiza projeto com novas funcionalidades"

# 5. Enviar para o GitHub
git push
```

### Opção B: Se o projeto NÃO está conectado ao Git

Se você baixou o projeto de novo ou ele não está conectado:

```powershell
# 1. Navegar até o projeto
cd "C:\Users\win10\Downloads\catalogo-minimalista-pro-master\catalogo-minimalista-pro-master"

# 2. Verificar se já tem Git inicializado
git status

# Se der erro "not a git repository", inicialize:
git init

# 3. Conectar ao seu repositório do GitHub (SUBSTITUA SEU-USUARIO!)
git remote add origin https://github.com/SEU-USUARIO/catalogo-minimalista-pro.git

# OU, se já existir o remote, atualize:
git remote set-url origin https://github.com/SEU-USUARIO/catalogo-minimalista-pro.git

# 4. Adicionar todos os arquivos
git add .

# 5. Fazer commit
git commit -m "✨ Atualiza projeto completo"

# 6. Renomear branch para main (se necessário)
git branch -M main

# 7. Enviar para o GitHub (pode precisar de --force se for sobrescrever)
git push -u origin main

# Se der erro, force o push (CUIDADO: isso sobrescreve o repositório!)
git push -u origin main --force
```

---

## 🔍 Verificar Qual é o Seu Caso

Execute este comando para descobrir:

```powershell
cd "C:\Users\win10\Downloads\catalogo-minimalista-pro-master\catalogo-minimalista-pro-master"
git remote -v
```

**Resultado possível 1**: Mostra o link do GitHub
- ✅ Seu projeto está conectado! Use a **Opção A**

**Resultado possível 2**: Erro "not a git repository"
- ⚠️ Projeto não está conectado. Use a **Opção B**

---

## 📝 Mensagens de Commit Sugeridas

Escolha uma mensagem que descreva suas mudanças:

```powershell
# Atualização geral
git commit -m "✨ Atualiza projeto com melhorias gerais"

# Novas funcionalidades
git commit -m "✨ Adiciona integração com WhatsApp e carrinho de compras"

# Correções
git commit -m "🐛 Corrige bugs e melhora performance"

# Atualização de design
git commit -m "💄 Atualiza design e interface do usuário"

# Atualização completa
git commit -m "🚀 Atualização completa do projeto"
```

---

## ⚡ Comandos Rápidos (Copie e Cole)

### Para atualização rápida (se já está conectado):

```powershell
cd "C:\Users\win10\Downloads\catalogo-minimalista-pro-master\catalogo-minimalista-pro-master"
git add .
git commit -m "✨ Atualiza projeto"
git push
```

### Para reconectar e atualizar (se não está conectado):

```powershell
cd "C:\Users\win10\Downloads\catalogo-minimalista-pro-master\catalogo-minimalista-pro-master"
git init
git remote add origin https://github.com/SEU-USUARIO/catalogo-minimalista-pro.git
git add .
git commit -m "✨ Atualiza projeto completo"
git branch -M main
git push -u origin main --force
```

**⚠️ IMPORTANTE**: Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub!

---

## 🔐 Autenticação

Quando você executar `git push`, será solicitado login:

### Método 1: Autenticação via Navegador (Recomendado)
- Uma janela do navegador abrirá automaticamente
- Faça login no GitHub
- Autorize o acesso

### Método 2: Personal Access Token
Se pedir usuário e senha no terminal:

1. **Username**: seu nome de usuário do GitHub
2. **Password**: Use um **Personal Access Token** (não sua senha!)

**Como criar um token:**
1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token" → "Generate new token (classic)"
3. Nome: "Meu Computador"
4. Marque: ✅ **repo** (todos os sub-itens)
5. Clique em "Generate token"
6. **COPIE O TOKEN** (você não verá novamente!)
7. Use como senha quando o Git solicitar

---

## ❓ Problemas Comuns

### ❌ Erro: "Updates were rejected"

**Causa**: O repositório no GitHub tem mudanças que você não tem localmente.

**Solução 1** (Recomendada - mesclar mudanças):
```powershell
git pull origin main --rebase
git push
```

**Solução 2** (Sobrescrever tudo - USE COM CUIDADO!):
```powershell
git push -u origin main --force
```

### ❌ Erro: "remote origin already exists"

**Solução**:
```powershell
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/catalogo-minimalista-pro.git
```

### ❌ Erro: "not a git repository"

**Solução**: Inicialize o Git:
```powershell
git init
```

### ❌ Erro: "Authentication failed"

**Solução**: Use um Personal Access Token em vez da senha (veja seção "Autenticação")

---

## ✅ Verificar se Funcionou

1. Acesse seu repositório: `https://github.com/SEU-USUARIO/catalogo-minimalista-pro`
2. Verifique se os arquivos foram atualizados
3. Veja a data do último commit - deve ser recente!

---

## 🎯 Fluxo Completo Recomendado

```powershell
# 1. Navegar até o projeto
cd "C:\Users\win10\Downloads\catalogo-minimalista-pro-master\catalogo-minimalista-pro-master"

# 2. Verificar status
git status

# 3. Ver quais arquivos mudaram
git diff --stat

# 4. Adicionar mudanças
git add .

# 5. Verificar o que será commitado
git status

# 6. Fazer commit
git commit -m "✨ Atualiza projeto com novas funcionalidades"

# 7. Enviar para GitHub
git push

# 8. Verificar no navegador
# Acesse: https://github.com/SEU-USUARIO/catalogo-minimalista-pro
```

---

## 💡 Dicas Importantes

- ✅ Sempre faça `git status` antes de commitar
- ✅ Verifique se está no diretório correto
- ✅ Use mensagens de commit descritivas
- ⚠️ Use `--force` apenas se tiver certeza
- ⚠️ Faça backup antes de usar `--force`
- 💾 O GitHub é um excelente backup do seu código

---

## 📞 Qual é o Link do Seu Repositório?

Para facilitar, me informe o link do seu repositório no GitHub, assim posso te dar os comandos exatos!

Exemplo: `https://github.com/seu-usuario/nome-do-repositorio`

---

**Boa sorte com a atualização! 🚀**
