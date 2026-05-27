# 🎮 Integração webOS/LG TV — Navegação e Performance

## Navegação Spatial (Controle Remoto)

### Setup Spatial Navigation

```typescript
// src/navigation/spatialNav.ts
import { useSpatialNavigation } from '@noriginmedia/norigin-spatial-navigation';

export const useSpatialNav = () => {
  const { setFocus } = useSpatialNavigation();

  // Mapeamento de IDs para componentes
  const focusMap = new Map<string, HTMLElement>();

  const registerElement = (id: string, element: HTMLElement | null) => {
    if (element) {
      focusMap.set(id, element);
    }
  };

  const moveFocus = (id: string) => {
    const element = focusMap.get(id);
    if (element) {
      setFocus(id);
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return { registerElement, moveFocus };
};
```

### Hook useRemoteControl

```typescript
// src/hooks/useRemoteControl.ts
import { useEffect, useCallback } from 'react';

export enum RemoteKey {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  ENTER = 'Enter',
  BACK = 'Backspace',
  RED = '48',    // LG Red button
  GREEN = '49',  // LG Green button
  YELLOW = '50', // LG Yellow button
  BLUE = '51',   // LG Blue button
}

interface RemoteHandlers {
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  onEnter?: () => void;
  onBack?: () => void;
  onRed?: () => void;
  onGreen?: () => void;
  onYellow?: () => void;
  onBlue?: () => void;
}

export const useRemoteControl = (handlers: RemoteHandlers) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key;
    const keyCode = event.code;

    // Prevent default browser behavior
    if ([
      RemoteKey.UP,
      RemoteKey.DOWN,
      RemoteKey.LEFT,
      RemoteKey.RIGHT,
    ].includes(key)) {
      event.preventDefault();
    }

    switch (key) {
      case RemoteKey.UP:
        handlers.onUp?.();
        break;
      case RemoteKey.DOWN:
        handlers.onDown?.();
        break;
      case RemoteKey.LEFT:
        handlers.onLeft?.();
        break;
      case RemoteKey.RIGHT:
        handlers.onRight?.();
        break;
      case RemoteKey.ENTER:
        handlers.onEnter?.();
        break;
      case RemoteKey.BACK:
        handlers.onBack?.();
        event.preventDefault();
        break;
      // LG buttons
      case RemoteKey.RED:
        handlers.onRed?.();
        break;
      case RemoteKey.GREEN:
        handlers.onGreen?.();
        break;
      case RemoteKey.YELLOW:
        handlers.onYellow?.();
        break;
      case RemoteKey.BLUE:
        handlers.onBlue?.();
        break;
    }
  }, [handlers]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
```

### Exemplo de Uso

```typescript
// src/components/ChannelList.tsx
import { useRemoteControl, RemoteKey } from '../hooks/useRemoteControl';
import { useSpatialNav } from '../navigation/spatialNav';

export const ChannelList = () => {
  const { registerElement, moveFocus } = useSpatialNav();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useRemoteControl({
    onUp: () => {
      setSelectedIndex(prev => Math.max(0, prev - 1));
      moveFocus(`channel-${selectedIndex - 1}`);
    },
    onDown: () => {
      setSelectedIndex(prev => Math.min(channels.length - 1, prev + 1));
      moveFocus(`channel-${selectedIndex + 1}`);
    },
    onEnter: () => {
      playChannel(channels[selectedIndex].id);
    },
    onBack: () => {
      navigate('/home');
    },
  });

  return (
    <div className="channel-list">
      {channels.map((channel, idx) => (
        <div
          key={channel.id}
          ref={(el) => registerElement(`channel-${idx}`, el)}
          className={selectedIndex === idx ? 'focused' : ''}
          tabIndex={0}
        >
          {channel.name}
        </div>
      ))}
    </div>
  );
};
```

---

## Performance para TVs LG

### Otimizações Críticas

```typescript
// ✅ BOA: Evita re-renders desnecessários
const ChannelItem = memo(({ channel, onSelect }: Props) => (
  <div onClick={() => onSelect(channel.id)}>
    {channel.name}
  </div>
));

// ✅ BOA: Virtualização de listas grandes
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={1080}
  itemCount={channels.length}
  itemSize={100}
  width="100%"
>
  {({ index, style }) => (
    <ChannelItem
      style={style}
      channel={channels[index]}
      onSelect={handleSelect}
    />
  )}
</FixedSizeList>

// ❌ MÁ: Animações pesadas
const BadAnimation = () => (
  <div style={{
    animation: 'complexShadow 0.3s infinite',
  }} />
);

// ✅ BOA: CSS simples e eficiente
const GoodAnimation = () => (
  <div className="simple-fade" />
);
```

### CSS para TV (global.css)

```css
/* Performance-first CSS */

/* Evite sombras complexas */
.card {
  border: 2px solid rgba(255, 255, 255, 0.2);
  /* ❌ box-shadow: 0 10px 40px rgba(0,0,0,0.3); */
}

/* Transições simples */
.channel {
  transition: transform 0.2s ease-out;
}

.channel:focus {
  transform: scale(1.05);
  border-color: #fff;
}

/* Lazy loading de imagens */
img {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## Emulador webOS

### Instalar e Configurar

```bash
# Instalar webOS CLI
npm install -g @webos-tools/cli

# Verificar instalação
ares -V

# Configurar emulador (criar dispositivo virtual)
ares-setup-device
# Selecionar: Add new device
# Emulator Type: VirtualBox
# Version: Latest
```

### Testar Localmente

```bash
# Build da aplicação
npm run build

# Package para webOS
ares-package dist

# Instalar no emulador
ares-install com.thplayer.app_1.0.0_all.ipk -d emulator

# Executar app
ares-launch com.thplayer.app -d emulator

# Ver logs em tempo real
ares-log -d emulator com.thplayer.app
```

### Debug no Emulador

```bash
# Abrir Developer Tools (Chromium)
ares-inspect -d emulator com.thplayer.app

# Ver informações do dispositivo
ares-device-info
```

---

## appinfo.json (Obrigatório)

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
  "largeIcon": "icon-large.png",
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

## Checklist webOS/TV

- [ ] Navegação funcional com remoto (UP/DOWN/LEFT/RIGHT/ENTER/BACK)
- [ ] Sem animações pesadas (CSS transitions apenas)
- [ ] Imagens com lazy loading
- [ ] Listas virtualizadas (se > 50 itens)
- [ ] appinfo.json correto
- [ ] Testado no emulador
- [ ] Logs de debug funcionando (ares-log)
- [ ] Performance aceitável (sem lag em navegação)
- [ ] Memory usage < 256MB
- [ ] Build gera .ipk sem erros
