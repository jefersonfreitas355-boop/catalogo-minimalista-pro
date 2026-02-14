@echo off
chcp 65001 >nul
echo ========================================
echo 🚀 Commit Automatico - GitHub
echo ========================================
echo.

cd /d "C:\Users\win10\Downloads\catalogo-minimalista-pro-master\catalogo-minimalista-pro-master"

echo 📍 Verificando mudancas...
git status --short
echo.

echo 📦 Adicionando arquivos...
git add .

echo 💾 Fazendo commit automatico...
git commit -m "Atualiza projeto - %date% %time%"

echo 📤 Enviando para o GitHub...
git push

echo.
if errorlevel 1 (
    echo ❌ Erro ao enviar! Tentando com force...
    git push --force
)

echo.
echo ========================================
echo ✅ Commit concluido!
echo ========================================
echo.
echo 🌐 Repositorio: https://github.com/jefersonfreitas355-boop/catalogo-minimalista-pro
echo.
pause
