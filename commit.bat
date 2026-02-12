@echo off
chcp 65001 >nul
cls
echo ========================================
echo 💬 Commit Personalizado - GitHub
echo ========================================
echo.

cd /d "C:\Users\win10\Downloads\catalogo-minimalista-pro-master\catalogo-minimalista-pro-master"

echo 📍 Verificando mudancas...
git status --short
echo.

echo 📦 Adicionando arquivos...
git add .
echo.

echo Digite a mensagem do commit:
echo (Exemplo: Adiciona nova funcionalidade de busca)
echo.
set /p MENSAGEM="Mensagem: "

if "%MENSAGEM%"=="" (
    set MENSAGEM=Atualiza projeto - %date% %time%
    echo.
    echo ℹ️ Usando mensagem padrao: %MENSAGEM%
)

echo.
echo 💾 Fazendo commit...
git commit -m "%MENSAGEM%"

echo.
echo 📤 Enviando para o GitHub...
git push

echo.
if errorlevel 1 (
    echo ⚠️ Erro ao enviar! Tentando com force...
    git push --force
)

echo.
echo ========================================
echo ✅ Commit concluido!
echo ========================================
echo.
echo 📝 Mensagem: %MENSAGEM%
echo 🌐 Repositorio: https://github.com/jefersonfreitas355-boop/catalogo-minimalista-pro
echo.
pause
