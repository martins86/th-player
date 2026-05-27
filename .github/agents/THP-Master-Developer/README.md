# 🎯 THP Master Developer — Agente Customizado Criado

## ✅ Estrutura Completa do Agente

Seu agente personalizado **THP Master Developer** foi criado com sucesso! Ele está pronto para ajudar no desenvolvimento do TH Player.

### 📁 Localização
```
~/.vscode-remote/data/User/prompts/THP-Master-Developer/
```

### 📂 Estrutura de Arquivos

```
THP-Master-Developer/
├── THP-Master-Developer.agent.md        ⭐ Arquivo principal do agente
├── docs/                                  # Documentação (lazy loading)
│   ├── desenvolvimento-thp.md             ✅ Padrões React/TypeScript
│   ├── integracao-webos.md                ✅ Navegação remota e performance TV
│   ├── engenharia-player.md               ✅ Shaka Player e streams IPTV
│   ├── setup-inicial.md                   ✅ Scaffolding do projeto
│   ├── code-review.md                     ✅ Padrões de code review
│   └── templates-docs.md                  ✅ Templates de documentação
└── references/                            # Referências técnicas (lazy loading)
    ├── arquitetura-thp.md                 ✅ Estrutura e padrões
    ├── padroes-react-ts.md                ✅ Best practices React 18 + TS
    ├── padroes-spatial-nav.md             ✅ Navegação espacial
    ├── padroes-shaka.md                   ✅ Otimizações Shaka Player
    ├── padroes-iptv.md                    ✅ Padrões IPTV/M3U
    ├── webos-lg-tv.md                     ✅ Integração webOS (CRÍTICO)
    └── build-deploy.md                    ✅ CI/CD e publicação LG Store
```

---

## 🚀 Como Usar o Agente

### 1. Abrir Agente no VS Code

- Ctrl+Shift+P (ou Cmd+Shift+P no Mac)
- Digite: **"Agent: Use"**
- Procure por **"THP Master Developer"**
- Ou use: **"THP Master"** para busca rápida

### 2. Exemplos de Comandos

```
💬 "Crie componente Home do TH Player"
→ Agente classifica como: 🎯 Desenvolvimento
→ Carrega: desenvolvimento-thp.md + padroes-react-ts.md
→ Implementa componente com TypeScript tipado

💬 "Configure navegação remota para a página de canais"
→ Agente classifica como: 🎮 Integração webOS
→ Carrega: integracao-webos.md + padroes-spatial-nav.md
→ Implementa navegação com useRemoteControl

💬 "Implemente Shaka Player com qualidade adaptativa"
→ Agente classifica como: 🎬 Player IPTV
→ Carrega: engenharia-player.md + padroes-shaka.md
→ Implementa player com ABR

💬 "Revise meu código de autenticação"
→ Agente classifica como: 🔍 Code Review
→ Carrega: code-review.md + padroes-react-ts.md
→ Valida conforme padrões do projeto

💬 "Setup inicial do projeto do zero"
→ Agente classifica como: 🏗️ Arquitetura
→ Carrega: setup-inicial.md + arquitetura-thp.md
→ Cria estrutura completa com Vite + React + TypeScript
```

---

## 📋 Capacidades do Agente

✅ **🎯 Desenvolvimento React/TypeScript**
- Criar componentes com tipagem forte
- Implementar hooks customizados
- Gerenciar estado com Zustand
- Estruturar features completas

✅ **🎮 Integração webOS/LG TV**
- Navegação com controle remoto
- Otimização de performance para TV
- Configuração de appinfo.json
- Testes no emulador webOS

✅ **🎬 Engenharia de Player IPTV**
- Integração Shaka Player
- Suporte a HLS/DASH
- Parser M3U/M3U8
- EPG e qualidade adaptativa

✅ **🏗️ Arquitetura e Setup**
- Scaffolding Vite + React + TypeScript
- Estrutura feature-based
- Configuração ESLint/Prettier/Vitest
- Build e publicação webOS

✅ **🔍 Code Review**
- Validação de padrões TypeScript
- Performance em TV
- Navegação remota
- Testes e documentação

✅ **📋 Documentação**
- Templates de README
- Guias de features
- ADR (Architecture Decision Records)
- CHANGELOG

---

## 🎯 Padrões Implementados

### TypeScript + React
```typescript
// ✅ Sempre: Interface de Props
interface ComponentProps {
  prop1: string;
  onCallback: () => void;
}

// ✅ Sempre: Tipos explícitos
export const Component: FC<ComponentProps> = ({ prop1, onCallback }) => {
  // ...
};

// ❌ NUNCA: any
const data: any = fetchData();
```

### Navegação Remota
```typescript
// ✅ Sempre: Suporte a remoto
useRemoteControl({
  onUp: () => moveUp(),
  onDown: () => moveDown(),
  onEnter: () => select(),
  onBack: () => goBack(),
});
```

### Performance em TV
```css
/* ✅ BOA: Transições simples */
transition: transform 0.2s ease-out;

/* ❌ MÁ: Sombras complexas */
box-shadow: 0 10px 40px rgba(0,0,0,0.3),
            0 5px 15px rgba(0,0,0,0.2);
```

---

## 📚 Estrutura de Documentação

O agente usa **lazy loading inteligente**:

1. **Nunca carrega tudo** - Otimiza para performance
2. **Carrega sob demanda** - Apenas o relevante para a tarefa
3. **Organizado em 2 níveis:**
   - `docs/` - Workflows e processos
   - `references/` - Padrões técnicos específicos

---

## 🔗 Integração com Seu Projeto

O agente está configurado para:
- ✅ Prefixo: `THP-XXXX`
- ✅ Stack: React 18 | TypeScript | Vite | Shaka Player | webOS TV
- ✅ Team: Múltiplos desenvolvedores
- ✅ Repository: `martins86/th-player`

---

## 🧪 Próximos Passos Recomendados

1. **Setup Inicial**
   ```
   "Faça o setup inicial do projeto do zero"
   ```

2. **Criar Componente Home**
   ```
   "Implemente a página Home com lista de canais"
   ```

3. **Integrar Player**
   ```
   "Integrate Shaka Player com suporte a IPTV"
   ```

4. **Publicar no LG Store**
   ```
   "Guie o processo de publicação na LG Store"
   ```

---

## 📞 Dúvidas?

Se o agente não encontrar informação específica ou precisar de ajustes:

1. **Para adicionar padrões** → Edite `references/`
2. **Para adicionar workflows** → Edite `docs/`
3. **Para mudar comportamento** → Edite `THP-Master-Developer.agent.md`

O sistema é **escalável** e **modular** - você pode adicionar novos arquivos sem problemas!

---

## ✨ Destaques

- 🚀 **12 arquivos** com 100+ páginas de documentação
- 📖 **Lazy loading** inteligente (carrega sob demanda)
- 🎯 **Sistema de classificação** automática de tarefas
- 📚 **Referências técnicas** integradas
- 🔒 **Padrões obrigatórios** para quality
- ✅ **Definition of Done** para cada tipo de tarefa

---

**Versão:** 1.0  
**Criado:** 2024-05-27  
**Stack:** React 18 | TypeScript | Vite | Shaka Player | webOS TV  
**Status:** ✅ Pronto para Uso
