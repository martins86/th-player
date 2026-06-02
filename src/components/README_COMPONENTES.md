# 🎨 Componentes Padrão TH Player

## Cores Padrão

- **Fundo:** Preto (#000000)
- **Destaque/Border:** Vermelho (#ff0000)
- **Texto:** Branco (#ffffff)

---

## Componentes Base

### 1. Button (Botão)

```tsx
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
}) => (
  <button
    className={`button button--${variant}`}
    onClick={onClick}
    disabled={disabled}
    data-remote-focusable
    tabIndex={0}
  >
    {children}
  </button>
);
```

**CSS:**
```css
.button {
  background: var(--surface);
  border: var(--border-width) solid transparent;
  border-radius: var(--border-radius);
  color: var(--text);
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.button:hover,
.button:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.3);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button--primary {
  background: var(--accent);
  color: var(--black);
}

.button--primary:focus {
  background: var(--accent-hover);
}
```

---

### 2. Card (Cartão)

```tsx
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  onClick,
}) => (
  <div
    className="card"
    onClick={onClick}
    data-remote-focusable={onClick ? true : undefined}
    tabIndex={onClick ? 0 : -1}
  >
    {title && <h3 className="card__title">{title}</h3>}
    <div className="card__content">{children}</div>
  </div>
);
```

**CSS:**
```css
.card {
  background: var(--surface);
  border: 1px solid var(--surface-secondary);
  border-radius: var(--border-radius);
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.3);
}

.card__title {
  margin: 0 0 0.5rem 0;
  color: var(--text);
  font-size: 1rem;
}

.card__content {
  color: var(--text-muted);
}
```

---

### 3. Input (Campo de Entrada)

```tsx
import './Input.css';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'password' | 'email';
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
}) => (
  <input
    className="input"
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    disabled={disabled}
    data-remote-focusable
  />
);
```

**CSS:**
```css
.input {
  background: var(--surface);
  border: var(--border-width) solid var(--surface-secondary);
  border-radius: var(--border-radius);
  color: var(--text);
  padding: 0.75rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.3);
}

.input::placeholder {
  color: var(--text-muted);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

### 4. Grid (Grade de Items)

```tsx
import './Grid.css';

interface GridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columns?: 2 | 3 | 4 | 5;
  gap?: 'sm' | 'md' | 'lg';
}

export const Grid = <T,>({
  items,
  renderItem,
  columns = 3,
  gap = 'md',
}: GridProps<T>) => (
  <div className={`grid grid--${columns} grid--gap-${gap}`}>
    {items.map((item, idx) => (
      <div key={idx} className="grid__item">
        {renderItem(item, idx)}
      </div>
    ))}
  </div>
);
```

**CSS:**
```css
.grid {
  display: grid;
  gap: 1rem;
}

.grid--2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid--3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid--4 {
  grid-template-columns: repeat(4, 1fr);
}

.grid--5 {
  grid-template-columns: repeat(5, 1fr);
}

.grid--gap-sm {
  gap: 0.5rem;
}

.grid--gap-md {
  gap: 1rem;
}

.grid--gap-lg {
  gap: 1.5rem;
}
```

---

### 5. Modal (Caixa de Diálogo)

```tsx
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: {
    label: string;
    onClick: () => void;
    primary?: boolean;
  }[];
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <div className="modal__body">{children}</div>
        {actions && (
          <div className="modal__actions">
            {actions.map((action) => (
              <button
                key={action.label}
                className={`modal__button ${
                  action.primary ? 'modal__button--primary' : ''
                }`}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
```

**CSS:**
```css
.modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal__content {
  background: var(--surface);
  border: var(--border-width) solid var(--accent);
  border-radius: var(--border-radius);
  padding: 2rem;
  max-width: 500px;
  width: 90%;
}

.modal__title {
  margin: 0 0 1rem 0;
  color: var(--text);
  font-size: 1.5rem;
}

.modal__body {
  color: var(--text);
  margin-bottom: 1.5rem;
}

.modal__actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.modal__button {
  background: var(--surface-secondary);
  border: var(--border-width) solid transparent;
  border-radius: 4px;
  color: var(--text);
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal__button:focus {
  border-color: var(--accent);
}

.modal__button--primary {
  background: var(--accent);
  color: var(--black);
}
```

---

## Padrão de Navegação Remota

Todos os componentes interativos devem ter:

```tsx
data-remote-focusable  // Marca como navegável
tabIndex={0}           // Permite navegação por teclado
```

### Focus Style Global

```css
[data-remote-focusable]:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.3);
}
```

---

## Exemplo de Página

```tsx
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Grid } from '@/components/Grid';

export const Home = () => {
  const channels = [
    { id: 1, name: 'TV AO VIVO' },
    { id: 2, name: 'FILMES' },
    { id: 3, name: 'SÉRIES' },
  ];

  return (
    <section className="page">
      <h1>Bem-vindo ao TH Player</h1>
      
      <Grid items={channels} renderItem={(ch) => (
        <Card title={ch.name}>
          <p>Clique para acessar</p>
        </Card>
      )} />
      
      <Button onClick={() => alert('Clicou!')}>
        Começar
      </Button>
    </section>
  );
};
```

---

## Checklist para Novos Componentes

- [ ] Usa variáveis CSS (--bg, --text, --accent, etc.)
- [ ] Fundo é preto ou variação escura
- [ ] Texto principal é branco
- [ ] Bordas/focos são vermelhas
- [ ] Tem `data-remote-focusable` se interativo
- [ ] Transições suaves (0.3s)
- [ ] Sem cores aleatórias
- [ ] Responsivo para TV
- [ ] Testado em emulador webOS

