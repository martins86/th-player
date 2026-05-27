# 📋 Templates de Documentação — TH Player

## Template: README.md para Feature

```markdown
# Feature: Nome da Feature

## 📝 Descrição
[Descrição breve da feature, seu propósito e benefícios]

## 🎯 Objetivo
[O que essa feature resolve ou melhora]

## 🏗️ Arquitetura

### Estrutura de Pastas
\`\`\`
src/features/[feature-name]/
├── components/
│   ├── Component1.tsx
│   └── Component2.tsx
├── hooks/
│   └── useFeature.ts
├── services/
│   └── featureService.ts
├── store/
│   └── featureStore.ts
└── types/
    └── feature.types.ts
\`\`\`

### Diagrama
\`\`\`mermaid
graph TD
  A[Componente UI] --> B[Hook useFeature]
  B --> C[Store Zustand]
  C --> D[Service API]
  D --> E[Backend]
\`\`\`

## 📌 Componentes Principais

### Componente 1: [NomeComponente]
- **Responsabilidade:** [O que faz]
- **Props:** [Listar props]
- **Exemplo:**
\`\`\`tsx
<Component prop1="value" />
\`\`\`

### Componente 2: [NomeComponente]
- **Responsabilidade:** [O que faz]
- **Props:** [Listar props]

## 🔄 Fluxo de Dados

\`\`\`mermaid
sequenceDiagram
  User->>Component: Interage com UI
  Component->>Hook: Chama hook customizado
  Hook->>Store: Atualiza estado
  Store->>Service: Faz chamada API
  Service->>Backend: Requisição HTTP
  Backend-->>Service: Resposta
  Service-->>Store: Atualiza dados
  Store-->>Component: Re-render
  Component-->>User: Mostra resultado
\`\`\`

## 🧪 Testes

### Testes Unitários
- [ ] Componentes renderizam corretamente
- [ ] Handlers funcionam
- [ ] Estado atualiza corretamente
- [ ] Erros são tratados

### Testes de Integração
- [ ] Feature funciona com navegação remota
- [ ] Performance aceitável
- [ ] Sem memory leaks

## 📖 Como Usar

\`\`\`typescript
import { useFeature } from '@hooks/useFeature';

const MyComponent = () => {
  const { data, loading, error } = useFeature();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return <div>{data}</div>;
};
\`\`\`

## 🐛 Troubleshooting

### Problema: [Problema 1]
**Solução:** [Como resolver]

### Problema: [Problema 2]
**Solução:** [Como resolver]

## 📚 Referências
- [Link para issue/task]
- [Link para documentação]
- [Link para exemplos]

---
**Última atualização:** [Data]  
**Autor:** [Nome]  
**Status:** [✅ Completo | 🔄 Em Desenvolvimento | ⚠️ Review]
```

---

## Template: Component Documentation

```typescript
/**
 * # Componente: ChannelCard
 * 
 * ## Descrição
 * Card de exibição de canal IPTV com suporte a navegação remota.
 * 
 * ## Responsabilidades
 * - Renderizar informações do canal (nome, logo, categoria)
 * - Suportar navegação com controle remoto (ENTER)
 * - Chamar callback ao selecionar canal
 * 
 * ## Props
 * @param {string} id - ID único do canal
 * @param {string} name - Nome do canal
 * @param {string} logo - URL da logo do canal
 * @param {string} category - Categoria do canal
 * @param {() => void} onSelect - Callback ao selecionar
 * 
 * ## Exemplo de Uso
 * ```tsx
 * <ChannelCard
 *   id="1"
 *   name="CNN"
 *   logo="https://..."
 *   category="News"
 *   onSelect={() => playChannel('1')}
 * />
 * ```
 * 
 * ## Estados
 * - **focused**: Card em foco (navegação remota)
 * - **loading**: Carregando informações
 * - **error**: Erro ao carregar
 * 
 * ## Relacionados
 * - `useRemoteControl` - Hook para navegação remota
 * - `ChannelList` - Componente pai
 * 
 * ## Performance
 * - Memoizado com React.memo
 * - Lazy loading de imagens
 * - Sem re-renders desnecessários
 */
export const ChannelCard: FC<ChannelCardProps> = ({ ... }) => {
  // ...
};
```

---

## Template: API Service Documentation

```typescript
/**
 * # Serviço: PlayerService
 * 
 * ## Responsabilidades
 * - Gerenciar instância do Shaka Player
 * - Carregar e reproduzir streams IPTV (HLS/DASH)
 * - Controlar volume, seek, qualidade
 * 
 * ## Métodos Principais
 * 
 * ### initialize()
 * Inicializa o player com configurações padrão.
 * 
 * ```typescript
 * const service = new PlayerService(videoElement);
 * await service.initialize();
 * ```
 * 
 * ### loadStream(url: string)
 * Carrega um stream IPTV.
 * 
 * ```typescript
 * await service.loadStream('https://stream.m3u8');
 * ```
 * 
 * ### setQuality(quality: 'auto' | 'hd' | 'sd')
 * Define qualidade do stream.
 * 
 * ## Tratamento de Erros
 * - Todos os métodos lançam exceções em caso de erro
 * - Use try-catch ao chamar
 * 
 * ```typescript
 * try {
 *   await service.loadStream(url);
 * } catch (err) {
 *   console.error('Erro ao carregar:', err);
 * }
 * ```
 * 
 * ## Testes
 * - Testar inicialização
 * - Testar carregamento de múltiplos streams
 * - Testar tratamento de URLs inválidas
 * - Testar cleanup
 */
export class PlayerService { ... }
```

