# Script para Atualizar o Projeto no GitHub
# Repositorio: jefersonfreitas355-boop/catalogo-minimalista-pro

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Atualizando Catalogo Minimalista Pro" -ForegroundColor Cyan
Write-Host "Repositorio: jefersonfreitas355-boop" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navegar para o diretorio do projeto
Set-Location "C:\Users\win10\Downloads\catalogo-minimalista-pro-master\catalogo-minimalista-pro-master"

Write-Host "Diretorio atual:" -ForegroundColor Yellow
Get-Location
Write-Host ""

# Verificar se Git esta instalado
Write-Host "Verificando instalacao do Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Git instalado: $gitVersion" -ForegroundColor Green
        Write-Host ""
    }
    else {
        throw "Git nao encontrado"
    }
}
catch {
    Write-Host "Git nao encontrado!" -ForegroundColor Red
    Write-Host "Por favor, reinicie o PowerShell apos instalar o Git." -ForegroundColor Red
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit
}

# URL do repositorio
$repoUrl = "https://github.com/jefersonfreitas355-boop/catalogo-minimalista-pro.git"

# Verificar se ja e um repositorio Git
Write-Host "Verificando status do Git..." -ForegroundColor Yellow
$isGitRepo = Test-Path ".git"

if (-not $isGitRepo) {
    Write-Host "Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
    Write-Host ""
}

# Remover e adicionar remote
Write-Host "Configurando repositorio remoto..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin $repoUrl
Write-Host ""

# Verificar remote configurado
Write-Host "Repositorio configurado:" -ForegroundColor Green
git remote -v
Write-Host ""

# Adicionar arquivos
Write-Host "Adicionando todos os arquivos..." -ForegroundColor Yellow
git add .
Write-Host ""

# Verificar o que sera commitado
Write-Host "Resumo das mudancas:" -ForegroundColor Yellow
$status = git status --short
if ($status) {
    Write-Host $status
}
else {
    Write-Host "Nenhuma mudanca detectada" -ForegroundColor Gray
}
Write-Host ""

# Fazer commit
Write-Host "Fazendo commit..." -ForegroundColor Yellow
$commitMessage = "Atualiza projeto com novas funcionalidades - Carrinho, WhatsApp e melhorias"
git commit -m $commitMessage
Write-Host ""

# Configurar branch main
Write-Host "Configurando branch main..." -ForegroundColor Yellow
git branch -M main
Write-Host ""

# Perguntar sobre force push
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ATENCAO: Escolha o tipo de push" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "[1] Push NORMAL (recomendado se nao houver conflitos)" -ForegroundColor White
Write-Host "[2] Push FORCADO (sobrescreve o repositorio)" -ForegroundColor Red
Write-Host ""
$choice = Read-Host "Escolha uma opcao (1 ou 2)"

Write-Host ""
if ($choice -eq "2") {
    Write-Host "Enviando para o GitHub (FORCE)..." -ForegroundColor Red
    Write-Host "Isso vai sobrescrever o repositorio remoto!" -ForegroundColor Yellow
    Write-Host ""
    git push -u origin main --force
}
else {
    Write-Host "Enviando para o GitHub..." -ForegroundColor Green
    git push -u origin main
}

Write-Host ""

if ($LASTEXITCODE -eq 0) {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Projeto atualizado com sucesso!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Acesse seu repositorio em:" -ForegroundColor Yellow
    Write-Host "https://github.com/jefersonfreitas355-boop/catalogo-minimalista-pro" -ForegroundColor Cyan
    Write-Host ""
    
    # Abrir no navegador
    $openBrowser = Read-Host "Deseja abrir o repositorio no navegador? (S/N)"
    if ($openBrowser -eq "S" -or $openBrowser -eq "s") {
        Start-Process "https://github.com/jefersonfreitas355-boop/catalogo-minimalista-pro"
    }
}
else {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Erro ao enviar para o GitHub!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possiveis solucoes:" -ForegroundColor Yellow
    Write-Host "1. Verifique sua autenticacao no GitHub" -ForegroundColor White
    Write-Host "2. Tente executar novamente e escolha a opcao 2 (force push)" -ForegroundColor White
    Write-Host "3. Verifique sua conexao com a internet" -ForegroundColor White
    Write-Host ""
}

Write-Host ""
Write-Host "Pressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
