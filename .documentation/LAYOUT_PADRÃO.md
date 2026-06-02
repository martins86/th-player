# 🎨 Layout Padronizado TH Player

## 📋 Resumo das Mudanças

### ✅ Padrão de Cores Implementado

O layout foi totalmente padronizado com a paleta **Preta | Vermelha | Branca**, conforme especificado:

- **Fundo:** Preto (#000000) — Sem gradientes ou variações desnecessárias
- **Acentos:** Vermelho (#ff0000) — Bordas, focos, destaques
- **Texto:** Branco (#ffffff) — Máximo contraste e legibilidade

### 📁 Arquivos Criados/Atualizados

1. **`src/index.css`** — Variáveis CSS de cores e design
2. **`src/App.css`** — Componentes com novo padrão
3. **`src/styles/globals.css`** — Estilos globais atualizados
4. **`src/constants/colors.ts`** — Constantes de cores para React
5. **`src/theme.ts`** — Sistema de tema completo
6. **`DESIGN_SYSTEM.md`** — Documentação do sistema de design
7. **`LAYOUT_PADRÃO.md`** — Este arquivo

---

## 🎯 Componentes Principais

### AppLayout (Header + Navegação)

```tsx
/* src/components/Layout/AppLayout.tsx */
- Header com borda vermelha inferior
- Navegação com botões preto/vermelho
- Focus states com sombra vermelha
```

**Visual:**
```
┌─────────────────────────────────────┐
│ TH Player                      Home  │ ← Borda vermelha
│ webOS TV                      Login  │
│ Device: TV                Settings   │
└─────────────────────────────────────┘
```

### Páginas (Home, Login, Settings, Player)

```tsx
/* src/pages/*.tsx */
- Fundo preto
- Cards com bordas discretas
- Botões com hover/focus em vermelho
- Texto branco de alta legibilidade
```

### Navegação Remota

```tsx
/* Todos os botões interativos */
[data-remote-focusable] {
  - Focus: borda vermelha 2px
  - Sombra: rgba(255, 0, 0, 0.3)
  - Transição suave 0.3s
}
```

---

## 🔧 Como Usar o Sistema de Cores

### Opção 1: CSS Variables (Recomendado)

```css
.my-button {
  background: var(--bg);
  color: var(--text);
  border: var(--border-width) solid var(--accent);
  border-radius: var(--border-radius);
}

.my-button:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.3);
}
```

### Opção 2: Constantes TypeScript

```tsx
import { colors } from '@/constants/colors';

<button
  style={{
    background: colors.black,
    color: colors.white,
    borderColor: colors.red,
  }}
>
  Clique aqui
</button>
```

### Opção 3: Tema Completo

```tsx
import { theme } from '@/theme';

<button
  style={{
    background: theme.colors.black,
    color: theme.colors.white,
    borderColor: theme.colors.red,
    borderRadius: theme.borderRadius.md,
  }}
>
  Clique aqui
</button>
```

---

## 📐 Estrutura Visual

### Paleta de Cores

```
Primárias:
████ Preta (#000000)
████ Vermelha (#ff0000)
████ Branca (#ffffff)

Suporte:
████ Black 900 (#1a1a1a) — Superfícies
████ Black 800 (#2d2d2d) — Superfícies alt.
████ Red 600 (#dc2626) — Hover
████ Red 700 (#b91c1c) — Active
████ Gray 400 (#999999) — Texto mutado
```

### Exemplo de Layout

```
┌───────────────────────────────────────────────────────┐
│ TH Player                                             │ Bg: #000
│ ═══════════════════════════════════════════════════  │ Border: #f00
│ Home  │ Filmes  │ Séries  │ Esportes  │ Favoritos    │ Nav: #000
└───────────────────────────────────────────────────────┘
│                                                       │
│ ┌─────────────────────────────────────────────────┐ │
│ │ [TV AO VIVO] ← Focus (border: #f00)            │ │
│ │ FILMES                                          │ │
│ │ SÉRIES                                          │ │
│ │ ESPORTES                                        │ │
│ │ FAVORITOS                                       │ │
│ └─────────────────────────────────────────────────┘ │
│                                                       │
│ Continuando Assistindo                              │
│                                                       │
│ ┌──────────┬──────────┬──────────┬──────────┐       │
│ │ Ação ...│ O Poder ..│ Vingad..│ Riverdale│       │
│ │ 60%     │ 45%       │ 80%      │ 80%      │       │
│ └──────────┴──────────┴──────────┴──────────┘       │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## ✅ Checklist de Conformidade

Ao criar novos componentes, valide:

- [ ] Fundo é preto ou preto-900/800
- [ ] Bordas/focos são vermelhas
- [ ] Texto principal é branco
- [ ] Sem cores aleatórias (azul, verde, roxo, etc.)
- [ ] Transições são suaves (0.3s)
- [ ] Focus states com sombra vermelha
- [ ] Navegação remota funcional
- [ ] Padding/margin consistentes
- [ ] Border-radius padrão (8px)

---

## 📝 Exemplos de Componentes

### Button Padrão

```tsx
export const Button = () => (
  <button
    className="page-action"
    data-remote-focusable
    tabIndex={0}
  >
    Clique aqui
  </button>
);

/* CSS */
.page-action {
  background: var(--surface);
  border: var(--border-width) solid transparent;
  border-radius: var(--border-radius);
  color: var(--text);
  padding: 0.75rem 1rem;
  transition: all var(--transition-normal);
}

.page-action:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.3);
}
```

### Card

```tsx
export const Card = ({ title, children }) => (
  <div className="card">
    <h3>{title}</h3>
    {children}
  </div>
);

/* CSS */
.card {
  background: var(--surface);
  border: 1px solid var(--surface-secondary);
  border-radius: var(--border-radius);
  padding: 1rem;
}
```

### Input

```tsx
export const Input = (props) => (
  <input
    {...props}
    className="form-input"
    data-remote-focusable
  />
);

/* CSS */
.form-input {
  background: var(--surface);
  border: var(--border-width) solid var(--surface-secondary);
  border-radius: var(--border-radius);
  color: var(--text);
  padding: 0.75rem;
}

.form-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.3);
}
```

---

## 🚀 Próximos Passos

1. ✅ Padrão de cores implementado
2. ✅ Variáveis CSS criadas
3. ✅ Documentação do Design System
4. **→ Criar biblioteca de componentes** (Button, Card, Input, etc.)
5. **→ Atualizar todas as páginas** com novo padrão
6. **→ Testar navegação remota** em todos os elementos
7. **→ Validar em emulador webOS**
8. **→ Publicar estilos globais** em componentes reutilizáveis

---

## 📞 Suporte

Para dúvidas sobre o padrão:
- Consulte `DESIGN_SYSTEM.md`
- Veja exemplos em `src/App.css`
- Use as variáveis em `src/index.css`

