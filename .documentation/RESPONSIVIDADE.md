# 📱 Sistema de Responsividade TH Player

## 🎯 Objetivo

Garantir que o TH Player funcione perfeitamente em **todas as resoluções de tela**:
- 📱 Mobile (< 640px)
- 📱 Tablet (640px - 1023px)
- 💻 Desktop (1024px - 1919px)
- 📺 TV/Wide (1920px+)

---

## 📊 Breakpoints Padrão

| Dispositivo | Resolução | CSS | Uso |
|------------|-----------|-----|-----|
| **Mobile** | < 640px | `@media (max-width: 639px)` | Smartphones, pequenos tablets |
| **Tablet** | 640px - 1023px | `@media (min-width: 640px)` | Tablets em modo retrato |
| **Desktop** | 1024px - 1919px | `@media (min-width: 1024px)` | Monitors, laptops |
| **TV/Wide** | 1920px+ | `@media (min-width: 1920px)` | LG webOS TV, monitores 4K |

---

## 📐 Variáveis Responsivas

### Espaçamento

```css
/* Padrão (Mobile) */
--spacing-xs: 0.25rem
--spacing-sm: 0.5rem
--spacing-md: 1rem
--spacing-lg: 1.5rem
--spacing-xl: 2rem
--spacing-xxl: 3rem
```

### Tipografia

```css
/* Padrão (Mobile) */
--font-size-xs: 0.75rem
--font-size-sm: 0.875rem
--font-size-base: 1rem ← Ajustável por breakpoint
--font-size-lg: 1.125rem
--font-size-xl: 1.5rem
--font-size-2xl: 1.875rem
--font-size-3xl: 2.25rem
--font-size-4xl: 3rem

/* Headings */
--heading-h1: var(--font-size-2xl) ← Ajustável por breakpoint
--heading-h2: var(--font-size-xl)
--heading-h3: var(--font-size-lg)
```

---

## 🎨 Componentes Responsivos

### 1. Header (App-Header)

```
Mobile (< 640px):
┌─────────────────────┐
│ TH Player      [x]  │ ← Stack vertical
│ webOS TV            │
│ Device ID: ...      │
├─────────────────────┤
│ Home │ Login │ Conf │ ← Flex wrap
└─────────────────────┘

Tablet (640px+):
┌──────────────────────────────────┐
│ TH Player    [Home] [Login] [Conf]│ ← Side by side
└──────────────────────────────────┘

Desktop (1024px+):
┌──────────────────────────────────────┐
│ TH Player              [Home] [Login] │ ← Space between
└──────────────────────────────────────┘

TV (1920px+):
┌────────────────────────────────────────────┐
│ TH PLAYER                [HOME] [LOGIN] │ ← Bigger, spaced
└────────────────────────────────────────────┘
```

### 2. Grid de Conteúdo

```
Mobile: 1 coluna
┌──────┐
│ Item │
├──────┤
│ Item │
└──────┘

Tablet: 2 colunas
┌──────┬──────┐
│ Item │ Item │
├──────┼──────┤
│ Item │ Item │
└──────┴──────┘

Desktop: 3 colunas
┌──────┬──────┬──────┐
│ Item │ Item │ Item │
└──────┴──────┴──────┘

TV: 4+ colunas
┌──────┬──────┬──────┬──────┐
│ Item │ Item │ Item │ Item │
└──────┴──────┴──────┴──────┘
```

### 3. Botões

```
Mobile:
[      Botão 1      ]
[      Botão 2      ] ← Largura 100%

Tablet:
[   Botão 1   ] [   Botão 2   ] ← Width automático

Desktop/TV:
[Botão 1] [Botão 2] [Botão 3] ← Compactos
```

---

## 💻 Como Usar

### 1. Usar Variáveis CSS

```css
/* Automático em todos os breakpoints */
.meu-elemento {
  padding: var(--spacing-md); /* Muda por breakpoint */
  font-size: var(--font-size-base); /* Responsivo */
  gap: var(--gap-normal);
}
```

### 2. Media Queries Manuais

```css
/* Mobile First */
.card {
  width: 100%;
  padding: var(--spacing-md);
}

/* Tablet+ */
@media (min-width: 640px) {
  .card {
    width: 50%;
  }
}

/* Desktop+ */
@media (min-width: 1024px) {
  .card {
    width: 33.333%;
  }
}

/* TV+ */
@media (min-width: 1920px) {
  .card {
    width: 25%;
  }
}
```

### 3. Clases Utilitárias

