# 📋 Comandos Rápidos - GitHub

## ⚡ Copie e Cole (após instalar o Git)

### 1. Configurar Git (PRIMEIRA VEZ - substitua com seus dados)
```powershell
git config --global user.name "Seu Nome Completo"
git config --global user.email "seu-email@exemplo.com"
```

### 2. Navegar até o projeto
```powershell
cd "C:\Users\win10\Downloads\catalogo-minimalista-pro-master\catalogo-minimalista-pro-master"
```

### 3. Inicializar e fazer primeiro commit
```powershell
git init
git add .
git commit -m "🎉 Commit inicial: Catálogo Minimalista Pro"
```

### 4. Conectar ao GitHub (SUBSTITUA SEU-USUARIO!)
```powershell
git remote add origin https://github.com/SEU-USUARIO/catalogo-minimalista-pro.git
git branch -M main
git push -u origin main
```

---

## 🔄 Atualizações Futuras (copie sempre que fizer mudanças)
```powershell
cd "C:\Users\win10\Downloads\catalogo-minimalista-pro-master\catalogo-minimalista-pro-master"
git add .
git commit -m "✨ Descrição das mudanças"
git push
```

---

## 🔍 Comandos Úteis

### Ver status do repositório
```powershell
git status
```

### Ver histórico de commits
```powershell
git log --oneline
```

### Ver diferenças antes de commitar
```powershell
git diff
```

### Desfazer mudanças não commitadas
```powershell
git checkout .
```

### Ver repositórios remotos configurados
```powershell
git remote -v
```

---

## 🌿 Trabalhando com Branches

### Criar nova branch
```powershell
git checkout -b nome-da-branch
```

### Listar branches
```powershell
git branch
```

### Mudar de branch
```powershell
git checkout nome-da-branch
```

### Voltar para main
```powershell
git checkout main
```

### Mesclar branch na main
```powershell
git checkout main
git merge nome-da-branch
```

---

## 🔧 Correções Rápidas

### Remover remote origin
```powershell
git remote remove origin
```

### Adicionar remote origin novamente
```powershell
git remote add origin https://github.com/SEU-USUARIO/catalogo-minimalista-pro.git
```

### Forçar push (USE COM CUIDADO!)
```powershell
git push -f origin main
```

### Puxar mudanças do GitHub
```powershell
git pull origin main
```

---

## 📝 Mensagens de Commit com Emojis

Copie e cole, substituindo a descrição:

```powershell
git commit -m "✨ Adiciona nova funcionalidade"
git commit -m "🐛 Corrige bug"
git commit -m "💄 Atualiza estilos"
git commit -m "📝 Atualiza documentação"
git commit -m "🚀 Deploy"
git commit -m "♻️ Refatora código"
git commit -m "⚡ Melhora performance"
git commit -m "🔧 Atualiza configuração"
git commit -m "🎨 Melhora estrutura do código"
git commit -m "🔥 Remove código desnecessário"
git commit -m "✅ Adiciona testes"
git commit -m "🔒 Corrige segurança"
```

---

## 🎯 Fluxo de Trabalho Completo

```powershell
# 1. Navegar até o projeto
cd "C:\Users\win10\Downloads\catalogo-minimalista-pro-master\catalogo-minimalista-pro-master"

# 2. Ver o que mudou
git status

# 3. Adicionar mudanças
git add .

# 4. Ver diferenças (opcional)
git diff --staged

# 5. Fazer commit
git commit -m "✨ Descrição clara do que foi feito"

# 6. Enviar para GitHub
git push

# 7. Verificar no navegador
# Acesse: https://github.com/SEU-USUARIO/catalogo-minimalista-pro
```

---

## 💡 Dicas

- Use `git status` frequentemente para ver o estado do repositório
- Faça commits pequenos e frequentes
- Escreva mensagens de commit claras e descritivas
- Sempre faça `git pull` antes de começar a trabalhar
- Use branches para novas funcionalidades
