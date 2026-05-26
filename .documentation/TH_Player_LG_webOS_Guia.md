# TH Player — IPTV App para LG webOS

## Visão Geral

O **TH Player** será um aplicativo IPTV desenvolvido para TVs LG utilizando a plataforma **webOS TV**.

O app terá foco em:
- Reprodução de canais IPTV
- Compatibilidade com playlists M3U
- Reprodução HLS/DASH
- Interface otimizada para controle remoto
- Login via API ou credenciais
- Player performático para TVs LG

---

# Objetivos do Projeto

## Funcionalidades principais

### MVP (Primeira versão)
- Login do usuário
- Suporte a playlist M3U/M3U8
- Lista de canais
- Categorias
- Player fullscreen
- EPG básico
- Favoritos
- Histórico recente
- Controle remoto LG

### Futuras funcionalidades
- Multi-screen
- Catchup TV
- Busca
- Controle parental
- Integração Xtream Codes
- Temas
- VOD
- Séries
- Multi perfil

---

# Tecnologias Recomendadas

## Frontend
- React
- TypeScript
- Vite

## Navegação TV
- Norigin Spatial Navigation

## Player de vídeo
- Shaka Player

## Plataforma
- LG webOS TV SDK

## Ferramentas
- Node.js
- VS Code
- webOS CLI
- webOS Emulator

---

# Estrutura Recomendada do Projeto

```txt
th-player/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── navigation/
│   ├── player/
│   ├── styles/
│   └── utils/
├── appinfo.json
├── package.json
└── vite.config.ts
```

---

# Requisitos do Ambiente

## Instalar Node.js
Download:
https://nodejs.org/

Versão recomendada:
- Node 20+

---

# Instalar webOS CLI

```bash
npm install -g @webos-tools/cli
```

Verificar instalação:

```bash
ares -V
```

---

# Instalar VS Code

Download:
https://code.visualstudio.com/

Extensões recomendadas:
- ESLint
- Prettier
- React Snippets
- TypeScript Toolbox

---

# Criar Projeto React

```bash
npm create vite@latest th-player -- --template react-ts
```

Entrar na pasta:

```bash
cd th-player
```

Instalar dependências:

```bash
npm install
```

---

# Instalar Bibliotecas Necessárias

## Navegação TV

```bash
npm install @noriginmedia/norigin-spatial-navigation
```

## Player

```bash
npm install shaka-player
```

## Rotas

```bash
npm install react-router-dom
```

## Gerenciamento de estado

```bash
npm install zustand
```

---

# Configurar appinfo.json

Arquivo obrigatório da LG.

Exemplo:

```json
{
  "id": "com.thplayer.app",
  "version": "1.0.0",
  "vendor": "TH Player",
  "type": "web",
  "main": "index.html",
  "title": "TH Player",
  "icon": "icon.png"
}
```

---

# Estrutura Inicial de Telas

## Splash Screen
- Logo TH Player
- Loading inicial

## Login
- Usuário/senha
- Código de ativação
- Xtream API

## Home
- Categorias
- Canais recentes
- Favoritos

## Player
- Fullscreen
- Informações do canal
- Barra de progresso
- EPG

## Configurações
- Qualidade
- Player
- Cache
- Conta

---

# Navegação por Controle Remoto

## Teclas importantes

| Tecla | Função |
|---|---|
| LEFT | Navegar esquerda |
| RIGHT | Navegar direita |
| UP | Navegar acima |
| DOWN | Navegar abaixo |
| ENTER | Selecionar |
| BACK | Voltar |

---

# Exemplo de Captura de Teclas

```javascript
document.addEventListener("keydown", (event) => {
  switch(event.keyCode) {
    case 37:
      console.log("LEFT");
      break;

    case 38:
      console.log("UP");
      break;

    case 39:
      console.log("RIGHT");
      break;

    case 40:
      console.log("DOWN");
      break;

    case 13:
      console.log("ENTER");
      break;
  }
});
```

---

# Reprodução IPTV

## Formatos suportados
- HLS (.m3u8)
- MPEG-DASH
- MP4

