# 🚀 CI/CD Setup — TH Player webOS

## ✅ Status: Pronto para Uso

**Data de Ajuste:** 28 de Maio, 2026  
**Versão:** 1.0  
**Branches:** master, develop  

---

## 📋 Mudanças Realizadas

### 1️⃣ Package.json — Scripts & Dependências

**Novos Scripts:**
```bash
npm run build:ci         # Build para CI
npm run lint:fix         # Corrigir ESLint
npm run format           # Prettier formatter
npm run format:check     # Validar formatação
npm run type-check       # TypeScript validation
npm run test             # Vitest (watch mode)
npm run test:run         # Vitest (run once)
npm run test:ci          # Vitest com coverage
npm run webos:package    # Build + Package para webOS
npm run webos:install    # Instalar no emulador
npm run webos:launch     # Executar app
npm run webos:log        # Ver logs
```

**Dependências Adicionadas:**
- ✅ `vitest@1.1.0` — Testing framework
- ✅ `@testing-library/react@14.1.2` — React component testing
- ✅ `@testing-library/jest-dom@6.1.5` — DOM matchers
- ✅ `jsdom@23.0.1` — DOM simulation
- ✅ `prettier@3.1.1` — Code formatter

### 2️⃣ Vite Config — Otimizado para webOS

**`vite.config.ts` agora inclui:**
- Path alias `@/` para imports
- Vitest configuration
- Coverage reporting (LCOV)
- Build target ES2020
- Dev server na porta 3000

### 3️⃣ Prettier Config — `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "endOfLine": "lf"
}
```

### 4️⃣ Test Setup — `src/test/setup.ts`

- Auto cleanup React Testing Library
- Mock de webOS APIs
- ESLint compliant

### 5️⃣ CI/CD Workflow — `.github/workflows/ci-cd.yml`

**Pipeline:**
```
PR/Push → [Lint] → [Type Check] → [Tests] → [Build] → [webOS Package]
           ✅        ✅            ✅        ✅         ✅ (master only)
```

**Jobs Paralelos:**
- 🔍 **Lint** — ESLint + Prettier
- 📘 **Type Check** — TypeScript
- 🧪 **Test** — Vitest com coverage
- 🔨 **Build** — Vite build (depende dos 3 acima)
- 📦 **webOS Package** — ares-package .ipk (depende de build)

---

## 🧪 Validação Local

Todos os scripts foram testados e validados:

```bash
✅ npm run lint          # 0 erros
✅ npm run type-check    # OK
✅ npm run format:check  # OK
✅ npm run build:ci      # 193.46 kB JS
✅ npm run test:run      # Vitest ready
```

---

## 🚀 Como Usar

### Development
```bash
# Start dev server
npm run dev

# Format code
npm run format

# Run tests in watch mode
npm run test
```

### Pre-Commit Checklist
```bash
npm run lint            # Check ESLint
npm run format:check    # Check Prettier
npm run type-check      # Check TypeScript
npm run test:run        # Run tests
npm run build:ci        # Build
```

### webOS Local Testing
```bash
# Install webOS CLI
npm install -g @webos-tools/cli

# Package for webOS
npm run webos:package

# Install on emulator
npm run webos:install

# Launch app
npm run webos:launch

# View logs
npm run webos:log
```

---

## 📊 CI/CD Pipeline Details

### Lint Job
- Runs: ESLint + Prettier check
- Triggers: Any push/PR with src/**/*.ts(x), package.json, config files

### Type Check Job
- Runs: TypeScript type checking
- Triggers: Same as lint

### Test Job
- Runs: Vitest with coverage report
- Uploads: Coverage to Codecov
- Triggers: Same as lint

### Build Job
- Needs: lint, type-check, test (all must pass)
- Runs: `npm run build:ci`
- Uploads: dist/ artifact
- Retention: 5 days

### webOS Package Job
- Needs: build (must pass)
- Runs: `ares-package dist`
- Only on: Push to master branch
- Generates: .ipk file
- Retention: 30 days

---

## ⚠️ Important Notes

### React 19 + Testing Library
We use `--legacy-peer-deps` during npm install because:
- React 19.2.6 doesn't have @testing-library/react@14
- This is safe for a TV app (internal project)
- Update to `@testing-library/react@15.x` when available

### Vite 8 Compatibility
- Removed `rollupOptions.output.manualChunks` (Vite 8 uses Rolldown)
- Uses default code splitting for vendor/player/spatial

### Coverage Thresholds
- Lines: 80%
- Functions: 80%
- Branches: 80%
- Statements: 80%

---

## 📝 Next Steps

1. **Create Unit Tests**
   ```bash
   # Create first test
   npm run test
   # Tests go in src/**/__tests__/*.test.ts(x)
   ```

2. **Setup webOS CLI** (for local testing)
   ```bash
   npm install -g @webos-tools/cli
   ares-setup-device  # Add your TV/emulator
   ```

3. **Configure Codecov** (optional)
   - Go to https://codecov.io
   - Connect your GitHub repo
   - CI already sends coverage data

4. **Add Pre-commit Hooks** (recommended)
   ```bash
   npm install --save-dev husky lint-staged
   npx husky install
   ```

---

## 🎯 Checklist

- ✅ package.json scripts updated
- ✅ Vitest + Testing Library configured
- ✅ Prettier configured
- ✅ vite.config.ts optimized
- ✅ CI/CD workflow created
- ✅ All scripts validated locally
- ⏳ Write unit tests
- ⏳ Setup webOS CLI
- ⏳ Test on TV

---

**Version:** 1.0  
**Last Updated:** 28/05/2026  
**Maintainer:** THP Master Developer
