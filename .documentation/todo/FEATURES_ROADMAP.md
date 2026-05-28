# 🎬 TH Player — Roadmap de Features

## 📋 MVP (Primeira Versão)

### Fase 1: Infraestrutura Base ⭐
- [ ] Setup inicial (✅ Pronto)
- [ ] Integração webOS
- [ ] Navegação com controle remoto
- [ ] Sistema de rotas
- [ ] Gerenciamento de estado global

### Fase 2: Autenticação 🔐
- [ ] Tela de Login
- [ ] Armazenamento de credenciais
- [ ] Persistência de sessão
- [ ] Logout

### Fase 3: Listagem de Canais 📺
- [ ] Página Home com canais
- [ ] Suporte a M3U/playlists IPTV
- [ ] Parser de playlists
- [ ] Favoritos
- [ ] Categorias

### Fase 4: Player IPTV 🎥
- [ ] Integração Shaka Player
- [ ] Reprodução HLS/DASH
- [ ] Controles (play/pause/volume/seek)
- [ ] Qualidade adaptativa (ABR)
- [ ] Tratamento de erros

### Fase 5: Features Complementares ⚙️
- [ ] EPG básico
- [ ] Histórico recente
- [ ] Configurações
- [ ] Performance otimizada

---

## 🔧 Detalhamento por Feature

### Feature 1️⃣: Integração webOS

**Objetivo:** Permitir que o app funcione no webOS TV com detecção automática de ambiente.

**Arquivos a criar:**
```
src/
├── hooks/
│   └── useWebOS.ts           # Detectar webOS, obter info do device
├── services/
│   └── webos.ts              # Wrapper para APIs webOS
├── utils/
│   └── webosDetect.ts        # Utilitário de detecção
└── types/
    └── webos.types.ts        # Types do webOS
```

**Componentes:**
- Nenhum (apenas serviço)

**Testes:**
- [ ] Detectar se é webOS
- [ ] Obter versão do webOS
- [ ] Obter Device ID

**Referência:** `.documentation/agente/THP-Master-Developer/references/webos-lg-tv.md`

---

### Feature 2️⃣: Navegação com Controle Remoto

**Objetivo:** Implementar navegação fluida com as teclas do controle remoto (UP/DOWN/LEFT/RIGHT/ENTER/BACK).

**Arquivos a criar:**
```
src/
├── hooks/
│   └── useRemoteControl.ts   # Hook para capturar eventos do remoto
├── navigation/
│   ├── spatialNav.ts         # Setup de navegação espacial
│   └── remoteKeys.ts         # Mapeamento de teclas
└── types/
    └── remote.types.ts       # Types de navegação
```

**Componentes:**
- Nenhum (apenas hooks e utilities)

**Testes:**
- [ ] UP/DOWN funciona
- [ ] LEFT/RIGHT funciona
- [ ] ENTER seleciona
- [ ] BACK volta
- [ ] Sem lag em navegação

**Referência:** `.documentation/agente/THP-Master-Developer/docs/integracao-webos.md`

---

### Feature 3️⃣: Sistema de Rotas

**Objetivo:** Implementar sistema de roteamento com React Router.

**Arquivos a criar:**
```
src/
├── navigation/
│   └── routes.ts             # Definição de todas as rotas
├── pages/
│   ├── Login.tsx
│   ├── Home.tsx
│   ├── Player.tsx
│   └── Settings.tsx
└── components/
    └── Layout/
        └── AppLayout.tsx     # Layout wrapper das páginas
```

**Rotas:**
```
/login                        # Página de login
/                            # Home - lista de canais
/player/:id                  # Player - reproduzindo canal
/settings                    # Configurações
```

**Testes:**
- [ ] Rotas carregam corretamente
- [ ] Navegação entre rotas funciona
- [ ] URL reflete página correta

---

### Feature 4️⃣: Autenticação

**Objetivo:** Implementar login e gerenciamento de sessão.

**Arquivos a criar:**
```
src/
├── store/
│   └── authStore.ts          # Store de autenticação (Zustand)
├── services/
│   └── authService.ts        # Chamadas de API
├── hooks/
│   └── useAuth.ts            # Hook para usar auth
├── components/
│   └── LoginForm.tsx         # Formulário de login
├── types/
│   └── auth.types.ts         # Types de autenticação
└── pages/
    └── Login.tsx             # Página de login
```

**Store (Zustand):**
```typescript
interface AuthStore {
  user: User | null
  token: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}
```

**Testes:**
- [ ] Login com credenciais válidas
- [ ] Erro com credenciais inválidas
- [ ] Token persistido no localStorage
- [ ] Logout limpa sessão

---

### Feature 5️⃣: Listagem de Canais

**Objetivo:** Carregar e exibir canais IPTV da playlist M3U.

**Arquivos a criar:**
```
src/
├── store/
│   └── channelStore.ts       # Store de canais
├── services/
│   ├── channelService.ts     # Carregamento de canais
│   └── m3uParser.ts          # Parser de M3U
├── hooks/
│   └── useChannels.ts        # Hook para canais
├── components/
│   ├── ChannelCard.tsx       # Card de canal
│   ├── ChannelList.tsx       # Lista de canais
│   └── CategoryFilter.tsx    # Filtro por categoria
├── pages/
│   └── Home.tsx              # Página home
└── types/
    └── channel.types.ts      # Types de canal
```

