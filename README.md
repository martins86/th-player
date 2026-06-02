# 🎬 TH Player — App IPTV para TVs

[![Node.js](https://img.shields.io/badge/Node-20+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-61DAFB.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8+-646CFF.svg)](https://vitejs.dev)

[![CI/CD — TH Player webOS](https://github.com/martins86/th-player/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/martins86/th-player/actions/workflows/ci-cd.yml)
[![pages-build-deployment](https://github.com/martins86/th-player/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/martins86/th-player/actions/workflows/pages/pages-build-deployment)

> Um aplicativo IPTV moderno e performático, desenvolvido com React, TypeScript e Shaka Player.

## 📋 Sobre o Projeto

**TH Player** é um reprodutor IPTV desenvolvido com foco em:

✅ **Performance** — Otimizado para TVs
✅ **Navegação Remota** — Controle remoto fluido e responsivo  
✅ **Player IPTV** — Suporte a HLS, DASH, M3U playlists  
✅ **Favoritos & Histórico** — Personalisação completa  
✅ **EPG** — Guia de programação eletrônico  
✅ **Múltiplas Categorias** — Organização inteligente

## 🏗️ Arquitetura

```bash
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

### 👨‍💻 Autor

`Thiago Martins de Freitas`

---

### 📄 Licença

TH Player é um software proprietário com direitos autorais exclusivos.

Copyright (c) 2024-2026 martins86. Todos os direitos reservados.

**É proibida qualquer cópia, uso, redistribuição, engenharia reversa ou modificação sem autorização expressa por escrito.**

> Veja o arquivo [LICENSE](./LICENSE) para os termos completos.
