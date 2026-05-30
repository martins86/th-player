# 🎬 TH Player — IPTV App para LG webOS

[![Node.js](https://img.shields.io/badge/Node-20+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-61DAFB.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8+-646CFF.svg)](https://vitejs.dev)

[![pages-build-deployment](https://github.com/martins86/th-player/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/martins86/th-player/actions/workflows/pages/pages-build-deployment)

Um aplicativo IPTV moderno e performático para TVs LG webOS, desenvolvido com React, TypeScript e Shaka Player.

---

## 📋 Sobre o Projeto

**TH Player** é um reprodutor IPTV desenvolvido especificamente para LG webOS com foco em:

✅ **Performance** — Otimizado para TVs LG  
✅ **Navegação Remota** — Controle remoto fluido e responsivo  
✅ **Player IPTV** — Suporte a HLS, DASH, M3U playlists  
✅ **Favoritos & Histórico** — Personalisação completa  
✅ **EPG** — Guia de programação eletrônico  
✅ **Múltiplas Categorias** — Organização inteligente  

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 20+
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/martins86/th-player.git
cd th-player

# Instale dependências
npm install

# Inicie o dev server
npm run dev

# Acesse http://localhost:3000
```

### Build
```bash
# Build para produção
npm run build

# Package para webOS
npm run webos:package

# Instalar no emulador/TV
npm run webos:install
```

---

## 📖 Documentação

### 🗂️ Estrutura do Projeto
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** — Organização de pastas e padrões iniciais

### 🎯 Features & Roadmap
- **[FEATURES_ROADMAP.md](./FEATURES_ROADMAP.md)** — Todas as features planejadas com detalhamento completo
- **[GETTING_STARTED.md](./GETTING_STARTED.md)** — Guia passo a passo para começar a primeira feature

### 📚 Documentação Técnica
- **[.documentation/agente/THP-Master-Developer/](./.documentation/agente/THP-Master-Developer/)** — Guias técnicos detalhados
  - `docs/desenvolvimento-thp.md` — Padrões React/TypeScript
  - `docs/integracao-webos.md` — Integração webOS e navegação remota
  - `docs/engenharia-player.md` — Shaka Player e streams IPTV
  - `references/webos-lg-tv.md` — APIs webOS específicas
  - `references/padroes-react-ts.md` — Best practices React

---

## 🏗️ Arquitetura

```
src/
├── components/      # Componentes React reutilizáveis
├── pages/          # Páginas da aplicação (Home, Login, Player)
├── hooks/          # Hooks customizados
├── services/       # Serviços (API, Player, Storage)
├── store/          # Estado global (Zustand)
├── navigation/     # Rotas e navegação remota
├── types/          # Types TypeScript
├── utils/          # Utilitários
├── styles/         # Estilos globais
└── test/           # Testes (Vitest)
```

**[Veja a estrutura completa →](./PROJECT_STRUCTURE.md)**

---

## 📊 Roadmap MVP

### Fase 1: Infraestrutura ⭐
- [x] Setup inicial
- [ ] Integração webOS
- [ ] Navegação com controle remoto
- [ ] Sistema de rotas

### Fase 2: Autenticação 🔐
- [ ] Tela de Login
- [ ] Persistência de sessão

### Fase 3: Listagem de Canais 📺
- [ ] Home com canais
- [ ] Parser M3U
- [ ] Categorias
- [ ] Favoritos

### Fase 4: Player 🎥
- [ ] Integração Shaka Player
- [ ] HLS/DASH
- [ ] Controles

### Fase 5: Complemento ⚙️
- [ ] EPG
- [ ] Histórico
- [ ] Configurações

**[Ver detalhamento completo →](./FEATURES_ROADMAP.md)**

---

## 🎯 Começar com a Primeira Feature

Siga o **[GETTING_STARTED.md](./GETTING_STARTED.md)** para:

1. Entender a primeira feature (Integração webOS)
2. Ver passo a passo de implementação
3. Aprender padrões de código
4. Fazer seu primeiro commit

---

## 💻 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia dev server
npm run build           # Build para produção
npm run preview         # Preview do build

# Qualidade de Código
npm run type-check      # Validar TypeScript
npm run lint            # Verificar ESLint
npm run lint:fix        # Corrigir ESLint
npm run format          # Formatar com Prettier

# Testes
npm run test            # Rodar Vitest
npm run test:run        # Uma única execução
npm run test:coverage   # Com coverage

# webOS
npm run webos:package   # Empacotar para webOS
npm run webos:install   # Instalar no emulador
npm run webos:launch    # Executar app
npm run webos:log       # Ver logs em tempo real
```

---

## 🔧 Stack Técnico

**Frontend:**
- React 19 + TypeScript 6
- Vite 8 + ESLint + Prettier

**Player:**
- Shaka Player 5 (HLS/DASH)

**Navegação:**
- React Router 7
- Spatial Navigation

**Estado:**
- Zustand 5

**Testes:**
- Vitest 1
- @testing-library/react

**webOS:**
- webOS TV SDK

---

## 🎮 Navegação com Controle Remoto

```
    UP
    ↑
LEFT← ENTER →RIGHT
    ↓
   DOWN

BACK:  Voltar para página anterior
RED/GREEN/YELLOW/BLUE: Atalhos customizáveis
```

---

## 📝 Convenções de Commits

```
[THP-XXXX] TIPO - descrição breve

Tipos: FEAT, FIX, REFACTOR, STYLE, DOCS, TEST, PERF, CI
```

Exemplo:
```
[THP-0001] FEAT - Integração webOS com detecção automática
```

---

## 🌐 Compatibilidade

- **webOS:** 3.0+
- **Formatos:** HLS (.m3u8), DASH (.mpd), MP4
- **DRM:** Widevine (futuro)

---

## 📞 Suporte

Para dúvidas:
1. Consulte a [documentação técnica](./.documentation/agente/THP-Master-Developer/)
2. Veja exemplos em [GETTING_STARTED.md](./GETTING_STARTED.md)
3. Revise o [Code Review](./.documentation/agente/THP-Master-Developer/docs/code-review.md)

---

## 📄 Licença

TH Player é um software proprietário com direitos autorais exclusivos.

Copyright (c) 2024-2026 martins86. Todos os direitos reservados.

É proibida qualquer cópia, uso, redistribuição, engenharia reversa ou modificação sem autorização expressa por escrito.

Veja o arquivo [LICENSE](./LICENSE) para os termos completos.

---

## 👨‍💻 Autor

`martins86`

---

**Última atualização:** Maio 2026

