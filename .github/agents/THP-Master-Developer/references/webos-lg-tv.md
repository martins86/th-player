# 🖥️ Padrões webOS/LG TV — Integração e Requisitos

## 1. appinfo.json Completo ⚠️ CRÍTICO

**Localização:** Raiz do projeto

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
  "splashIcon": "splash.png",
  
  "requiredMemory": 512,
  "uiRevision": 2,
  "systemRequirements": "webOS 3.0+",
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
      "subtitle": "IPTV App for LG webOS"
    },
    "pt-BR": {
      "title": "TH Player",
      "subtitle": "App IPTV para LG webOS"
    }
  },

  "categories": ["entertainment"]
}
```

**Validações obrigatórias:**
- [ ] ID único no formato com.companhia.app
- [ ] Version semântica (1.0.0)
- [ ] Icon 80x80 existe
- [ ] largeIcon 400x400 existe
- [ ] Permissões necessárias listadas
- [ ] Locales configurados

---

## 2. Environment Variables para webOS

```javascript
// src/utils/webosDetect.ts
export const isWebOS = () => {
  if (typeof window === 'undefined') return false;
  return (window as any).webOS !== undefined;
};

export const getWebOSVersion = (): string | null => {
  if (typeof window === 'undefined') return null;
  return (window as any).webOS?.version || null;
};

