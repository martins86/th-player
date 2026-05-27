# ⚛️ Padrões React 18 + TypeScript — Best Practices

## 1. Tipagem de Componentes

### Props Interface (OBRIGATÓRIO)

```typescript
// ✅ BOM
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`btn btn-${variant} ${className}`}
  >
    {label}
  </button>
);

// ❌ PROIBIDO
export const Button = (props) => (
  <button {...props}>{props.label}</button>
);
```

### Children Typing

```typescript
// ✅ BOM: Tipado corretamente
interface CardProps {
  title: string;
  children: ReactNode;  // ou React.PropsWithChildren
}

export const Card: FC<CardProps> = ({ title, children }) => (
  <div className="card">
    <h2>{title}</h2>
    <div>{children}</div>
  </div>
);

// ❌ MÁ: Sem tipar children
export const Card: FC = ({ title, children }) => (
  // ...
);
```

---

## 2. Hooks Customizados

### Padrão useXxx

```typescript
// Hook customizado bem estruturado
interface UsePlayerOptions {
  autoPlay?: boolean;
  onReady?: () => void;
  onError?: (error: Error) => void;
}

export const usePlayer = (options: UsePlayerOptions = {}) => {
  const { autoPlay = false, onReady, onError } = options;
  const [state, setState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
  });

  const play = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: true }));
  }, []);

  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup
    };
  }, []);

  return {
    state,
    play,
    pause,
    // Não retornar setState diretamente
  };
};
```

**Regras:**
- ✅ Retornar object com state + actions
- ✅ Usar useCallback para funções
- ✅ Dependency array sempre presente
- ✅ Cleanup functions bem definidas
- ❌ Não retornar setState direto
- ❌ Não usar state como dependency desnecessariamente

---

## 3. Conditional Rendering

```typescript
// ✅ BOM: Ternário simples
export const Component = ({ isLoading, data }) => (
  isLoading ? <Skeleton /> : <Content data={data} />
);

// ✅ BOM: Múltiplas condições
export const Component = ({ status }) => {
  if (status === 'loading') return <Skeleton />;
  if (status === 'error') return <Error />;
  if (status === 'empty') return <Empty />;
  return <Content />;
};

// ✅ BOM: && operator
export const Component = ({ isAdmin, adminPanel }) => (
  <>
    <MainContent />
    {isAdmin && <AdminPanel />}
  </>
);

// ❌ MÁ: Retornar null/undefined
export const Component = ({ data }) => {
  if (!data) return null;  // ⚠️ Evitar se possível
  return <div>{data}</div>;
};
```

---

## 4. State Management

### Zustand Pattern

```typescript
// Define types primeiro
interface Player {
  currentUrl: string;
  isPlaying: boolean;
  volume: number;
}

interface PlayerStore {
  // State
  player: Player;
  
  // Actions
  setCurrentUrl: (url: string) => void;
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
}

// Create store com tipos
export const usePlayerStore = create<PlayerStore>((set) => ({
  player: {
    currentUrl: '',
    isPlaying: false,
    volume: 80,
  },

  setCurrentUrl: (url) =>
    set((state) => ({
      player: { ...state.player, currentUrl: url },
    })),

  play: () =>
    set((state) => ({
      player: { ...state.player, isPlaying: true },
    })),

  pause: () =>
    set((state) => ({
      player: { ...state.player, isPlaying: false },
    })),

  setVolume: (volume) =>
    set((state) => ({
      player: { ...state.player, volume: Math.max(0, Math.min(100, volume)) },
    })),
}));

// Usar com selectors para performance
const currentUrl = usePlayerStore((state) => state.player.currentUrl);
const isPlaying = usePlayerStore((state) => state.player.isPlaying);
```

---

## 5. Memoization

### React.memo vs useMemo vs useCallback

