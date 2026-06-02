# 🎬 Configuração Viewport e Meta Tags TH Player

## Meta Tags Essenciais (HTML)

Adicione essas tags no `<head>` do seu `index.html`:

```html
<!-- Charset -->
<meta charset="UTF-8" />

<!-- Viewport para responsividade -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Descrição -->
<meta name="description" content="TH Player - App IPTV para LG webOS" />

<!-- Theme Color (Mobile) -->
<meta name="theme-color" content="#000000" />

<!-- Apple Mobile -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="apple-mobile-web-app-title" content="TH Player" />

<!-- Icons -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

<!-- Preconnect (Performance) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

---

## 📱 Viewport Explicado

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

| Propriedade | Valor | Explicação |
|------------|-------|-----------|
| `width=device-width` | Largura = tela do dispositivo | Garante que o layout use a largura correta |
| `initial-scale=1.0` | Zoom inicial = 100% | Começa sem zoom |
| `maximum-scale=5.0` | Zoom máximo = 500% | Usuário pode aumentar até 5x |
| `user-scalable=yes` | Permite zoom | Usuário pode fazer zoom |

---

## 🎮 Viewport Especial para webOS TV

Para LG webOS TV, adicione tambem:

```html
<!-- webOS TV -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<!-- Disable scaling for TV -->
<style>
  @media (min-width: 1920px) {
    body {
      zoom: 1;
      transform-origin: 0 0;
    }
  }
</style>
```

---

## 🔧 Configuração de Safe Area

Para suportar safe area em dispositivos com notch/camera:

```css
/* Safe area para notch/camera */
body {
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}

/* Padding adicional se necessário */
.app-header {
  padding-top: max(1rem, env(safe-area-inset-top));
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
```

---

## 🖼️ Responsividade de Imagens

### HTML

```html
<!-- Picture elemento para responsividade -->
<picture>
  <source media="(min-width: 1920px)" srcset="image-large.jpg" />
  <source media="(min-width: 1024px)" srcset="image-medium.jpg" />
  <source media="(min-width: 640px)" srcset="image-small.jpg" />
  <img src="image-mobile.jpg" alt="Descrição" />
</picture>

<!-- Ou com srcset -->
<img
  src="image-mobile.jpg"
  srcset="
    image-mobile.jpg 640w,
    image-tablet.jpg 1024w,
    image-desktop.jpg 1920w
  "
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Descrição"
/>
```

### CSS

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}

video {
  max-width: 100%;
  height: auto;
  display: block;
}

picture {
  display: block;
  max-width: 100%;
}
```

---

## 📊 Padrões de Viewport por Dispositivo

### Mobile (< 640px)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

- Largura: Device width
- Zoom: 100%
- Scroll: Vertical
- Touchscreen: Sim

### Tablet (640px - 1023px)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

- Largura: Device width
- Zoom: 100%
- Scroll: Vertical + Horizontal opcional
- Touchscreen: Sim

### Desktop (1024px - 1919px)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
```

- Largura: Device width (1024px+)
- Zoom: 100% (até 500%)
- Scroll: Vertical
- Input: Mouse + Keyboard

### TV (1920px+)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
<meta name="viewport-fit" content="cover" />
```

- Largura: 1920px+
- Zoom: 100% (sem zoom)
- Scroll: Mínimo
- Input: Controle remoto
- Safe area: Importante

---

## ✅ Checklist de Viewport

Antes de publicar, verifique:

- [ ] Meta viewport configurado
- [ ] Charset UTF-8 definido
- [ ] Theme color configurado
- [ ] Icons/favicons adicionados
- [ ] CSS responsivo funciona
- [ ] Images otimizadas (srcset)
- [ ] Safe area considerado (TV)
- [ ] Zoom funcionando (se permitido)
- [ ] Mobile-friendly (Mobile-Friendly Test)
- [ ] Testado em múltiplos dispositivos

---

## 🧪 Ferramentas de Teste

### Google Mobile-Friendly Test
```
https://search.google.com/test/mobile-friendly
```

### Chrome DevTools
```
F12 → Responsive Design Mode (Ctrl+Shift+M)
```

### LG webOS Emulator
```
webOS SDK → Emulator (1920x1080)
```

### BrowserStack
```
https://www.browserstack.com/
```

---

## 🚀 Exemplo Completo de HTML

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <!-- Meta Tags Essenciais -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="viewport-fit" content="cover" />
    <meta name="description" content="TH Player - App IPTV para LG webOS" />
    <meta name="theme-color" content="#000000" />

    <!-- Icons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <!-- Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />

    <!-- Title -->
    <title>TH Player - IPTV App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

