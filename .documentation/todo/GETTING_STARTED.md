# 🚀 Começando — Guia Rápido

## 📌 Sumário Executivo

O **TH Player** será um app IPTV para LG webOS com as seguintes features:

1. **Autenticação** — Login do usuário
2. **Listagem de Canais** — Carrega playlist M3U/IPTV
3. **Categorias** — Organiza canais por categoria
4. **Player** — Reproduz streams HLS/DASH (Shaka Player)
5. **Favoritos** — Marca canais favoritos
6. **Histórico** — Guarda canais assistidos
7. **Controle Remoto** — Navegação fluida com remoto LG
8. **Configurações** — Qualidade, cache, logout

---

## 🎯 Primeira Feature: Integração webOS

### O que vamos fazer:
Criar sistema de detecção webOS e preparar hooks/utilities para usar APIs específicas do webOS TV.

### Por que começar com isso?
- Necessário para todas as outras features
- Permite testes no emulador webOS
- Prepara base para controle remoto

### Tempo estimado: 2-3 horas

---

## 📋 Passo a Passo

### 1. Criar Branch
```bash
git checkout -b feature/THP-0001-webos-integration
```

### 2. Criar Arquivos de Tipos
```bash
# src/types/webos.types.ts
```

**Conteúdo:**
```typescript
// Tipos do webOS
export interface WebOSInfo {
  isWebOS: boolean
  version: string | null
  deviceId: string | null
  platformVersion: string | null
}

export interface WebOSService {
  request: (
    service: string,
    options: { method: string; parameters?: Record<string, any> }
  ) => Promise<any>
}

export interface WebOSWindow extends Window {
  webOS?: {
    platform: {
      back: () => void
    }
    service?: WebOSService
    version?: string
  }
}
```

### 3. Criar Utilitário de Detecção
```bash
# src/utils/webosDetect.ts
```

**Conteúdo:**
```typescript
import type { WebOSInfo } from '@/types/webos.types'

export const isWebOS = (): boolean => {
  if (typeof window === 'undefined') return false
  return (window as any).webOS !== undefined
}

export const getWebOSInfo = async (): Promise<WebOSInfo> => {
  return {
    isWebOS: isWebOS(),
    version: getWebOSVersion(),
    deviceId: await getDeviceId(),
    platformVersion: getPlatformVersion(),
  }
}

export const getWebOSVersion = (): string | null => {
  if (typeof window === 'undefined') return null
  return (window as any).webOS?.version || null
}

export const getPlatformVersion = (): string | null => {
  if (typeof window === 'undefined') return null
  const nav = navigator.userAgent
  const match = nav.match(/webOS\/(\d+\.\d+)/)
  return match ? match[1] : null
}

export const getDeviceId = async (): Promise<string | null> => {
  if (!isWebOS()) return null
  try {
    const webos = (window as any).webOS
    return new Promise((resolve) => {
      webos.service?.request('luna://com.webos.service.tv-service', {
        method: 'getSystemInfo',
        parameters: {},
        onSuccess: (resp: any) => {
          resolve(resp.serialNumber || null)
        },
        onFailure: () => {
          resolve(null)
        },
      })
    })
  } catch {
    return null
  }
}
```

### 4. Criar Hook useWebOS
```bash
# src/hooks/useWebOS.ts
```

**Conteúdo:**
```typescript
import { useEffect, useState } from 'react'
import { getWebOSInfo } from '@/utils/webosDetect'
import type { WebOSInfo } from '@/types/webos.types'

export const useWebOS = () => {
  const [info, setInfo] = useState<WebOSInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getWebOSInfo()
        setInfo(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [])

  return { info, loading, error }
}
```

### 5. Criar Serviço webOS
```bash
# src/services/webos.ts
```

**Conteúdo:**
```typescript
import type { WebOSService } from '@/types/webos.types'

class WebOSManager {
  private webos?: WebOSService

  constructor() {
    this.init()
  }

  private init() {
    if (typeof window !== 'undefined') {
      this.webos = (window as any).webOS?.service
    }
  }

  isAvailable(): boolean {
    return this.webos !== undefined
  }

  request(
    service: string,
    options: { method: string; parameters?: Record<string, any> }
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.webos) {
        reject(new Error('webOS not available'))
        return
      }

      this.webos.request(service, {
        ...options,
        onSuccess: resolve,
        onFailure: reject,
      })
    })
  }
}

export const webosManager = new WebOSManager()
```

### 6. Testes
```bash
# src/hooks/__tests__/useWebOS.test.ts
```

**Conteúdo básico:**
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { isWebOS } from '@/utils/webosDetect'

describe('webOS Detection', () => {
  beforeEach(() => {
    // Mock window
    vi.clearAllMocks()
  })

  it('should detect webOS when available', () => {
    // Implementar test
    expect(true).toBe(true)
  })

  it('should return null when webOS is not available', () => {
    expect(isWebOS()).toBe(false)
  })
})
```

### 7. Commit
```bash
git add .
git commit -m "[THP-0001] FEAT - Integração webOS com detecção automática"
git push origin feature/THP-0001-webos-integration
```

### 8. Pull Request
Abrir PR com:
- **Título:** `[THP-0001] Integração webOS`
- **Descrição:** Resumo das mudanças
- **Checklist:**
  - [ ] Testes passam
  - [ ] Lint passa
  - [ ] Type-check passa
  - [ ] Documentação atualizada

---

## ✅ Validação Antes de Committar

```bash
# 1. Type-check
npm run type-check

# 2. Lint
npm run lint

# 3. Testes
npm run test:run

# 4. Build
npm run build
```

---

## 📚 Próximas Features (em ordem)

1. ✅ Integração webOS (Começando agora)
2. 🔜 Navegação com Controle Remoto
3. 🔜 Sistema de Rotas
4. 🔜 Autenticação (Login)
5. 🔜 Listagem de Canais
6. 🔜 Player IPTV
7. 🔜 Favoritos
8. 🔜 Configurações

---

## 💡 Dicas

- Sempre comitar com padrão `[THP-XXXX]`
- Testar no emulador webOS regularmente
- Manter código TypeScript limpo (sem `any`)
- Revisar documentação quando tiver dúvida
- Fazer PRs pequenas e focadas

---

## 🆘 Precisa de Ajuda?

Consulte:
- [Documentação webOS](../.documentation/agente/THP-Master-Developer/references/webos-lg-tv.md)
- [Padrões React/TypeScript](../.documentation/agente/THP-Master-Developer/references/padroes-react-ts.md)
- [Code Review](../.documentation/agente/THP-Master-Developer/docs/code-review.md)

