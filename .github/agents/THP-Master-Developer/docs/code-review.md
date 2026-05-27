# 🔍 Code Review — Padrões e Validações TH Player

## Checklist Padrão de Code Review

### 1. TypeScript & Tipos ✅

```typescript
// ❌ MÁ: any explícito
const handleData = (data: any) => {
  return data.value;
};

// ✅ BOM: Tipo explícito
interface DataItem {
  value: string;
  id: number;
}

const handleData = (data: DataItem): string => {
  return data.value;
};
```

**Validações:**
- [ ] Nenhum `any` no código
- [ ] Props interface definida
- [ ] Return types explícitos em funções
- [ ] Generics usados corretamente
- [ ] `noImplicitAny: true` no tsconfig
- [ ] Sem erros `tsc --noEmit`

---

### 2. Componentes React ✅

```typescript
// ❌ MÁ: Sem interface de props
const Button = (props) => (
  <button onClick={props.onClick}>{props.label}</button>
);

// ✅ BOM: Interface clara e props destrutured
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ label, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}>
    {label}
  </button>
);
```

**Validações:**
- [ ] Componente tem interface de Props
- [ ] Props destrutured com tipos
- [ ] Default exports e named exports corretos
- [ ] Componentes com lógica complexa foram memoized
- [ ] Sem re-renders desnecessários
- [ ] Children prop tipado se usado

---

### 3. Hooks ✅

```typescript
// ❌ MÁ: Dependencies missing
useEffect(() => {
  fetchData(id);
}, []); // ⚠️ id não está em dependencies!

// ✅ BOM: Todas as dependencies incluídas
useEffect(() => {
  fetchData(id);
}, [id]);
```

**Validações:**
- [ ] ESLint plugin `react-hooks` ativado
- [ ] Dependency array sempre presente em useEffect/useCallback/useMemo
- [ ] Nenhum warning do linter de hooks
- [ ] useCallback/useMemo usados quando apropriado
- [ ] Cleanup functions em efeitos de longa duração

---

### 4. Performance ✅

```typescript
// ❌ MÁ: Re-render a cada mudança de estado
const ChannelList = ({ channels }) => {
  return (
    <div>
      {channels.map(ch => (
        <ChannelItem key={ch.id} channel={ch} />
      ))}
    </div>
  );
};

// ✅ BOM: Virtualização para listas grandes
import { FixedSizeList } from 'react-window';

const ChannelList = ({ channels }) => {
  return (
    <FixedSizeList
      height={1080}
      itemCount={channels.length}
      itemSize={100}
    >
      {({ index, style }) => (
        <ChannelItem
          style={style}
          channel={channels[index]}
        />
      )}
    </FixedSizeList>
  );
};
```

**Validações:**
- [ ] Listas > 50 itens usam virtualização
- [ ] Componentes pesados estão memoized
- [ ] CSS animations evitam sombras complexas
- [ ] Imagens têm lazy loading
- [ ] Bundle size monitorado (< 200KB gzipped)
- [ ] Sem memory leaks em cleanup

---

### 5. Erro & Exception Handling ✅

```typescript
// ❌ MÁ: Sem tratamento
const loadStream = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

// ✅ BOM: Tratamento completo
const loadStream = async (url: string): Promise<StreamData> => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido';
    console.error('Stream load error:', message);
    throw new Error(`Falha ao carregar stream: ${message}`);
  }
};
```

**Validações:**
- [ ] Try-catch em async/await
- [ ] Error messages descritivas
- [ ] Logging de erros
- [ ] User-facing messages amigáveis
- [ ] Sem swallowing de erros (`catch {}`)

---

### 6. Navegação Remota (webOS) ✅

```typescript
// ❌ MÁ: Sem suporte a controle remoto
const Component = () => {
  return (
    <div onClick={() => play()}>
      Play
    </div>
  );
};

// ✅ BOM: Suporte completo a teclado + remoto
const Component = () => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      play();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => play()}
      onKeyDown={handleKeyDown}
    >
      Play
    </div>
  );
};
```

**Validações:**
- [ ] Componentes interativos suportam ENTER/ESPAÇO
- [ ] useRemoteControl usado quando necessário
- [ ] Navegação testada com controle remoto
- [ ] BACK button funciona em todas as páginas
- [ ] Focus management implementado
- [ ] Sem hover-only interfaces

---

### 7. Testes ✅

