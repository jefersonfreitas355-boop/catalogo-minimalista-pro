@echo off
chcp 65001 >nul
echo ========================================
echo 🚀 Atualizando Catálogo Minimalista Pro
echo 🔗 Repositório: jefersonfreitas355-boop
echo ========================================
echo.

cd /d "C:\Users\win10\Downloads\catalogo-minimalista-pro-master\catalogo-minimalista-pro-master"

echo 📍 Diretório atual:
cd
echo.

echo 🔍 Verificando status do Git...
git status
echo.

echo 🔗 Configurando repositório...
git remote remove origin 2>nul
git remote add origin https://github.com/jefersonfreitas355-boop/catalogo-minimalista-pro.git
echo.

echo ✅ Repositório configurado:
git remote -v
echo.

echo 📦 Adicionando todos os arquivos...
git add .
echo.

echo 💾 Fazendo commit...
git commit -m "✨ Atualiza projeto com novas funcionalidades - Carrinho, WhatsApp e melhorias"
echo.

echo 🌿 Configurando branch main...
git branch -M main
echo.

echo ========================================
echo ⚠️ ATENÇÃO: Tipo de Push
echo ========================================
echo.
echo [1] Push NORMAL (se não houver conflitos)
echo [2] Push FORÇADO (sobrescreve o repositório)
echo.
choice /C 12 /N /M "Escolha uma opção (1 ou 2): "

if errorlevel 2 (
    echo.
    echo 📤 Enviando para o GitHub com FORCE...
    git push -u origin main --force
) else (
    echo.
    echo 📤 Enviando para o GitHub...
    git push -u origin main
)

echo.
if errorlevel 1 (
    echo ❌ Erro ao enviar para o GitHub!
    echo.
    echo Possíveis soluções:
    echo 1. Verifique sua autenticação no GitHub
    echo 2. Tente executar novamente e escolha a opção 2 (force push)
    echo 3. Verifique sua conexão com a internet
    echo.
) else (
    echo ========================================
    echo ✅ Projeto atualizado com sucesso!
    echo ========================================
    echo.
    echo 🌐 Acesse seu repositório em:
    echo https://github.com/jefersonfreitas355-boop/catalogo-minimalista-pro
    echo.
)

pause
