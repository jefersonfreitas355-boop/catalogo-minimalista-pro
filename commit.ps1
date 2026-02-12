# Commit Personalizado para GitHub
# Permite escolher a mensagem do commit

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Commit Personalizado - GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navegar para o diretorio
Set-Location "C:\Users\win10\Downloads\catalogo-minimalista-pro-master\catalogo-minimalista-pro-master"

# Verificar mudancas
Write-Host "Verificando mudancas..." -ForegroundColor Yellow
$status = git status --short
if ($status) {
    Write-Host $status
    Write-Host ""
}
else {
    Write-Host "Nenhuma mudanca detectada!" -ForegroundColor Gray
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit
}

# Adicionar arquivos
Write-Host "Adicionando arquivos..." -ForegroundColor Yellow
git add .
Write-Host ""

# Solicitar mensagem
Write-Host "Digite a mensagem do commit:" -ForegroundColor Yellow
Write-Host "(Deixe em branco para usar mensagem automatica)" -ForegroundColor Gray
Write-Host ""
$mensagem = Read-Host "Mensagem"

if ([string]::IsNullOrWhiteSpace($mensagem)) {
    $timestamp = Get-Date -Format "dd/MM/yyyy HH:mm"
    $mensagem = "Atualiza projeto - $timestamp"
    Write-Host ""
    Write-Host "Usando mensagem automatica: $mensagem" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Fazendo commit..." -ForegroundColor Yellow
git commit -m $mensagem
Write-Host ""

# Push
Write-Host "Enviando para o GitHub..." -ForegroundColor Yellow
git push

if ($LASTEXITCODE -ne 0) {
    Write-Host "Tentando com force..." -ForegroundColor Yellow
    git push --force
}

Write-Host ""
if ($LASTEXITCODE -eq 0) {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Commit concluido com sucesso!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Mensagem: $mensagem" -ForegroundColor White
    Write-Host "Repositorio: https://github.com/jefersonfreitas355-boop/catalogo-minimalista-pro" -ForegroundColor Cyan
    Write-Host ""
    
    # Abrir repositorio
    $abrir = Read-Host "Deseja abrir o repositorio no navegador? (S/N)"
    if ($abrir -eq "S" -or $abrir -eq "s") {
        Start-Process "https://github.com/jefersonfreitas355-boop/catalogo-minimalista-pro"
    }
}
else {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Erro ao enviar!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
}

Write-Host ""
Write-Host "Pressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