---

## Template: Hook Documentation

```typescript
/**
 * # Hook: useRemoteControl
 * 
 * ## Propósito
 * Simplificar o uso de controle remoto LG em componentes React.
 * 
 * ## Uso
 * ```typescript
 * const { onUp, onDown, onEnter } = useRemoteControl({
 *   onUp: () => moveUp(),
 *   onDown: () => moveDown(),
 *   onEnter: () => select(),
 * });
 * ```
 * 
 * ## Handlers Disponíveis
 * - `onUp()` - Seta acima
 * - `onDown()` - Seta abaixo
 * - `onLeft()` - Seta esquerda
 * - `onRight()` - Seta direita
 * - `onEnter()` - Enter/OK
 * - `onBack()` - Botão voltar
 * 
 * ## Exemplo Completo
 * ```typescript
 * const ChannelList = () => {
 *   const [index, setIndex] = useState(0);
 * 
 *   useRemoteControl({
 *     onUp: () => setIndex(Math.max(0, index - 1)),
 *     onDown: () => setIndex(Math.min(channels.length - 1, index + 1)),
 *     onEnter: () => play(channels[index]),
 *   });
 * 
 *   return <div>{/* ... */}</div>;
 * };
 * ```
 * 
 * ## Performance
 * - Listener removido em cleanup
 * - Sem memory leaks
 * - Não afeta performance TV
 */
export const useRemoteControl = (handlers: RemoteHandlers) => {
  // ...
};
```

---

## Template: API Integration Doc

```markdown
# Integração: Login API

## 📡 Endpoint
- **URL:** `POST /api/auth/login`
- **Timeout:** 10s
- **Retry:** 3 vezes com backoff exponencial

## 📥 Request
```json
{
  "username": "user@example.com",
  "password": "senha123"
}
```

## 📤 Response (Sucesso - 200)
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "123",
    "name": "João",
    "email": "joao@example.com"
  },
  "expiresIn": 3600
}
```

## ❌ Response (Erro)
- **401 Unauthorized:** Credenciais inválidas
- **429 Too Many Requests:** Muitas tentativas
- **500 Internal Server Error:** Erro no servidor

## 🔐 Segurança
- Token armazenado em sessionStorage (não localStorage)
- Token incluído em cada request como `Authorization: Bearer {token}`
- Logout limpa token

## 🧪 Como Testar
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

## 📚 Implementação
Veja `src/features/auth/services/authService.ts`
```

---

## Template: Architecture Decision Record (ADR)

```markdown
# ADR-001: Usar Zustand para Estado Global

## Status
✅ ACEITO

## Contexto
Precisávamos escolher uma solução de gerenciamento de estado que fosse leve e performática para TV.

## Opções Consideradas
1. **Redux** - Complexo demais, bundle grande
2. **Context API** - Renderiza tudo, performance ruim
3. **Zustand** - Leve, performático, simples
4. **Recoil** - Experimental, instável

## Decisão
Usar **Zustand** para estado global.

## Justificativa
- ✅ Bundle pequeno (2KB)
- ✅ Performance excelente em TV
- ✅ API simples e intuitiva
- ✅ Sem boilerplate
- ✅ DevTools support

## Consequências
- Menos estrutura → mais flexibilidade
- Requer disciplina do time
- Devemos usar regras como "um store por feature"

## Referências
- [Zustand Docs](https://github.com/pmndrs/zustand)
- Issue: THP-0045

---
**Data:** 2024-05-20  
**Autor:** Team TH Player  
**Revisto por:** [Nome]
```

---

## Template: CHANGELOG.md

```markdown
# Changelog

## [1.1.0] - 2024-05-20

### Adicionado
- ✨ Suporte a EPG básico
- ✨ Favoritos em local storage
- ✨ Histórico de canais recentes

### Melhorado
- 🚀 Performance do player +30%
- 🎨 UI refinada para melhor UX em TV
- 🔧 Tratamento de erros melhorado

### Corrigido
- 🐛 Crash ao carregar M3U inválido
- 🐛 Navegação remota travando
- 🐛 Memory leak em cleanup

### Removido
- Componentes antigos não usados

### Segurança
- 🔒 Tokens seguros em sessionStorage

## [1.0.0] - 2024-05-01

### Inicial
- 🎯 MVP completo
- ✅ Login funcionando
- ✅ Reprodução IPTV
- ✅ Navegação remota
- ✅ Publicado na LG Store

---
**Formato:** [Keep a Changelog](https://keepachangelog.com/)
```

---

## Boas Práticas de Documentação

✅ **FAÇA:**
- Documentar componentes complexos com exemplos
- Manter README sempre atualizado
- Usar diagramas Mermaid para fluxos
- Documentar decisões em ADRs
- Adicionar comentários em lógica não óbvia

❌ **NÃO FAÇA:**
- Comentários redundantes (`const x = 1; // Define x como 1`)
- Documentação desatualizada
- Sem exemplos práticos
- Sem links para referências
- Sem imagens/diagramas em features complexas