**Store:**
```typescript
interface ChannelStore {
  channels: Channel[]
  favorites: Channel[]
  selectedCategory: string | null
  loading: boolean
  loadChannels: (m3uUrl: string) => Promise<void>
  toggleFavorite: (channelId: string) => void
  filterByCategory: (category: string) => void
}
```

**Testes:**
- [ ] Parser M3U com playlist válida
- [ ] Carregamento de canais da URL
- [ ] Filtro por categoria
- [ ] Adicionar/remover favoritos

**Referência:** `.documentation/agente/THP-Master-Developer/references/padroes-iptv.md`

---

### Feature 6️⃣: Player IPTV

**Objetivo:** Integrar Shaka Player para reprodução de streams HLS/DASH.

**Arquivos a criar:**
```
src/
├── store/
│   └── playerStore.ts        # Store do player
├── services/
│   └── playerService.ts      # Wrapper do Shaka Player
├── hooks/
│   ├── usePlayer.ts          # Hook do player
│   └── useAdaptiveBitrate.ts # Hook para qualidade
├── components/
│   └── Player/
│       ├── VideoPlayer.tsx   # Componente de vídeo
│       ├── PlayerControls.tsx # Controles
│       └── QualitySelector.tsx
├── pages/
│   └── Player.tsx            # Página do player
└── types/
    └── player.types.ts       # Types do player
```

**Store:**
```typescript
interface PlayerStore {
  currentStream: string | null
  isPlaying: boolean
  volume: number
  currentQuality: string
  play: (streamUrl: string) => Promise<void>
  pause: () => void
  setVolume: (volume: number) => void
  setQuality: (quality: string) => void
}
```

**Testes:**
- [ ] Reprodução de stream HLS
- [ ] Reprodução de stream DASH
- [ ] Controles funcionam
- [ ] Qualidade adaptativa
- [ ] Tratamento de erro

**Referência:** `.documentation/agente/THP-Master-Developer/docs/engenharia-player.md`

---

### Feature 7️⃣: Favoritos e Histórico

**Objetivo:** Permitir adicionar favoritos e manter histórico de canais assistidos.

**Arquivos a criar:**
```
src/
├── store/
│   ├── favoritesStore.ts     # Store de favoritos
│   └── historyStore.ts       # Store de histórico
├── services/
│   └── storageService.ts     # Persistência
└── types/
    └── storage.types.ts      # Types de storage
```

**Testes:**
- [ ] Adicionar canal aos favoritos
- [ ] Remover dos favoritos
- [ ] Histórico registra canais assistidos
- [ ] Persistência em localStorage

---

### Feature 8️⃣: Configurações

**Objetivo:** Tela de configurações para qualidade, player, cache.

**Arquivos a criar:**
```
src/
├── store/
│   └── settingsStore.ts      # Store de configurações
├── components/
│   └── SettingsForm.tsx
└── pages/
    └── Settings.tsx          # Página de settings
```

**Testes:**
- [ ] Qualidade padrão configurável
- [ ] Limpar cache
- [ ] Logout

---

## 📊 Sequência de Implementação Recomendada

```
1. Integração webOS ─────────────┐
2. Navegação Remota ─────────────┼─→ 5. Player IPTV
3. Sistema de Rotas ─────────────┤
4. Autenticação ─────────────────┤
5. Listagem de Canais ──────────┐
6. Player IPTV ─────────────────→ 7. Favoritos
7. Favoritos ────────────────────
8. Configurações ───────────────→ Build & Deploy
```

---

## 🧪 Padrão de Teste para Cada Feature

```bash
# Antes de marcar como concluída:
npm run type-check      # ✅ Sem erros TypeScript
npm run lint            # ✅ Sem problemas ESLint
npm run test:run        # ✅ Testes passam
npm run test:coverage   # ✅ Coverage > 80%
npm run build           # ✅ Build gera sem erros
```

---

## 📝 Checklist de Desenvolvimento

Para cada feature, validar:

- [ ] Código segue padrões TypeScript (sem `any`)
- [ ] Props interface definida (Componentes React)
- [ ] Testes unitários (coverage > 80%)
- [ ] Funciona com navegação remota
- [ ] Performance aceitável em TV
- [ ] Lint/Format passa
- [ ] Commit com padrão `[THP-XXXX] TIPO - descrição`
- [ ] PR com descrição clara

---

## 🚀 Próximos Passos

1. **Criar branch:** `feature/THP-0001-webos-integration`
2. **Começar com:** Integração webOS
3. **Commit regularmente** com padrão THP-XXXX
4. **PR quando pronto** com code review

---

## 📚 Referências Importantes

- [Desenvolvimento THP](../.documentation/agente/THP-Master-Developer/docs/desenvolvimento-thp.md)
- [Integração webOS](../.documentation/agente/THP-Master-Developer/docs/integracao-webos.md)
- [Engenharia Player](../.documentation/agente/THP-Master-Developer/docs/engenharia-player.md)
- [Code Review](../.documentation/agente/THP-Master-Developer/docs/code-review.md)

