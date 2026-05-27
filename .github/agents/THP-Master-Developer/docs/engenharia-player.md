# 🎬 Engenharia de Player — Shaka Player & IPTV

## Setup Shaka Player

```typescript
// src/services/player.ts
import shaka from 'shaka-player';

// Inicializar Shaka na primeira execução
if (!shaka.Player.isBrowserSupported()) {
  throw new Error('Browser não suporta Shaka Player');
}

export class PlayerService {
  private player: shaka.Player | null = null;
  private video: HTMLVideoElement | null = null;

  constructor(videoElement: HTMLVideoElement) {
    this.video = videoElement;
  }

  async initialize() {
    if (!this.video) throw new Error('Video element não fornecido');

    this.player = new shaka.Player(this.video);

    // Configurar listeners de erro
    this.player.addEventListener('error', (event) => {
      console.error('Shaka Player Error:', event);
    });

    // Configurar preferências de bitrate
    this.player.configure({
      streaming: {
        bufferingGoal: 6, // segundos
        rebufferingGoal: 2,
        bufferBehind: 30,
      },
      abr: {
        defaultBandwidthEstimate: 1000000, // 1Mbps default
        switchInterval: 8,
      },
    });
  }

  async loadStream(url: string) {
    if (!this.player) throw new Error('Player não inicializado');

    try {
      await this.player.load(url);
    } catch (err) {
      console.error('Erro ao carregar stream:', err);
      throw err;
    }
  }

  play() {
    this.video?.play();
  }

  pause() {
    this.video?.pause();
  }

  setVolume(volume: number) {
    if (!this.video) return;
    this.video.volume = Math.max(0, Math.min(1, volume / 100));
  }

  seek(time: number) {
    if (!this.video) return;
    this.video.currentTime = time;
  }

  destroy() {
    this.player?.destroy();
    this.player = null;
  }
}
```

---

## Suporte a M3U/M3U8

```typescript
// src/services/m3uParser.ts
export interface M3UChannel {
  id: string;
  name: string;
  logo: string;
  category: string;
  url: string;
  tvg_id?: string;
  tvg_name?: string;
}

export class M3UParser {
  static parse(content: string): M3UChannel[] {
    const lines = content.split('\n');
    const channels: M3UChannel[] = [];
    let currentMetadata: Partial<M3UChannel> = {};

    for (const line of lines) {
      if (line.startsWith('#EXTINF:')) {
        // Parsear metadata
        const match = line.match(/#EXTINF:.*?tvg-id="([^"]*)".*?tvg-name="([^"]*)".*?tvg-logo="([^"]*)".*?group-title="([^"]*)"\s*,(.+)/);

        if (match) {
          currentMetadata = {
            id: match[1],
            tvg_id: match[1],
            tvg_name: match[2],
            logo: match[3],
            category: match[4],
            name: match[5].trim(),
          };
        }
      } else if (line.trim() && !line.startsWith('#')) {
        // URL do canal
        if (currentMetadata.name) {
          channels.push({
            id: currentMetadata.id || crypto.randomUUID(),
            name: currentMetadata.name,
            logo: currentMetadata.logo || '',
            category: currentMetadata.category || 'Outros',
            url: line.trim(),
            tvg_id: currentMetadata.tvg_id,
            tvg_name: currentMetadata.tvg_name,
          });
        }
        currentMetadata = {};
      }
    }

    return channels;
  }
}

// Uso
const m3uContent = await fetch('playlist.m3u').then(r => r.text());
const channels = M3UParser.parse(m3uContent);
```

---

## Qualidade Adaptativa (ABR)

```typescript
// src/hooks/useAdaptiveBitrate.ts
import { useCallback, useState } from 'react';
import shaka from 'shaka-player';

export const useAdaptiveBitrate = (player: shaka.Player | null) => {
  const [currentQuality, setCurrentQuality] = useState<'auto' | 'hd' | 'sd'>('auto');
  const [availableQualities, setAvailableQualities] = useState<number[]>([]);

  const getAvailableQualities = useCallback(() => {
    if (!player) return;

    const variants = player.getVariants();
    const heights = variants.map(v => v.height || 0).filter((h, i, a) => a.indexOf(h) === i);
    setAvailableQualities(heights.sort((a, b) => b - a));
  }, [player]);

  const setQuality = useCallback((quality: 'auto' | 'hd' | 'sd') => {
    if (!player) return;

    setCurrentQuality(quality);

    if (quality === 'auto') {
      player.configure({ abr: { enable: true } });
    } else {
      const minHeight = quality === 'hd' ? 720 : 480;
      player.configure({ abr: { enable: false } });

      const variants = player.getVariants();
      const targetVariant = variants.find(v => (v.height || 0) >= minHeight);

      if (targetVariant) {
        player.selectVariant(targetVariant);
      }
    }
  }, [player]);

  return {
    currentQuality,
    setQuality,
    availableQualities,
    getAvailableQualities,
  };
};
```