export const getDeviceId = async (): Promise<string | null> => {
  if (!isWebOS()) return null;

  try {
    const webos = (window as any).webOS;
    return new Promise((resolve, reject) => {
      webos.service.request('luna://com.webos.service.tv-service', {
        method: 'getDeviceInfo',
        parameters: {},
        onSuccess: (resp: any) => {
          resolve(resp.serialNumber || null);
        },
        onFailure: () => {
          reject(new Error('Falha ao obter device ID'));
        },
      });
    });
  } catch (err) {
    console.error('Erro ao obter device ID:', err);
    return null;
  }
};
```

---

## 3. Lifecycle da Aplicação

```typescript
// src/hooks/useWebOSLifecycle.ts
export const useWebOSLifecycle = () => {
  useEffect(() => {
    if (!isWebOS()) return;

    const webos = (window as any).webOS;

    // App entra em background
    const onVisibilityChange = () => {
      if (document.hidden) {
        console.log('App em background');
        // Pausar player, economizar memória
      } else {
        console.log('App em foreground');
        // Resumir player
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    // Close event
    const onClose = () => {
      console.log('App será fechado');
      // Cleanup
    };

    if (webos?.onClose) {
      webos.onClose.subscribe(onClose);
    }

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);
};
```

---

## 4. Performance Crítica para TV

### Memory Optimization

```typescript
// ✅ BOA: Lazy loading de imagens
<img
  src={logo}
  alt={name}
  loading=\"lazy\"
  style={{ maxWidth: '100%', height: 'auto' }}
/>

// ❌ MÁ: Carregar tudo de uma vez
<img src={logo} alt={name} />

// ✅ BOA: Cleanup de listeners
useEffect(() => {
  const handler = () => { /* ... */ };
  window.addEventListener('resize', handler);
  
  return () => {
    window.removeEventListener('resize', handler);
  };
}, []);

// ❌ MÁ: Sem cleanup (memory leak)
useEffect(() => {
  window.addEventListener('resize', handler);
}, []);
```

### CSS Performance

```css
/* ✅ BOA: Transições simples */
.button:focus {
  transform: scale(1.05);
  transition: transform 0.2s ease-out;
}

/* ❌ MÁ: Sombras complexas */
.button {
  box-shadow: 0 10px 40px rgba(0,0,0,0.3),
              0 5px 15px rgba(0,0,0,0.2),
              inset 0 1px 0 rgba(255,255,255,0.5);
}

/* ✅ BOA: Animações simples */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ❌ MÁ: Animações complexas */
@keyframes wobble {
  0%, 100% { transform: translateX(0) rotate(0); }
  25% { transform: translateX(5px) rotate(2deg); }
  50% { transform: translateX(-5px) rotate(-2deg); }
  75% { transform: translateX(5px) rotate(2deg); }
}
```

---

## 5. Logger para webOS

```typescript
// src/utils/logger.ts
export class WebOSLogger {
  static log(message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;

    if (typeof console !== 'undefined') {
      console.log(logMessage, data || '');
    }

    // Enviar para backend se conectado
    if (navigator.onLine) {
      this.sendToServer('log', { message: logMessage, data });
    }
  }

  static error(message: string, error?: Error) {
    const timestamp = new Date().toISOString();
    const errorMessage = `[${timestamp}] ERROR: ${message}`;

    console.error(errorMessage, error);

    // Rastrear erros críticos
    if (navigator.onLine) {
      this.sendToServer('error', {
        message: errorMessage,
        stack: error?.stack,
      });
    }
  }

  private static sendToServer(type: string, payload: any) {
    try {
      fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, payload, deviceId: getDeviceId() }),
      }).catch(() => {
        // Silencioso se falhar
      });
    } catch {
      // Silencioso
    }
  }
}
```

---

## 6. Storage para webOS

```typescript
// src/services/webosStorage.ts
export class WebOSStorage {
  // Usar localStorage com limite
  static setItem(key: string, value: any, maxSize: number = 1024 * 1024) {
    try {
      const serialized = JSON.stringify(value);

      if (serialized.length > maxSize) {
        console.warn(`Dado muito grande para armazenar: ${key}`);
        return false;
      }

      localStorage.setItem(key, serialized);
      return true;
    } catch (err) {
      if (err instanceof DOMException && err.code === 22) {
        // QuotaExceededError
        this.clearOldestItems();
        return this.setItem(key, value, maxSize);
      }
      return false;
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  private static clearOldestItems() {
    // Implementar LRU cache cleanup
    const keys = Object.keys(localStorage);
    if (keys.length > 0) {
      localStorage.removeItem(keys[0]);
    }
  }
}
```

---

## 7. Input Handling para LG Remote

```typescript
// Mapeamento completo de botões LG
export const LG_REMOTE_KEYS = {
  'ArrowUp': 'UP',
  'ArrowDown': 'DOWN',
  'ArrowLeft': 'LEFT',
  'ArrowRight': 'RIGHT',
  'Enter': 'OK',
  '48': 'RED',      // Numpad 0
  '49': 'GREEN',    // Numpad 1
  '50': 'YELLOW',   // Numpad 2
  '51': 'BLUE',     // Numpad 3
  'Backspace': 'BACK',
  'Escape': 'EXIT',
  'MediaPlayPause': 'PLAY_PAUSE',
  'MediaPlay': 'PLAY',
  'MediaPause': 'PAUSE',
  'MediaStop': 'STOP',
  '48': 'REWIND',
  '49': 'FORWARD',
};

export const setupRemoteKeyMapping = () => {
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    const key = LG_REMOTE_KEYS[e.key as keyof typeof LG_REMOTE_KEYS];

    if (key) {
      console.log(`Remote key pressed: ${key}`);
      // Dispatch custom event
      window.dispatchEvent(
        new CustomEvent('remoteKeyDown', { detail: { key } })
      );

      // Prevent defaults para setas
      if (['UP', 'DOWN', 'LEFT', 'RIGHT'].includes(key)) {
        e.preventDefault();
      }
    }
  });
};
```

---

## 8. Checklist Completo webOS/TV

**appinfo.json:**
- [ ] ID, version, vendor corretos
- [ ] Icons nos tamanhos certos (80x80, 400x400)
- [ ] Permissões necessárias listadas
- [ ] Locales configurados
- [ ] systemRequirements = "webOS 3.0+"

**Performance:**
- [ ] Bundle < 200KB gzipped
- [ ] Memory usage < 256MB
- [ ] Imagens com lazy loading
- [ ] Sem animações pesadas
- [ ] Listas virtualizadas (>50 itens)

**Navegação:**
- [ ] Todas as teclas do remoto mapeadas
- [ ] BACK button sempre funciona
- [ ] Focus management correto
- [ ] Sem hover-only interfaces

**Testing:**
- [ ] Testado no emulador webOS
- [ ] Testado em TV LG real (se possível)
- [ ] Logs funcionando (ares-log)
- [ ] Sem crashes ou travamentos

**Build & Deployment:**
- [ ] `ares-package dist` gera .ipk
- [ ] `ares-install` instala sem erros
- [ ] `ares-launch` executa o app
- [ ] Publicação no LG Store validada
