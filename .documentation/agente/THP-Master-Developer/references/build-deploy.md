# 🚀 Build & Deploy — CI/CD, LG Store e Publicação

## 1. Build Pipeline Local

```bash
# 1. Lint & Type Check
npm run lint
npm run lint:fix
tsc --noEmit

# 2. Testes
npm test
npm run test:coverage

# 3. Build
npm run build

# 4. Preview
npm run preview

# 5. Package para webOS
npm run webos:package

# 6. Instalar no emulador
npm run webos:install -d emulator

# 7. Executar
npm run webos:launch -d emulator

# 8. Logs
npm run webos:log
```

---

## 2. Scripts Auxiliares (package.json)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    
    "lint": "eslint src --ext ts,tsx",
    "lint:fix": "eslint src --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,css}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,json,css}\"",
    
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch",
    
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch",
    
    "webos:device-setup": "ares-setup-device",
    "webos:package": "npm run build && ares-package dist",
    "webos:package:release": "npm run build && ares-package dist -o release.ipk",
    "webos:install": "ares-install com.thplayer.app_1.0.0_all.ipk",
    "webos:launch": "ares-launch com.thplayer.app",
    "webos:log": "ares-log -f com.thplayer.app",
    "webos:all": "npm run test && npm run webos:package && npm run webos:install && npm run webos:launch",
    
    "ci:lint": "npm run lint && npm run format:check",
    "ci:test": "npm run test -- --run",
    "ci:build": "npm run type-check && npm run build",
    "ci": "npm run ci:lint && npm run ci:test && npm run ci:build"
  }
}
```

---

## 3. GitHub Actions CI/CD

**.github/workflows/ci.yml:**

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Check Prettier
        run: npm run format:check
      
      - name: Type check
        run: npm run type-check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm run test -- --run
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  webos-package:
    runs-on: ubuntu-latest
    needs: build
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Download build artifact
        uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/
      
      - name: Install webOS CLI
        run: npm install -g @webos-tools/cli
      
      - name: Package for webOS
        run: ares-package dist -o th-player.ipk
      
      - name: Upload IPK artifact
        uses: actions/upload-artifact@v4
        with:
          name: th-player-ipk
          path: th-player.ipk

  release:
    runs-on: ubuntu-latest
    needs: webos-package
    if: startsWith(github.ref, 'refs/tags/')
    steps:
      - uses: actions/checkout@v3
      
      - name: Download IPK
        uses: actions/download-artifact@v4
        with:
          name: th-player-ipk
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: th-player.ipk
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 4. Publicação na LG Store

### Preparação

```bash
# 1. Criar conta desenvolvedor
# https://webostv.developer.lge.com/

# 2. Setup credenciais
# ~/.ares/config.json
cat > ~/.ares/config.json << EOF
{
  "account": {
    "username": "seu-email@example.com",
    "password": "sua-senha"
  }
}
EOF

# 3. Build final
npm run build

# 4. Package com metadados
ares-package dist -o th-player-1.0.0.ipk
```

### Arquivo de Submissão

**SUBMISSION.md:**

```markdown
# Submissão TH Player para LG Store

## Informações do App
- **Nome:** TH Player
- **Versão:** 1.0.0
- **Descrição:** App IPTV para LG webOS TV
- **Categoria:** Entertainment
- **Preço:** Gratuito

## Assets Inclusos
- ✅ icon.png (80x80)
- ✅ icon-large.png (400x400)
- ✅ splash.png (1920x1080)
- ✅ screenshots (Home, Player, Settings)

