# 🎨 Sistema de Design TH Player

## Paleta de Cores

O TH Player utiliza uma paleta padronizada com **3 cores principais**:

### Cores Primárias

| Cor | Hex | Uso |
|-----|-----|-----|
| **Preta** | `#000000` | Fundo principal, superfícies |
| **Vermelha** | `#ff0000` | Bordas, focos, acentos |
| **Branca** | `#ffffff` | Texto principal, contraste |

### Variações

| Nome | Hex | Descrição |
|------|-----|-----------|
| Black 900 | `#1a1a1a` | Superfícies secundárias |
| Black 800 | `#2d2d2d` | Superfícies terciárias |
| Red 600 | `#dc2626` | Hover, estados interativos |
| Red 700 | `#b91c1c` | Estados ativos |
| White 90 | `#e6e6e6` | Texto mutado |
| Gray 400 | `#999999` | Placeholders, legends |

---

## Uso em CSS

### Variáveis CSS (Recomendado)

```css
/* Em qualquer arquivo .css */
.button {
  background: var(--color-black);
  color: var(--text);
  border: var(--border-width) solid var(--accent);
  border-radius: var(--border-radius);
}

.button:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.3);
}
```

### Definição de Variáveis (src/index.css)

```css
:root {
  --color-black: #000000;
  --color-red: #ff0000;
  --color-white: #ffffff;
  
  --bg: var(--color-black);
  --text: var(--color-white);
  --accent: var(--color-red);
  --border-color: var(--color-red);
}
```

---

## Uso em React/TypeScript

### Opção 1: Variáveis CSS (Simples)

```tsx
export default function Button() {
  return (
    <button
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        border: '2px solid var(--accent)',
      }}
    >
      Clique aqui
    </button>
  );
}
```

### Opção 2: Constantes (Type-safe)

```tsx
import { colors } from '@/constants/colors';

export default function Button() {
  return (
    <button
      style={{
        backgroundColor: colors.black,
        color: colors.white,
        borderColor: colors.red,
      }}
    >
      Clique aqui
    </button>
  );
}
```

### Opção 3: Tema (Full-featured)

```tsx
import { theme } from '@/theme';

export default function Button() {
  return (
    <button
      style={{
        backgroundColor: theme.colors.black,
        color: theme.colors.white,
        borderColor: theme.colors.red,
        borderRadius: theme.borderRadius.md,
        transition: theme.transitions.normal,
      }}
    >
      Clique aqui
    </button>
  );
}
```

---

## Padrões de Navegação

### Focus States (Navegação Remota)

```css
[data-remote-focusable]:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.3);
}
```

### Componente com Focus

```tsx
<button
  data-remote-focusable
  tabIndex={0}
  className="nav-button"
>
  Navegar
</button>
```

---

## Layout Recomendado

### Header
- Fundo: Preto
- Borda inferior: Vermelha (2px)
- Texto: Branco
- Ícones: Vermelhos ou Brancos

### Menu de Navegação
- Fundo: Preto
- Bordas: Preto com destaque Vermelho ao focar
- Texto: Branco

### Conteúdo Principal
- Fundo: Preto
- Cards: Preto com borda sutil
- Destaques: Vermelhos para elementos interativos

### Player
- Fundo: Preto
- Controles: Vermelhos ao focar/hover
- Texto: Branco

---

## Exemplos de Componentes

### Botão Básico

```tsx
.page-action {
  background: var(--surface);
  border: 2px solid transparent;
  border-radius: 8px;
  color: var(--text);
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-action:hover,
.page-action:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.3);
}
```

### Card

```tsx
.card {
  background: var(--surface);
  border: 1px solid var(--surface-secondary);
  border-radius: 8px;
  padding: 1rem;
}

.card:hover {
  border-color: var(--accent);
}
```

### Input

```tsx
input {
  background: var(--surface);
  border: 2px solid var(--surface-secondary);
  border-radius: 8px;
  color: var(--text);
  padding: 0.75rem;
}

input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.3);
}
```

---

## Verificação de Conformidade

Antes de fazer commit, verifique:

- ✅ Fundo é sempre preto ou variação escura
- ✅ Borders e acentos são vermelhos (#ff0000)
- ✅ Texto principal é branco
- ✅ Hover/Focus tem transição suave
- ✅ Navegação remota funciona com `data-remote-focusable`
- ✅ Sem cores aleatórias (violeta, azul, verde, etc.)