```typescript
// ❌ MÁ: Sem testes
export const ChannelCard = ({ channel }) => (
  <div onClick={() => alert(channel.name)}>
    {channel.name}
  </div>
);

// ✅ BOM: Testes completos
describe('ChannelCard', () => {
  it('deve renderizar nome do canal', () => {
    const channel = { id: '1', name: 'CNN' };
    render(<ChannelCard channel={channel} />);
    expect(screen.getByText('CNN')).toBeInTheDocument();
  });

  it('deve chamar onClick ao clicar', () => {
    const onClick = vi.fn();
    const channel = { id: '1', name: 'CNN' };
    render(<ChannelCard channel={channel} onClick={onClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

**Validações:**
- [ ] Cobertura mínima 80%
- [ ] Testes de happy path
- [ ] Testes de edge cases
- [ ] Testes de erros
- [ ] Snapshots usados com moderação
- [ ] `npm test:coverage` passa

---

### 8. Lint & Format ✅

**Validações:**
- [ ] `npm run lint` passa sem erros
- [ ] `npm run format` foi executado
- [ ] Sem warnings de ESLint
- [ ] Prettier formatado
- [ ] Max line length respeitado (80 chars)
- [ ] Imports ordenados alfabeticamente

---

### 9. Documentação ✅

```typescript
// ❌ MÁ: Sem documentação
const parseM3U = (content: string) => {
  return content.split('\n').map(line => {
    // ...parsing logic...
  });
};

// ✅ BOM: Documentado com JSDoc
/**
 * Parsa arquivo M3U/M3U8 e retorna lista de canais
 * @param content - Conteúdo do arquivo M3U
 * @returns Array de canais IPTV
 * @example
 * const channels = parseM3U(m3uContent);
 */
const parseM3U = (content: string): Channel[] => {
  return content.split('\n').map(line => {
    // ...parsing logic...
  });
};
```

**Validações:**
- [ ] Funções complexas têm JSDoc
- [ ] README atualizado se necessário
- [ ] Commits bem descritivos [THP-XXXX]
- [ ] PR description clara e detalhada
- [ ] Links para issues/tasks

---

### 10. Build & Deploy ✅

**Validações:**
- [ ] `npm run build` gera sem erros
- [ ] `npm run webos:package` cria .ipk
- [ ] Não há console.log/debugger em prod
- [ ] Sourcemaps desativados no build
- [ ] Assets otimizados (imagens comprimidas)
- [ ] Nenhum arquivo sensível commitado

---

## Armadilhas Comuns

### 1. Missing Keys em Listas

```typescript
// ❌ MÁ
{items.map((item, index) => (
  <Item key={index} {...item} />
))}

// ✅ BOM
{items.map((item) => (
  <Item key={item.id} {...item} />
))}
```

### 2. Mutation de Estado

```typescript
// ❌ MÁ
const addChannel = (channel) => {
  store.channels.push(channel); // Mutação!
};

// ✅ BOM
const addChannel = (channel) => {
  setChannels([...channels, channel]); // Novo array
};
```

### 3. Memory Leaks em useEffect

```typescript
// ❌ MÁ
useEffect(() => {
  window.addEventListener('keydown', handler);
  // Sem cleanup!
}, []);

// ✅ BOM
useEffect(() => {
  window.addEventListener('keydown', handler);
  return () => {
    window.removeEventListener('keydown', handler);
  };
}, [handler]);
```

### 4. Async no useEffect

```typescript
// ❌ MÁ
useEffect(async () => {
  const data = await fetch(url);
}, []);

// ✅ BOM
useEffect(() => {
  const loadData = async () => {
    const data = await fetch(url);
  };
  loadData();
}, []);
```

---

## Template de Comentário de PR

```markdown
## 📝 Descrição
[Descrever mudanças]

## 🔗 Tarefas
- [THP-XXXX] Tarefa principal
- Subtarefas...

## ✅ Checklist de Revisão
- [ ] TypeScript sem erros
- [ ] Coverage > 80%
- [ ] Lint/Format passando
- [ ] Documentado
- [ ] Navegação remota testada
- [ ] Build gera sem erros
- [ ] Sem breaking changes

## 🧪 Como Testar
```bash
npm install
npm run dev
npm test
npm run webos:all
```

## 📸 Screenshots (se UI changes)
[Adicionar capturas de tela]

---

## Definition of Done para Code Review

✅ Código passa em todos os critérios acima  
✅ PR foi revisada por pelo menos 1 pessoa  
✅ Todas as comments foram resolvidas  
✅ Build CI/CD passou  
✅ Testes passam localmente  
✅ Pronto para merge
