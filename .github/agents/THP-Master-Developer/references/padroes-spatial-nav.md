# 🎮 Padrões Spatial Navigation — Navegação Remota LG TV

## 1. Setup Inicial

```typescript
// src/navigation/spatialNav.ts
import {
  init as spatialInit,
  setDefaultElement,
  navigate,
  pause as pauseSpatial,
  resume as resumeSpatial,
  set as setSpatialConfig,
} from '@noriginmedia/norigin-spatial-navigation';

export const initializeSpatialNavigation = () => {
  // Configuração inicial
  spatialInit({
    // Distância mínima entre elementos
    straightOverlapThreshold: 0.5,
    // Suavidade da navegação
    rememberSource: true,
    // Scroll automático
    autoRestore: true,
  });

  // Define elemento padrão (home)
  setDefaultElement('home-container');
};

export const focusElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    navigate('default', { target: element });
  }
};

export const pauseNavigation = () => pauseSpatial();
export const resumeNavigation = () => resumeSpatial();
```

---

## 2. Componente com Spatial Navigation

```typescript
// src/components/Navigation/ChannelGrid.tsx
import { FC, useRef, useEffect } from 'react';
import { focusElement } from '@navigation/spatialNav';

interface ChannelGridProps {
  channels: Channel[];
  onSelect: (channelId: string) => void;
}

export const ChannelGrid: FC<ChannelGridProps> = ({ channels, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Registrar com spatial nav
    if (containerRef.current) {
      containerRef.current.id = 'channel-grid';
    }
  }, []);

  return (
    <div
      ref={containerRef}
      role="grid"
      className="channel-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
      }}
    >
      {channels.map((channel, idx) => (
        <ChannelCard
          key={channel.id}
          id={`channel-${idx}`}
          channel={channel}
          onSelect={() => {
            onSelect(channel.id);
          }}
          // Spatial nav attributes
          data-nav-id={`channel-${idx}`}
        />
      ))}
    </div>
  );
};
```

---

## 3. Padrão de Grid com Focus

```typescript
// Componente reutilizável de grid com focus tracking
interface SpatialGridProps<T> {
  items: T[];
  columns: number;
  keyExtractor: (item: T) => string;
  renderItem: (item: T, index: number, isFocused: boolean) => ReactNode;
  onItemSelect: (item: T, index: number) => void;
}

export const SpatialGrid = <T,>({
  items,
  columns,
  keyExtractor,
  renderItem,
  onItemSelect,
}: SpatialGridProps<T>) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Navegação com remoto
  useRemoteControl({
    onUp: () => {
      const newIndex = Math.max(0, focusedIndex - columns);
      setFocusedIndex(newIndex);
      itemRefs.current[newIndex]?.focus();
    },
    onDown: () => {
      const newIndex = Math.min(items.length - 1, focusedIndex + columns);
      setFocusedIndex(newIndex);
      itemRefs.current[newIndex]?.focus();
    },
    onLeft: () => {
      const newIndex = Math.max(0, focusedIndex - 1);
      setFocusedIndex(newIndex);
      itemRefs.current[newIndex]?.focus();
    },
    onRight: () => {
      const newIndex = Math.min(items.length - 1, focusedIndex + 1);
      setFocusedIndex(newIndex);
      itemRefs.current[newIndex]?.focus();
    },
    onEnter: () => {
      onItemSelect(items[focusedIndex], focusedIndex);
    },
  });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {items.map((item, index) => (
        <div
          key={keyExtractor(item)}
          ref={(el) => (itemRefs.current[index] = el)}
          tabIndex={focusedIndex === index ? 0 : -1}
          onFocus={() => setFocusedIndex(index)}
          style={{
            outline: focusedIndex === index ? '3px solid white' : 'none',
          }}
        >
          {renderItem(item, index, focusedIndex === index)}
        </div>
      ))}
    </div>
  );
};
```

---

## 4. Navegação Linear (Listas)