```html
<!-- Hide/Show por breakpoint -->
<div class="hide-mobile">Mostrado em 640px+</div>
<div class="show-mobile-only">Apenas em mobile</div>
<div class="show-desktop-only">Apenas em desktop+</div>

<!-- Grid responsivo -->
<div class="grid grid-2 grid-3 grid-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>

<!-- Flex responsivo -->
<div class="flex-mobile">Coluna em mobile</div>
<div class="flex-tablet">Linha em tablet+</div>
```

---

## 🔍 Exemplos Práticos

### Exemplo 1: Card Responsivo

```css
.card {
  padding: var(--spacing-md);
  margin: var(--spacing-sm) 0;
}

@media (min-width: 640px) {
  .card {
    padding: var(--spacing-lg);
    margin: var(--spacing-md) 0;
  }
}

@media (min-width: 1024px) {
  .card {
    padding: var(--spacing-xl);
    border-radius: 12px;
  }
}

@media (min-width: 1920px) {
  .card {
    padding: var(--spacing-xxl);
    font-size: var(--font-size-lg);
  }
}
```

### Exemplo 2: Grid Responsivo

```css
.products-grid {
  display: grid;
  gap: var(--gap-normal);
  grid-template-columns: 1fr; /* Mobile: 1 coluna */
}

@media (min-width: 640px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 colunas */
    gap: var(--gap-loose);
  }
}

@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr); /* Desktop: 3 colunas */
  }
}

@media (min-width: 1920px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr); /* TV: 4 colunas */
    gap: var(--gap-spacious);
  }
}
```

### Exemplo 3: Navegação Responsiva

```css
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-tight);
}

.nav-item {
  flex: 1 1 auto; /* Mobile: cresce para preencher */
  min-width: 100px;
}

@media (min-width: 640px) {
  .nav-item {
    flex: 0 1 auto; /* Tablet+: tamanho automático */
    min-width: 120px;
  }
}

@media (min-width: 1024px) {
  .nav-item {
    min-width: 140px;
    padding: var(--spacing-md) var(--spacing-lg);
  }
}
```

---

## ✅ Checklist de Responsividade

Ao criar novo componente, verifique:

- [ ] Funciona em mobile (< 640px)
- [ ] Funciona em tablet (640px - 1023px)
- [ ] Funciona em desktop (1024px - 1919px)
- [ ] Funciona em TV (1920px+)
- [ ] Usa variáveis CSS responsivas
- [ ] Images/vídeos são responsive
- [ ] Texto é legível em todos os tamanhos
- [ ] Botões são clicáveis em mobile (44px min)
- [ ] Sem overflow horizontal
- [ ] Sem conteúdo cortado
- [ ] Espaçamento apropriado por breakpoint
- [ ] Testar em emulador webOS (1920px+)

---

## 🧪 Como Testar

### 1. Firefox DevTools

```
F12 → Responsive Design Mode (Ctrl+Shift+M)
- Testar vários tamanhos: 375px, 768px, 1024px, 1920px
```

### 2. Chrome DevTools

```
F12 → Device Toolbar (Ctrl+Shift+M)
- Selecionar diferentes dispositivos
- Custom size: 1920x1080 para TV
```

### 3. Emulador webOS

```
webOS SDK → Emulator
- Resolução: 1920x1080
- Testar navegação com controle remoto
```

### 4. Resize Manual

```css
/* Adicionar ao index.html para teste */
<script>
  window.addEventListener('resize', () => {
    console.log(`Tamanho: ${window.innerWidth}x${window.innerHeight}`);
  });
</script>
```

---

## 🚀 Performance em Diferentes Telas

### Mobile
- Usar lazy loading para imagens
- Minimizar CSS/JS não-crítico
- Otimizar para conexões lentas

### Tablet
- Balanço entre mobile e desktop
- Touch-friendly (44px mínimo)

### Desktop
- Layout mais espaçado
- Mais elementos visíveis
- Otimizar para mouse/teclado

### TV/Wide
- Máximo espaçamento
- Muitos elementos por vez
- Otimizar para controle remoto
- Considerar safe-area para TVs antigas

---

## 📝 Boas Práticas

1. **Mobile First**: Comece com mobile, adicione complexidade
2. **Variáveis CSS**: Use sempre variáveis responsivas
3. **Max-width**: Limite o máximo de largura do conteúdo
4. **Overflow**: Sempre teste scroll em telas pequenas
5. **Imagens**: Use `max-width: 100%` e `height: auto`
6. **Tipografia**: Aumente tamanho em telas maiores
7. **Espaçamento**: Aumente padding/margin em desktop/TV
8. **Grids**: Use `auto-fit` ou `auto-fill` com cuidado

---

## 🔗 Recursos

- [MDN Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)
- [CSS Grid Responsivo](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Flexbox Responsivo](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
- [webOS TV Viewport](https://webostv.developer.lge.com/)

