# 🏗️ Setup Inicial — TH Player do Zero

## 1. Pré-requisitos

```bash
# Node.js (v20+)
node -v

# npm
npm -v

# Git
git --version

# webOS CLI (instalar depois)
npm install -g @webos-tools/cli
```

---

## 2. Criar Projeto Base com Vite

```bash
# Criar novo projeto React + TypeScript com Vite
npm create vite@latest th-player -- --template react-ts

# Entrar na pasta
cd th-player

# Instalar dependências
npm install
```

---

## 3. Instalar Bibliotecas Essenciais

```bash
# Dependências de produção

# Player IPTV
npm install shaka-player

# Navegação TV
npm install @noriginmedia/norigin-spatial-navigation

# Rotas
npm install react-router-dom

# Estado global
npm install zustand

# HTTP client
npm install axios

# Utilidades
npm install clsx classnames lodash-es


# Dependências de desenvolvimento

# Testes
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom

# ESLint
npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks

# Prettier
npm install --save-dev prettier

# TypeScript
npm install --save-dev typescript @types/react @types/react-dom @types/node

# Build
npm install --save-dev @vitejs/plugin-react

# Types
npm install --save-dev @types/shaka-player
```

---

## 4. Configurar TypeScript

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"],
      "@services/*": ["src/services/*"],
      "@store/*": ["src/store/*"],
      "@types/*": ["src/types/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 5. Configurar Vite

**vite.config.ts:**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          player: ['shaka-player'],
          spatial: ['@noriginmedia/norigin-spatial-navigation'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
```

---

## 6. Configurar ESLint + Prettier

**.eslintrc.json:**
```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint"
  ],
  "rules": {
    "no-var": "error",
    "prefer-const": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "react/react-in-jsx-scope": "off"
  }
}
```

**.prettierrc:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "always"
}
```

---

## 7. Configurar Vitest

**vite.config.ts (adicionar test config):**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/index.ts',
      ],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
});
```

**src/test/setup.ts:**
```typescript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});
```

---

## 8. Criar appinfo.json

**appinfo.json** (na raiz do projeto):
```json
{
  "id": "com.thplayer.app",
  "version": "1.0.0",
  "vendor": "TH Player",
  "type": "web",
  "main": "index.html",
  "title": "TH Player",
  "subtitle": "App IPTV para LG webOS",
  "description": "Reproduza seus canais IPTV favoritos",
  "icon": "icon.png",
  "iconColor": "#000000",
  "requiredMemory": 512,
  "uiRevision": 2,
  "regions": ["*"],
  "requiredPermissions": [
    "device:id",
    "http",
    "https",
    "cors",
    "media.client"
  ],
  "locales": {
    "en-US": {
      "title": "TH Player",
      "subtitle": "IPTV App"
    },
    "pt-BR": {
      "title": "TH Player",
      "subtitle": "App IPTV"
    }
  }
}
```

---

## 9. Scripts npm

**package.json (adicionar/atualizar scripts):**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx",
    "lint:fix": "eslint src --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,css}\"",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "webos:package": "npm run build && ares-package dist",
    "webos:install": "ares-install com.thplayer.app_1.0.0_all.ipk",
    "webos:launch": "ares-launch com.thplayer.app",
    "webos:log": "ares-log com.thplayer.app",
    "webos:all": "npm run build && npm run webos:package && npm run webos:install && npm run webos:launch"
  }
}
```

---

## 10. Estrutura de Pastas Inicial

```
th-player/
├── public/
│   ├── icon.png                    # Ícone 80x80
│   ├── icon-large.png              # Ícone 400x400
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx
│   │   ├── Navigation/
│   │   │   ├── ChannelList.tsx
│   │   │   └── CategoryNav.tsx
│   │   ├── Player/
│   │   │   ├── VideoPlayer.tsx
│   │   │   └── PlayerControls.tsx
│   │   └── Common/
│   │       ├── Button.tsx
│   │       └── Loading.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── Player.tsx
│   ├── hooks/
│   │   ├── useRemoteControl.ts
│   │   └── usePlayer.ts
│   ├── services/
│   │   ├── api.ts
│   │   └── player.ts
│   ├── store/
│   │   ├── authStore.ts
│   │   └── playerStore.ts
│   ├── navigation/
│   │   ├── routes.ts
│   │   └── spatialNav.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   └── constants.ts
│   ├── styles/
│   │   ├── global.css
│   │   └── animations.css
│   ├── types/
│   │   └── index.ts
│   ├── test/
│   │   └── setup.ts
│   ├── App.tsx
│   └── main.tsx
├── appinfo.json                    # Obrigatório LG
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .eslintrc.json
├── .prettierrc
└── README.md
```

---

## 11. App Inicial (src/App.tsx)

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@components/Layout/Layout';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Player from '@pages/Player';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/player/:id" element={<Player />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## 12. First Run

```bash
# 1. Instalar dependências (já feito acima)
npm install

# 2. Iniciar dev server
npm run dev
# Acesso: http://localhost:3000

# 3. Rodar testes
npm test

# 4. Build para webOS
npm run webos:all
```

---

## 13. Verificar Setup

**Checklist de Setup:**

- [ ] Node 20+ instalado
- [ ] npm install executado sem erros
- [ ] npm run dev funciona
- [ ] Todos os arquivos de config criados
- [ ] appinfo.json criado
- [ ] Estrutura de pastas criada
- [ ] npm test passa (ou 0 warnings)
- [ ] ESLint/Prettier configurados
- [ ] TypeScript sem erros
- [ ] Build gera sem erros

---

## 14. Git Initial Commit

```bash
# Inicializar git (se não tiver)
git init

# Adicionar arquivos
git add .

# First commit
git commit -m "[THP-0001] FEAT - Setup inicial do projeto TH Player"

# Criar branch de desenvolvimento
git checkout -b develop
git push origin develop
```

---

## Próximos Passos

1. ✅ Setup completo
2. → Implementar Login (autenticação)
3. → Criar Home (lista de canais)
4. → Integrar Player IPTV
5. → Publicar na LG Store
