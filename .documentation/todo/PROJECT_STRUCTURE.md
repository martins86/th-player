# 🎬 TH Player — Estrutura do Projeto

## 📁 Arquitetura de Pastas

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── Layout/
│   ├── Navigation/
│   ├── Player/
│   └── Common/
│
├── pages/              # Páginas da aplicação
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Player.tsx
│   └── Settings.tsx
│
├── hooks/              # Hooks customizados
│   ├── useRemoteControl.ts  # Navegação com controle remoto
│   ├── usePlayer.ts         # Gerenciamento do player
│   ├── useNavigation.ts     # Navegação da app
│   └── useWebOS.ts          # Integração webOS
│
├── services/           # Serviços (API, Player, Storage)
│   ├── api.ts          # Cliente HTTP
│   ├── player.ts       # Shaka Player
│   └── storage.ts      # localStorage/webOS storage
│
├── store/              # Estado Global (Zustand)
│   ├── authStore.ts    # Autenticação
│   ├── playerStore.ts  # Estado do player
│   ├── channelStore.ts # Canais IPTV
│   └── uiStore.ts      # Estado da UI
│
├── navigation/         # Rotas e Navegação
│   ├── routes.ts       # Definição de rotas
│   └── spatialNav.ts   # Navegação espacial (remoto)
│
├── types/              # Types/Interfaces Globais
│   └── index.ts
│
├── utils/              # Utilitários
│   ├── logger.ts       # Logging
│   ├── validators.ts   # Validações
│   ├── constants.ts    # Constantes
│   └── helpers.ts      # Funções auxiliares
│
├── styles/             # Estilos Globais
│   └── globals.css     # Estilos adicionais
│
├── test/               # Setup de testes
│   └── setup.ts        # Vitest configuration
│
├── App.tsx             # Root component
├── App.css             # Estilos da App
├── index.css           # Estilos globais
└── main.tsx            # Entry point
```

## 🚀 Primeiros Passos

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar dev server
```bash
npm run dev
```

### 3. Começar a desenvolver
- Crie componentes em `src/components/`
- Crie páginas em `src/pages/`
- Use hooks customizados em `src/hooks/`
- Defina tipos globais em `src/types/`
- Use Zustand para estado global em `src/store/`

## 📚 Padrões de Código

### Componente React
```typescript
// src/components/MyComponent.tsx
import { FC } from 'react'

interface MyComponentProps {
  title: string
  onSelect?: () => void
}

export const MyComponent: FC<MyComponentProps> = ({ title, onSelect }) => {
  return <button onClick={onSelect}>{title}</button>
}
```

### Hook Customizado
```typescript
// src/hooks/useMyHook.ts
import { useState, useCallback } from 'react'

export const useMyHook = () => {
  const [state, setState] = useState(false)
  
  const toggle = useCallback(() => {
    setState(prev => !prev)
  }, [])
  
  return { state, toggle }
}
```

### Store Zustand
```typescript
// src/store/myStore.ts
import { create } from 'zustand'

interface MyStore {
  value: string
  setValue: (value: string) => void
}

export const useMyStore = create<MyStore>((set) => ({
  value: '',
  setValue: (value) => set({ value }),
}))
```

## 🧪 Testes

```bash
# Rodar testes
npm run test

# Modo watch
npm run test:watch

# Com coverage
npm test:coverage
```

## 📦 Build

```bash
# Build para webOS
npm run build

# Package IPK
npm run webos:package
```

## 🔗 Referências

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Shaka Player](https://shaka-player-demo.appspot.com/docs/api/index.html)
- [webOS TV SDK](https://webostv.developer.lge.com/)
