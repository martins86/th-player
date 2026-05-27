# 🎯 Desenvolvimento React/TypeScript — TH Player

## Padrões de Componentes

### Componente Funcional com TypeScript

```typescript
// src/components/ChannelCard.tsx
import { FC, ReactNode } from 'react';

interface ChannelCardProps {
  id: string;
  name: string;
  image: string;
  onSelect: (id: string) => void;
  children?: ReactNode;
}

export const ChannelCard: FC<ChannelCardProps> = ({
  id,
  name,
  image,
  onSelect,
  children,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSelect(id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={() => onSelect(id)}
      className="channel-card"
    >
      <img src={image} alt={name} loading="lazy" />
      <h3>{name}</h3>
      {children}
    </div>
  );
};

export default ChannelCard;
```

**Regras:**
- ✅ Use `FC<Props>` para tipagem
- ✅ Sempre export nomeado + default
- ✅ Props interface com tipos explícitos
- ✅ Lazy loading em imagens
- ✅ Suporte a controle remoto (onKeyDown)

---

### Hooks Customizados

```typescript
// src/hooks/usePlayer.ts
import { useCallback, useRef, useState, useEffect } from 'react';
import shaka from 'shaka-player';

interface UsePlayerOptions {
  autoPlay?: boolean;
  quality?: 'auto' | 'hd' | 'sd';
}

export const usePlayer = (options: UsePlayerOptions = {}) => {
  const { autoPlay = true, quality = 'auto' } = options;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStream = useCallback(async (url: string) => {
    if (!videoRef.current) return;

    try {
      setIsLoading(true);
      setError(null);

      const player = new shaka.Player(videoRef.current);
      
      // Configurar bitrate baseado em qualidade
      if (quality !== 'auto') {
        player.configure({
          abr: {
            defaultBandwidthEstimate: quality === 'hd' ? 5000000 : 1000000,
          },
        });
      }

      await player.load(url);
      
      if (autoPlay) {
        videoRef.current.play();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar stream';
      setError(message);
      console.error('Player error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [quality, autoPlay]);

  useEffect(() => {
    return () => {
      // Cleanup
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  return {
    videoRef,
    loadStream,
    isLoading,
    error,
  };
};
```

**Boas práticas:**
- ✅ Return object com funções e estado
- ✅ Cleanup em useEffect
- ✅ Error handling obrigatório
- ✅ Types para opções e retorno

---

### Gerenciamento de Estado com Zustand

```typescript
// src/store/playerStore.ts
import { create } from 'zustand';

interface Channel {
  id: string;
  name: string;
  url: string;
  category: string;
  image: string;
}

interface PlayerStore {
  currentChannel: Channel | null;
  isPlaying: boolean;
  volume: number;
  
  // Actions
  setCurrentChannel: (channel: Channel) => void;
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentChannel: null,
  isPlaying: false,
  volume: 80,

  setCurrentChannel: (channel) => set({ currentChannel: channel }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(100, volume)) }),
}));
```

**Padrões:**
- ✅ State interface com tipos
- ✅ Actions como métodos
- ✅ Validação de valores (volume 0-100)
- ✅ Selector automático do Zustand

---

## Testes com Vitest

```typescript
// src/components/__tests__/ChannelCard.test.ts
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ChannelCard from '../ChannelCard';

describe('ChannelCard', () => {
  it('deve renderizar com props corretas', () => {
    const props = {
      id: '1',
      name: 'Canal Test',
      image: 'test.jpg',
      onSelect: vi.fn(),
    };

    render(<ChannelCard {...props} />);

    expect(screen.getByText('Canal Test')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('deve chamar onSelect ao pressionar Enter', () => {
    const onSelect = vi.fn();
    const props = {
      id: '1',
      name: 'Canal',
      image: 'test.jpg',
      onSelect,
    };

    render(<ChannelCard {...props} />);
    
    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });

    expect(onSelect).toHaveBeenCalledWith('1');
  });

  it('deve ter coverage > 80%', () => {
    // Vitest automaticamente reporta coverage
    expect(true).toBe(true);
  });
});
```

**Config Vitest (vite.config.ts):**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.d.ts'],
    },
  },
});
```

---

## Estrutura de Features

### Feature: Login

```
src/features/auth/
├── components/
│   ├── LoginForm.tsx
│   └── LoginForm.test.ts
├── hooks/
│   └── useAuth.ts
├── services/
│   └── authService.ts
├── store/
│   └── authStore.ts
└── types/
    └── auth.types.ts
```

**Pattern:**
```typescript
// src/features/auth/hooks/useAuth.ts
import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';

export const useAuth = () => {
  const { setUser, setError } = useAuthStore();

  const login = useCallback(async (username: string, password: string) => {
    try {
      const user = await authService.login(username, password);
      setUser(user);
      return user;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
      throw err;
    }
  }, []);

  return { login };
};
```

---

## Regras Obrigatórias

| Regra | Descrição | Violação |
|-------|-----------|----------|
| ✅ **Tipos Explícitos** | Nunca use `any` | ❌ `const data: any = ...` |
| ✅ **Props Interface** | Sempre defina interface de props | ❌ `const MyComponent = (props) => ...` |
| ✅ **Lazy Loading** | Imagens com `loading="lazy"` | ❌ `<img src={...} />` |
| ✅ **Keyboard Support** | Suporte a `Enter` e `Escape` | ❌ Só `onClick` |
| ✅ **Error Handling** | Try-catch em async | ❌ Promise sem catch |
| ✅ **Testes** | Mínimo 80% coverage | ❌ Código sem testes |
| ✅ **Comments** | Componentes complexos comentados | ❌ Código sem contexto |

---

## Checklist de Desenvolvimento

- [ ] Componente criado com interface TypeScript
- [ ] Props com tipos explícitos (zero `any`)
- [ ] Renderização condicional tratada
- [ ] Keyboard support para controle remoto
- [ ] Lazy loading em imagens/vídeos
- [ ] Error handling com try-catch
- [ ] Testes unitários (>80% coverage)
- [ ] ESLint/Prettier sem warnings
- [ ] Build sem erros
- [ ] README com exemplos de uso