```typescript
// ✅ React.memo: Para componentes que não mudam frequentemente
interface ItemProps {
  id: string;
  name: string;
}

export const Item = memo<ItemProps>(({ id, name }) => (
  <div>{name}</div>
), (prevProps, nextProps) => {
  // Se retornar true = não re-render
  return prevProps.id === nextProps.id;
});

// ✅ useMemo: Para computações pesadas
const expensiveResult = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b] // Recompute quando mudar
);

// ✅ useCallback: Para passar functions como dependency
const handleSelect = useCallback(
  (id: string) => {
    selectChannel(id);
  },
  [selectChannel]
);

// ❌ NÃO fazer sem necessidade
const Component = memo(() => {
  // Se a função não passa props, React.memo não ajuda
});
```

---

## 6. Tratamento de Erros

### Error Boundary (Class Component)

```typescript
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Algo deu errado</div>;
    }
    return this.props.children;
  }
}
```

---

## 7. Event Handlers

```typescript
// ✅ BOM: Tipado corretamente
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log('Clicked');
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === 'Enter') {
    handleSubmit();
  }
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

// ✅ BOM: Com tipos parametrizados
const handleSubmit = <T extends HTMLFormElement>(
  e: React.FormEvent<T>
) => {
  e.preventDefault();
  // ...
};
```

---

## 8. Async Components & Suspense

```typescript
// ✅ BOM: Suspense para lazy loading
const ChannelList = lazy(() => import('./ChannelList'));

export const App = () => (
  <Suspense fallback={<Loading />}>
    <ChannelList />
  </Suspense>
);

// ✅ BOM: Async server component (React 18+)
async function UserProfile({ userId }: { userId: string }) {
  const user = await fetchUser(userId);
  return <div>{user.name}</div>;
}
```

---

## 9. Key Prop em Listas

```typescript
// ❌ NUNCA usar index como key
{items.map((item, index) => (
  <Item key={index} {...item} />
))}

// ✅ Usar ID único e estável
{items.map((item) => (
  <Item key={item.id} {...item} />
))}

// ✅ Se não tem ID, usar crypto.randomUUID()
{items.map((item) => (
  <Item key={item.id || crypto.randomUUID()} {...item} />
))}
```

---

## 10. Forma Correta de Estruturar Componentes

```typescript
// src/components/ChannelCard.tsx

import { FC, memo, KeyboardEvent, useMemo } from 'react';
import { classNames } from '@utils/classNames';

// 1. Types
interface ChannelCardProps {
  id: string;
  name: string;
  logo: string;
  isFavorite?: boolean;
  onSelect: (id: string) => void;
  onToggleFavorite?: (id: string, favorite: boolean) => void;
}

// 2. Component
export const ChannelCard: FC<ChannelCardProps> = memo(
  ({
    id,
    name,
    logo,
    isFavorite = false,
    onSelect,
    onToggleFavorite,
  }) => {
    // 3. Handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onSelect(id);
      }
    };

    // 4. Computed values
    const cardClass = useMemo(
      () => classNames('channel-card', { 'is-favorite': isFavorite }),
      [isFavorite]
    );

    // 5. Render
    return (
      <div
        role="button"
        tabIndex={0}
        className={cardClass}
        onClick={() => onSelect(id)}
        onKeyDown={handleKeyDown}
      >
        <img src={logo} alt={name} loading="lazy" />
        <h3>{name}</h3>
        {onToggleFavorite && (
          <button
            onClick={() => onToggleFavorite(id, !isFavorite)}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {'❤️'}
          </button>
        )}
      </div>
    );
  }
);

// 6. Display name para debugging
ChannelCard.displayName = 'ChannelCard';

// 7. Export
export default ChannelCard;
```

---

## Checklist React/TypeScript

- [ ] ✅ Props têm interface
- [ ] ✅ Sem `any` no código
- [ ] ✅ useEffect com dependency array
- [ ] ✅ useCallback para funções passadas como props
- [ ] ✅ Cleanup functions em efeitos
- [ ] ✅ Keys em listas (não index)
- [ ] ✅ Error boundaries para main sections
- [ ] ✅ Componentes pesados memoized
- [ ] ✅ Eventos tipados (React.MouseEvent, etc)
- [ ] ✅ Display names em components
- [ ] ✅ Imports organizados (React, libs, local)
- [ ] ✅ Sem imports desnecessários
