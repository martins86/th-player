# 🏗️ Arquitetura TH Player — Padrões e Estrutura

## Filosofia de Arquitetura

**Princípios:**
- 🎯 **Performance First** - TV é um dispositivo restrito
- 🔒 **Type Safety** - TypeScript rigoroso (zero any)
- 📦 **Modular** - Features independentes e isoladas
- 🧪 **Testable** - Código fácil de testar
- 📖 **Clear** - Estrutura lógica e fácil de navegar

---

## Estrutura de Pastas (Canonical)

```
th-player/
├── src/
│   ├── components/                    # Componentes reutilizáveis
│   │   ├── Common/                    # Button, Card, Loading, etc
│   │   ├── Layout/                    # Header, Footer, Sidebar
│   │   └── Player/                    # Componentes do player
│   │
│   ├── features/                      # Features auto-contidas
│   │   ├── auth/                      # Feature: Autenticação
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── store/
│   │   │   ├── types/
│   │   │   └── index.ts               # Public API
│   │   ├── channels/                  # Feature: Canais IPTV
│   │   ├── favorites/                 # Feature: Favoritos
│   │   └── player/                    # Feature: Reprodução
│   │
│   ├── hooks/                         # Hooks globais
│   │   ├── useRemoteControl.ts
│   │   ├── usePlayer.ts
│   │   └── index.ts
│   │
│   ├── services/                      # Serviços (API, storage, etc)
│   │   ├── api.ts
│   │   ├── player.ts
│   │   ├── storage.ts
│   │   ├── m3uParser.ts
│   │   └── index.ts
│   │
│   ├── store/                         # Estado global Zustand
│   │   ├── authStore.ts
│   │   ├── playerStore.ts
│   │   ├── uiStore.ts
│   │   └── index.ts
│   │
│   ├── navigation/                    # Rotas e navegação
│   │   ├── routes.ts
│   │   ├── spatialNav.ts
│   │   └── index.ts
│   │
│   ├── pages/                         # Páginas (não reutilizáveis)
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Player.tsx
│   │   └── index.ts
│   │
│   ├── styles/                        # Estilos globais
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── animations.css
│   │
│   ├── types/                         # Types/Interfaces globais
│   │   ├── channel.types.ts
│   │   ├── user.types.ts
│   │   ├── api.types.ts
│   │   └── index.ts
│   │
│   ├── utils/                         # Utilitários
│   │   ├── logger.ts
│   │   ├── validators.ts
│   │   ├── constants.ts
│   │   └── index.ts
│   │
│   ├── test/                          # Setup de testes
│   │   ├── setup.ts
│   │   ├── fixtures/
│   │   └── mocks/
│   │
│   ├── App.tsx                        # Root component
│   └── main.tsx                       # Entry point
│
├── public/                            # Assets públicos
├── appinfo.json                       # Config LG webOS
├── vite.config.ts                     # Config Vite
├── tsconfig.json                      # Config TypeScript
└── package.json
```

---

## Pattern: Feature-Based Structure

### Feature: Autenticação (Exemplo)

```
src/features/auth/
├── components/
│   ├── LoginForm.tsx                  # Form de login
│   ├── LoginForm.test.ts
│   └── LogoutButton.tsx
├── hooks/
│   ├── useAuth.ts                     # Hook para usar auth
│   ├── useAuth.test.ts
│   └── useLogin.ts
├── services/
│   ├── authService.ts                 # Chamadas API
│   ├── authService.test.ts
│   └── tokenManager.ts                # Gerenciar JWT
├── store/
│   ├── authStore.ts                   # Estado global
│   └── authStore.test.ts
├── types/
│   ├── auth.types.ts                  # Interfaces
│   └── index.ts
├── __mocks__/
│   └── authService.ts                 # Mocks para testes
├── index.ts                           # Public API
└── README.md                          # Docs da feature
```

**Arquivo index.ts (Public API):**
```typescript
// src/features/auth/index.ts
export { useAuth } from './hooks/useAuth';
export { LoginForm } from './components/LoginForm';
export { useAuthStore } from './store/authStore';
export type { User, AuthState } from './types/auth.types';
```

**Como usar:**
```typescript
// ✅ BOM: Import da public API
import { useAuth, LoginForm } from '@features/auth';

// ❌ MÁ: Imports internos diretos
import { useAuth } from '@features/auth/hooks/useAuth';
```

---

## Data Flow Architecture

```
┌─────────────────┐
│   Usuário (TV)  │
└────────┬────────┘
         │ Interage (remoto)
         ▼
┌─────────────────┐
│   Components    │ (UI)
└────────┬────────┘
         │ Chama
         ▼
┌─────────────────┐
│  Hooks / Store  │ (State Management)
└────────┬────────┘
         │ Atualiza
         ▼
┌─────────────────┐
│   Services      │ (Business Logic)
└────────┬────────┘
         │ Usa
         ▼
┌─────────────────┐
│   APIs/Storage  │ (Data)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Backend/DB    │
└─────────────────┘
```