```typescript
// Padrão para listas verticais
interface SpatialListProps<T> {
  items: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T, isFocused: boolean) => ReactNode;
  onItemSelect: (item: T) => void;
}

export const SpatialList = <T,>({
  items,
  keyExtractor,
  renderItem,
  onItemSelect,
}: SpatialListProps<T>) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useRemoteControl({
    onUp: () => {
      const newIndex = Math.max(0, focusedIndex - 1);
      setFocusedIndex(newIndex);
      itemRefs.current[newIndex]?.focus();
    },
    onDown: () => {
      const newIndex = Math.min(items.length - 1, focusedIndex + 1);
      setFocusedIndex(newIndex);
      itemRefs.current[newIndex]?.focus();
    },
    onEnter: () => {
      onItemSelect(items[focusedIndex]);
    },
  });

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map((item, index) => (
        <li
          key={keyExtractor(item)}
          ref={(el) => (itemRefs.current[index] = el)}
          tabIndex={focusedIndex === index ? 0 : -1}
          onFocus={() => setFocusedIndex(index)}
          style={{
            background: focusedIndex === index ? '#333' : 'transparent',
            padding: '10px',
            marginBottom: '5px',
            transition: 'background 0.2s',
          }}
        >
          {renderItem(item, focusedIndex === index)}
        </li>
      ))}
    </ul>
  );
};
```

---

## 5. Navegação em Abas/Tabs

```typescript
// Padrão para navegação horizontal entre abas
interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface SpatialTabsProps {
  tabs: Tab[];
  onTabChange: (tabId: string) => void;
}

export const SpatialTabs: FC<SpatialTabsProps> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useRemoteControl({
    onLeft: () => {
      const newIndex = Math.max(0, activeTab - 1);
      setActiveTab(newIndex);
      tabRefs.current[newIndex]?.focus();
    },
    onRight: () => {
      const newIndex = Math.min(tabs.length - 1, activeTab + 1);
      setActiveTab(newIndex);
      tabRefs.current[newIndex]?.focus();
    },
    onEnter: () => {
      onTabChange(tabs[activeTab].id);
    },
  });

  return (
    <div>
      <div className="tabs-header" style={{ display: 'flex', gap: '10px' }}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[index] = el)}
            onClick={() => {
              setActiveTab(index);
              onTabChange(tab.id);
            }}
            style={{
              background: activeTab === index ? '#fff' : '#333',
              color: activeTab === index ? '#000' : '#fff',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};
```

---

## 6. Focus Restoration

```typescript
// Restaurar focus ao voltar
export const useFocusRestoration = (elementId: string) => {
  useEffect(() => {
    const element = document.getElementById(elementId);
    if (element) {
      // Usar setTimeout para garantir render antes
      setTimeout(() => {
        element.focus();
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 0);
    }
  }, [elementId]);
};

// Uso
const ChannelPage = () => {
  useFocusRestoration('channel-list');
  return <div id="channel-list">{/* ... */}</div>;
};
```

---

## 7. Animated Focus Ring

```css
/* styles/focus.css */
.spatial-focus {
  outline: 3px solid #fff;
  outline-offset: 2px;
  transition: outline 0.2s ease-out;
}

.spatial-focus:focus {
  outline: 3px solid #0084ff;
  box-shadow: 0 0 10px rgba(0, 132, 255, 0.5);
}

/* Animação suave de focus */
@keyframes focusRing {
  0%, 100% {
    outline-width: 3px;
    box-shadow: 0 0 10px rgba(0, 132, 255, 0.5);
  }
  50% {
    outline-width: 4px;
    box-shadow: 0 0 20px rgba(0, 132, 255, 0.8);
  }
}

.spatial-focus:focus {
  animation: focusRing 0.3s ease-out;
}
```

---

## 8. Checklist Spatial Navigation

- [ ] Init realizado no App root
- [ ] Elementos têm IDs únicos
- [ ] useRemoteControl usado corretamente
- [ ] Focus restoration ao voltar
- [ ] Animações de focus suaves
- [ ] Sem loops de focus infinitos
- [ ] Navegação testada com remoto físico ou emulador
- [ ] Performance aceitável (sem lag)
- [ ] Accessibility attributes (role, tabIndex)
- [ ] BACK button sempre funciona