---

## Tratamento de Erros

```typescript
// src/services/playerErrorHandler.ts
export enum PlayerErrorType {
  NETWORK = 'NETWORK',
  MANIFEST = 'MANIFEST',
  SEGMENTS = 'SEGMENTS',
  DRM = 'DRM',
  UNKNOWN = 'UNKNOWN',
}

export interface PlayerErrorEvent {
  type: PlayerErrorType;
  message: string;
  code?: string;
  retryable: boolean;
}

export class PlayerErrorHandler {
  static handle(error: any): PlayerErrorEvent {
    const message = error?.message || 'Erro desconhecido';

    // Classificar erro
    if (message.includes('NETWORK')) {
      return {
        type: PlayerErrorType.NETWORK,
        message: 'Erro de conexão. Verifique sua internet.',
        retryable: true,
      };
    }

    if (message.includes('MANIFEST')) {
      return {
        type: PlayerErrorType.MANIFEST,
        message: 'Playlist inválida ou indisponível.',
        retryable: true,
      };
    }

    if (message.includes('DRM')) {
      return {
        type: PlayerErrorType.DRM,
        message: 'Conteúdo protegido não suportado.',
        retryable: false,
      };
    }

    return {
      type: PlayerErrorType.UNKNOWN,
      message: message,
      retryable: true,
    };
  }
}
```

---

## EPG (Electronic Program Guide)

```typescript
// src/services/epgService.ts
export interface EPGEntry {
  channelId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  image?: string;
}

export class EPGService {
  async fetchEPG(channelId: string): Promise<EPGEntry[]> {
    // Implementar chamada de API para EPG
    // Exemplo: https://api.epg.com/channels/{id}/programs
    
    try {
      const response = await fetch(`/api/epg/${channelId}`);
      const data = await response.json();

      return data.programs.map((prog: any) => ({
        channelId,
        title: prog.title,
        description: prog.description,
        startTime: new Date(prog.start),
        endTime: new Date(prog.end),
        image: prog.image,
      }));
    } catch (err) {
      console.error('Erro ao buscar EPG:', err);
      return [];
    }
  }

  getCurrentProgram(epg: EPGEntry[]): EPGEntry | null {
    const now = new Date();
    return epg.find(e => e.startTime <= now && now < e.endTime) || null;
  }

  getUpcomingPrograms(epg: EPGEntry[], count: number = 5): EPGEntry[] {
    const now = new Date();
    return epg.filter(e => e.startTime >= now).slice(0, count);
  }
}
```

---

## Player UI Component

```typescript
// src/components/Player/VideoPlayer.tsx
import { FC, useRef, useEffect, useState } from 'react';
import { usePlayer } from '../../hooks/usePlayer';
import { useRemoteControl } from '../../hooks/useRemoteControl';
import { PlayerService } from '../../services/player';

interface VideoPlayerProps {
  url: string;
  title: string;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({ url, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playerService, setPlayerService] = useState<PlayerService | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);

  // Initialize player
  useEffect(() => {
    if (!videoRef.current) return;

    const service = new PlayerService(videoRef.current);
    service.initialize().then(() => {
      setPlayerService(service);
      service.loadStream(url).catch(err => {
        setError(err.message);
      });
    });

    return () => {
      service.destroy();
    };
  }, [url]);

  // Remote control handlers
  useRemoteControl({
    onEnter: () => {
      if (videoRef.current?.paused) {
        playerService?.play();
      } else {
        playerService?.pause();
      }
    },
    onUp: () => {
      const volume = (videoRef.current?.volume || 0) + 0.1;
      playerService?.setVolume(volume * 100);
    },
    onDown: () => {
      const volume = (videoRef.current?.volume || 0) - 0.1;
      playerService?.setVolume(volume * 100);
    },
    onRight: () => {
      if (!videoRef.current) return;
      videoRef.current.currentTime += 10;
    },
    onLeft: () => {
      if (!videoRef.current) return;
      videoRef.current.currentTime -= 10;
    },
    onBack: () => {
      // Voltar para lista de canais
      window.history.back();
    },
  });

  if (error) {
    return <div className="player-error">{error}</div>;
  }

  return (
    <div className="video-player">
      <video ref={videoRef} width="100%" height="100%" controls={showControls} />
      <div className="player-info">
        <h1>{title}</h1>
      </div>
    </div>
  );
};
```

---

## Checklist Player

- [ ] Shaka Player inicializado corretamente
- [ ] Suporte a HLS (.m3u8) funcionando
- [ ] Suporte a DASH (.mpd) funcionando
- [ ] M3U parser testado com playlists reais
- [ ] Qualidade adaptativa funcionando
- [ ] Tratamento de erros com mensagens úteis
- [ ] Controles de remoto (play/pause/volume/seek)
- [ ] EPG carregando corretamente
- [ ] Performance sem buffer excessivo
- [ ] Testes unitários para parser M3U