## Documentação
- ✅ README completo
- ✅ Política de Privacidade (https://...)
- ✅ Termos de Uso (https://...)
- ✅ Guia de Uso (https://...)

## Conformidade
- ✅ appinfo.json válido
- ✅ Sem conteúdo ilegal
- ✅ Performance testada em TV real
- ✅ Navegação remota funcionando
- ✅ <256MB memória
- ✅ Build sem erros

## Contato de Suporte
- Email: support@thplayer.com
- Website: https://thplayer.com

---
**Data de Submissão:** 2024-05-20  
**Desenvolvedor:** TH Player Team
```

---

## 5. Staging vs Production

```typescript
// src/config.ts
export const config = {
  api: {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
    timeout: 10000,
  },
  epg: {
    url: process.env.REACT_APP_EPG_URL || 'http://localhost:8000/epg.xml',
    cacheTime: 24 * 60 * 60 * 1000, // 24h
  },
  features: {
    enableDebug: process.env.NODE_ENV === 'development',
    enableLogging: true,
    enableAnalytics: process.env.NODE_ENV === 'production',
  },
};
```

**.env.staging:**
```
VITE_API_URL=https://staging-api.thplayer.com
VITE_EPG_URL=https://staging-epg.thplayer.com/epg.xml
NODE_ENV=staging
```

**.env.production:**
```
VITE_API_URL=https://api.thplayer.com
VITE_EPG_URL=https://epg.thplayer.com/epg.xml
NODE_ENV=production
```

---

## 6. Versionamento Semântico

```bash
# MAJOR.MINOR.PATCH

# Patch (bugfixes, pequenas mudanças)
git tag -a v1.0.1 -m "Release v1.0.1 - Bugfixes"

# Minor (novas features)
git tag -a v1.1.0 -m "Release v1.1.0 - Novo EPG"

# Major (breaking changes)
git tag -a v2.0.0 -m "Release v2.0.0 - Redesign"

# Push tags
git push origin --tags
```

---

## 7. Checklist Pré-Deploy

**Code Quality:**
- [ ] `npm run lint` passa sem erros
- [ ] `npm run type-check` sem erros TypeScript
- [ ] `npm test -- --run` passa com coverage > 80%
- [ ] `npm run format:check` ok

**Build:**
- [ ] `npm run build` gera sem warnings
- [ ] Bundle size < 200KB gzipped
- [ ] Source maps desativados (prod)
- [ ] Assets otimizadas

**webOS:**
- [ ] `ares-package dist` gera .ipk
- [ ] `ares-install` instala sem erros
- [ ] Testado no emulador webOS
- [ ] Testado em TV LG real (se possível)

**Documentação:**
- [ ] README atualizado
- [ ] CHANGELOG.md atualizado
- [ ] appinfo.json versão correta
- [ ] Assets (ícones, screenshots) inclusos

**Submissão:**
- [ ] Política de Privacidade online
- [ ] Termos de Uso online
- [ ] Screenshots de qualidade
- [ ] Descrição clara em português e inglês

---

## 8. Monitoramento em Produção

```typescript
// src/services/analytics.ts
export class Analytics {
  static trackEvent(event: string, data?: any) {
    if (!config.features.enableAnalytics) return;

    // Enviar para analytics service (Segment, Mixpanel, etc)
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        data,
        timestamp: new Date().toISOString(),
        deviceId: getDeviceId(),
      }),
    }).catch(() => {
      // Silencioso
    });
  }

  static trackError(error: Error) {
    if (!config.features.enableLogging) return;

    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {
      // Silencioso
    });
  }
}
```

---

## 9. Rollback Plan

```bash
# Se houver problema em produção:

# 1. Reverter para versão anterior
git revert HEAD
git tag -a v1.0.1-rollback -m "Rollback to v1.0.0"

# 2. Re-empacotar
npm run webos:package:release

# 3. Reuploada no LG Store

# Post-mortem
# - Documentar o que deu errado
# - Adicionar testes para evitar repetição
# - Update CI/CD pipeline
```

---

## Links Úteis

- [webOS Developer Portal](https://webostv.developer.lge.com/)
- [LG Seller Lounge](https://seller.lgappstv.com/)
- [webOS CLI Docs](https://webostv.developer.lge.com/develop/tools/cli-installation)
- [App Submission Guide](https://webostv.developer.lge.com/distribute/seller-lounge/app-submission-guide)