---

## Dependencies Management

### Camadas de Dependência (Não Quebrar!)

```
┌─────────────────────────────┐
│ Pages (Contêm features)     │  Nível 4
├─────────────────────────────┤
│ Features (Isoladas)         │  Nível 3
├─────────────────────────────┤
│ Components + Hooks + Store  │  Nível 2
├─────────────────────────────┤
│ Services + Types + Utils    │  Nível 1
├─────────────────────────────┤
│ External libraries          │  Nível 0
└─────────────────────────────┘

REGRA: Só importar de níveis ABAIXO!

✅ Feature auth pode usar: Services, Types, Utils, Libraries
❌ Feature auth NÃO pode usar: Components globais para player específico
```

---

## State Management Pattern

### Zustand Store Template

```typescript
// src/store/playerStore.ts
import { create } from 'zustand';

// 1. Define types
interface Channel {
  id: string;
  name: string;
  url: string;
}

interface PlayerState {
  // State
  currentChannel: Channel | null;
  isPlaying: boolean;
  
  // Actions
  setCurrentChannel: (channel: Channel) => void;
  play: () => void;
  pause: () => void;
}

// 2. Create store
export const usePlayerStore = create<PlayerState>((set) => ({
  // Initial state
  currentChannel: null,
  isPlaying: false,

  // Actions
  setCurrentChannel: (channel) => set({ currentChannel: channel }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
}));

// 3. Selectors (para otimizar re-renders)
export const selectCurrentChannel = (state: PlayerState) => state.currentChannel;
export const selectIsPlaying = (state: PlayerState) => state.isPlaying;
```

**Usar com selectors:**
```typescript
// ✅ BOM: Usa selector para re-render otimizado
const currentChannel = usePlayerStore(selectCurrentChannel);

// ❌ MÁ: Recarrega tudo se qualquer coisa mudar
const { currentChannel } = usePlayerStore();
```

---

## Error Handling Strategy

```typescript
// 1. Definir classes de erro customizadas
export class APIError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// 2. Throw em services
export const fetchChannels = async () => {
  const response = await fetch('/api/channels');
  if (!response.ok) {
    throw new APIError(
      'FETCH_ERROR',
      response.status,
      'Falha ao buscar canais'
    );
  }
  return response.json();
};

// 3. Handle em componentes
const Channels = () => {
  const [error, setError] = useState<APIError | null>(null);

  useEffect(() => {
    fetchChannels()
      .then(setChannels)
      .catch((err) => {
        if (err instanceof APIError) {
          setError(err);
        } else {
          setError(new APIError('UNKNOWN', 500, 'Erro desconhecido'));
        }
      });
  }, []);

  if (error) {
    return <ErrorBoundary error={error} />;
  }

  return <div>{/* ... */}</div>;
};
```

---

## Performance Patterns

### 1. Code Splitting

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'player': ['shaka-player'],
          'nav': ['@noriginmedia/norigin-spatial-navigation'],
        },
      },
    },
  },
});
```

### 2. Lazy Loading de Features

```typescript
// src/navigation/routes.ts
import { lazy } from 'react';

export const routes = [
  {
    path: '/',
    element: lazy(() => import('@pages/Home')),
  },
  {
    path: '/player/:id',
    element: lazy(() => import('@pages/Player')),
  },
  {
    path: '/settings',
    element: lazy(() => import('@pages/Settings')),
  },
];
```

### 3. Memoization

```typescript
// Componente pesado memoizado
const ChannelItem = memo(({ channel, onSelect }: Props) => (
  <div onClick={() => onSelect(channel.id)}>
    {channel.name}
  </div>
), (prevProps, nextProps) => {
  // Custom comparison se necessário
  return prevProps.channel.id === nextProps.channel.id;
});
```

---

## Testing Architecture

```
src/
├── __tests__/                         # Global tests
│   ├── integration/
│   └── e2e/
├── components/
│   ├── ChannelCard.tsx
│   └── __tests__/
│       └── ChannelCard.test.ts        # Test colocalizado
├── services/
│   ├── api.ts
│   └── __tests__/
│       └── api.test.ts
└── features/
    └── auth/
        └── __tests__/                 # Tests da feature
            ├── auth.integration.test.ts
            └── authStore.test.ts
```

**Tipos de testes:**
- **Unit:** Componentes, hooks, utils individuais (>80% coverage)
- **Integration:** Features completas funcionando
- **E2E:** Workflows reais (opcional em MVP)

---

## Checklist de Arquitetura

- [ ] Estrutura de pastas segue padrão feature-based
- [ ] Sem imports circulares
- [ ] Dependências respeitam as camadas
- [ ] Public APIs definidas em index.ts
- [ ] Estado global em Zustand
- [ ] Services para lógica de negócio
- [ ] Types centralizados
- [ ] Testes colocalizados
- [ ] Error handling com classes customizadas
- [ ] Code splitting configurado