## DRM futuro
- Widevine
- PlayReady

---

# Exemplo de Reprodução com Shaka Player

```javascript
import shaka from 'shaka-player';

const video = document.getElementById('video');

const player = new shaka.Player(video);

player.load('https://url-do-stream.m3u8');
```

---

# Performance para TVs LG

## Regras importantes

### Evitar:
- Animações pesadas
- DOM gigante
- Muitas sombras CSS
- Re-render excessivo

### Preferir:
- Lazy loading
- Virtualização de listas
- Imagens otimizadas
- CSS simples

---

# Testes na TV LG

## Ativar modo desenvolvedor

Instalar app:
- Developer Mode (na TV LG)

Login:
- Conta LG Developer

Ativar:
- Dev Mode
- Key Server

---

# Conectar TV na máquina

Descobrir IP da TV:
Configurações → Rede

Adicionar dispositivo:

```bash
ares-setup-device
```

---

# Build do Projeto

```bash
npm run build
```

---

# Empacotar Aplicação

```bash
ares-package dist
```

Gerará:

```txt
com.thplayer.app_1.0.0_all.ipk
```

---

# Instalar na TV

```bash
ares-install com.thplayer.app_1.0.0_all.ipk
```

Executar:

```bash
ares-launch com.thplayer.app
```

---

# Criar Conta LG Developer

Portal:
https://webostv.developer.lge.com/

Também criar conta:
https://seller.lgappstv.com/

---

# Requisitos da LG Store

## Obrigatórios
- Ícone
- Screenshots
- Política de privacidade
- Termos de uso
- Classificação etária
- Testes de estabilidade

---

# Assets Necessários

## Ícones
- 80x80
- 130x130
- 400x400

## Splash
- 1920x1080

## Screenshots
- Home
- Player
- Configurações

---

# Política de Privacidade

Necessário possuir:
- coleta de dados
- login
- analytics
- cookies
- streaming

Recomendado:
- página pública online

---

# Processo de Publicação

## 1. Criar App
Seller Lounge → New App

## 2. Upload do pacote
Enviar:
- .ipk
- screenshots
- ícones

## 3. Preencher informações
- descrição
- categoria
- idiomas
- países

## 4. Revisão LG
A LG executará:
- testes
- performance
- validação UX

## 5. Aprovação
App publicado na LG Content Store

---

# Possíveis Motivos de Rejeição

- App travando
- Vazamento de memória
- Navegação ruim
- Player falhando
- Botão BACK incorreto
- Performance baixa
- Conteúdo ilegal

---

# Segurança Recomendada

## Backend
Nunca expor:
- URLs privadas
- Tokens
- APIs internas

## Ideal
Usar backend intermediário:
- autenticação
- proxy
- controle de acesso

---

# Backend Recomendado

## Stack sugerida
- Node.js
- NestJS
- PostgreSQL
- Redis

## Funções
- autenticação
- gerenciamento IPTV
- EPG
- favoritos
- analytics

---

# Roadmap Sugerido

## Fase 1
- Estrutura base
- Login
- Lista de canais

## Fase 2
- Player IPTV
- Categorias
- Favoritos

## Fase 3
- EPG
- Busca
- Performance

## Fase 4
- Publicação LG Store

---

# Links Oficiais

## webOS TV
https://webostv.developer.lge.com/

## Seller Lounge
https://seller.lgappstv.com/

## CLI
https://webostv.developer.lge.com/develop/tools/cli-installation

## Emulator
https://webostv.developer.lge.com/develop/tools/emulator-installation

---

# Recomendações Finais

## Prioridades do TH Player
1. Performance
2. Navegação fluida
3. Player estável
4. Boa UX
5. Baixo consumo de memória

## Sugestão técnica final
- React + TypeScript
- Shaka Player
- Spatial Navigation
- Backend próprio
- Deploy automatizado

---

# Próximos Passos

## Próxima etapa recomendada
Criar:
- boilerplate inicial
- navegação TV
- player IPTV funcional
- login
- home estilo Netflix

