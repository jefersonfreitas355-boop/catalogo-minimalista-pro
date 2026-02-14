# 🛍️ Catálogo Minimalista Pro

Um catálogo de produtos moderno e minimalista desenvolvido com React, TypeScript e Vite. Este projeto oferece uma experiência de compra elegante com integração WhatsApp para finalização de pedidos.

## ✨ Funcionalidades

- 📱 **Design Responsivo**: Interface adaptável para todos os dispositivos
- 🛒 **Carrinho de Compras**: Sistema completo de gerenciamento de carrinho
- 💬 **Integração WhatsApp**: Finalização de pedidos via WhatsApp com formatação profissional
- 🔍 **Busca de Produtos**: Sistema de busca e filtros por categoria
- 🎨 **Interface Moderna**: Design minimalista com animações suaves
- 🔥 **Firebase Hosting**: Deploy otimizado com Firebase
- ⚡ **Performance**: Build otimizado com Vite

## 🚀 Tecnologias

- **React 19** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool moderna e rápida
- **React Router DOM** - Roteamento para aplicações React
- **Firebase** - Plataforma de desenvolvimento de aplicativos
- **Context API** - Gerenciamento de estado global

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta no Firebase (para deploy)

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/catalogo-minimalista-pro.git
cd catalogo-minimalista-pro
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente** (se necessário)
```bash
# Crie um arquivo .env.local na raiz do projeto
# Adicione suas configurações do Firebase
```

4. **Execute o projeto localmente**
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 📦 Build para Produção

Para gerar a versão otimizada para produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

## 🚀 Deploy

### Firebase Hosting

1. **Instale o Firebase CLI** (se ainda não tiver)
```bash
npm install -g firebase-tools
```

2. **Faça login no Firebase**
```bash
firebase login
```

3. **Inicialize o Firebase** (se ainda não foi feito)
```bash
firebase init hosting
```

4. **Deploy para produção**
```bash
npm run build
firebase deploy
```

Para mais detalhes sobre deploy, consulte o arquivo [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)

## 📱 Configuração do WhatsApp

Para configurar o número do WhatsApp para receber pedidos, consulte o arquivo [WHATSAPP_CONFIG.md](WHATSAPP_CONFIG.md)

## 📚 Documentação Adicional

- [ADMIN_ACCESS.md](ADMIN_ACCESS.md) - Guia de acesso administrativo
- [BULK_IMPORT_GUIDE.md](BULK_IMPORT_GUIDE.md) - Importação em massa de produtos
- [FIREBASE_INTEGRATION.md](FIREBASE_INTEGRATION.md) - Integração com Firebase
- [SUPABASE_INTEGRATION.md](SUPABASE_INTEGRATION.md) - Integração com Supabase
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Solução de problemas comuns

## 🛠️ Estrutura do Projeto

```
catalogo-minimalista-pro/
├── components/          # Componentes React reutilizáveis
├── context/            # Context API para gerenciamento de estado
├── lib/                # Bibliotecas e configurações
├── pages/              # Páginas da aplicação
├── utils/              # Funções utilitárias
├── types.ts            # Definições de tipos TypeScript
├── data.ts             # Dados dos produtos
├── App.tsx             # Componente principal
├── index.tsx           # Ponto de entrada
└── vite.config.ts      # Configuração do Vite
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👤 Autor

Desenvolvido com ❤️ por [Seu Nome]

## 📞 Suporte

Para suporte, entre em contato através do WhatsApp ou abra uma issue no GitHub.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
