# 🎬 Padrões Shaka Player — Otimizações e Best Practices

## 1. Inicialização Correta

```typescript
// src/services/shakaPlayer.ts
import shaka from 'shaka-player';

// Polyfill MediaSource
shaka.polyfill.installAll();

export class ShakaPlayerManager {
  private player: shaka.Player | null = null;
  private video: HTMLVideoElement | null = null;
  private isInitialized = false;

  constructor(videoElement: HTMLVideoElement) {
    this.video = videoElement;
  }

  async init() {
    if (this.isInitialized) return;

    if (!shaka.Player.isBrowserSupported()) {
      throw new Error('Shaka Player não suportado neste navegador');
    }

    this.player = new shaka.Player(this.video!);

    // Configuração recomendada para TV
    this.configureForTV();

    // Listeners de erro
    this.setupErrorListeners();

    this.isInitialized = true;
  }

  private configureForTV() {
    if (!this.player) return;

    this.player.configure({
      // Streaming config
      streaming: {
        bufferingGoal: 6, // segundos
        rebufferingGoal: 2,
        bufferBehind: 30,
        retryParameters: {
          maxAttempts: 3,
          backoffFactor: 2,
          baseDelay: 100,
          fuzzFactor: 0.5,
        },
      },

      // Adaptive bitrate
      abr: {
        defaultBandwidthEstimate: 1000000, // 1Mbps initial
        switchInterval: 8, // segundos entre switches
        bandwidthUpgradeTarget: 0.85,
        bandwidthDowngradeTarget: 0.95,
      },

      // Manifest
      manifest: {
        retryParameters: {
          maxAttempts: 3,
          backoffFactor: 2,
          baseDelay: 100,
        },
      },

      // Drm (se necessário futuramente)
      drm: {
        retryParameters: {
          maxAttempts: 3,
          backoffFactor: 2,
          baseDelay: 100,
        },
      },
    });
  }

  private setupErrorListeners() {
    if (!this.player) return;

    this.player.addEventListener('error', (event: ErrorEvent) => {
      const error = event.detail;
      console.error('Shaka Player Error:', {
        code: error.code,
        category: error.category,
        message: error.message,
      });
    });

    // Eventos de qualidade
    this.player.addEventListener('variantchanged', (event: any) => {
      const variant = event.detail;
      console.log('Qualidade mudou:', {
        height: variant.height,
        bandwidth: variant.bandwidth,
      });
    });
  }

  async loadStream(url: string, mimeType?: string) {
    if (!this.player) {
      throw new Error('Player não inicializado');
    }

    try {
      // Detectar MIME type automaticamente se não fornecido
      if (!mimeType) {
        mimeType = this.detectMimeType(url);
      }

      await this.player.load(url, undefined, mimeType);
    } catch (err) {
      console.error('Erro ao carregar stream:', err);
      throw err;
    }
  }

  private detectMimeType(url: string): string {
    if (url.includes('.m3u8')) return 'application/x-mpegURL';
    if (url.includes('.mpd')) return 'application/dash+xml';
    if (url.includes('.mp4')) return 'video/mp4';
    return 'application/x-mpegURL'; // Default
  }

  play() {
    this.video?.play();
  }

  pause() {
    this.video?.pause();
  }

  seek(seconds: number) {
    if (this.video) {
      this.video.currentTime = seconds;
    }
  }

  setVolume(percent: number) {
    if (this.video) {
      this.video.volume = Math.max(0, Math.min(1, percent / 100));
    }
  }

  getStats() {
    if (!this.player) return null;

    const stats = this.player.getStats();
    return {
      width: stats.width,
      height: stats.height,
      bandwidth: stats.estimatedBandwidth,
      buffered: this.video?.buffered,
      currentTime: this.video?.currentTime,
      duration: this.video?.duration,
    };
  }

  destroy() {
    this.player?.destroy();
    this.player = null;
    this.isInitialized = false;
  }
}
```

---

## 2. Qualidade Adaptativa (ABR)

```typescript
// Hook para controlar qualidade
export const useAdaptiveBitrate = (player: shaka.Player | null) => {
  const [currentHeight, setCurrentHeight] = useState(0);
  const [availableHeights, setAvailableHeights] = useState<number[]>([]);

  const updateAvailableQualities = useCallback(() => {
    if (!player) return;

    const variants = player.getVariants();
    const heights = variants
      .map(v => v.height || 0)
      .filter((h, i, arr) => arr.indexOf(h) === i && h > 0)
      .sort((a, b) => b - a);

    setAvailableHeights(heights);

    // Set current
    const currentVariant = player.getVariant();
    if (currentVariant?.height) {
      setCurrentHeight(currentVariant.height);
    }
  }, [player]);

  // Monitor variant changes
  useEffect(() => {
    if (!player) return;

    const onVariantChange = () => {
      const variant = player.getVariant();
      if (variant?.height) {
        setCurrentHeight(variant.height);
      }
    };

    player.addEventListener('variantchanged', onVariantChange);
    updateAvailableQualities();

    return () => {
      player.removeEventListener('variantchanged', onVariantChange);
    };
  }, [player, updateAvailableQualities]);

  const setQuality = useCallback(
    (height: number | 'auto') => {
      if (!player) return;

      if (height === 'auto') {
        player.configure({ abr: { enable: true } });
      } else {
        player.configure({ abr: { enable: false } });

        const variants = player.getVariants();
        const closest = variants.reduce((prev, curr) => {
          return Math.abs((curr.height || 0) - height) <
            Math.abs((prev.height || 0) - height)
            ? curr
            : prev;
        });

        if (closest) {
          player.selectVariant(closest);
        }
      }
    },
    [player]
  );

  return {
    currentHeight,
    availableHeights,
    setQuality,
  };
};
```

---

## 3. Fallback e Retry

```typescript
// Padrão de fallback para múltiplas URLs
export const loadStreamWithFallback = async (
  player: shaka.Player,
  primaryUrl: string,
  fallbackUrls: string[] = []
) => {
  const allUrls = [primaryUrl, ...fallbackUrls];
  let lastError: Error | null = null;

  for (const url of allUrls) {
    try {
      console.log(`Tentando carregar: ${url}`);
      await player.load(url);
      console.log(`Carregado com sucesso: ${url}`);
      return url;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.warn(`Falha ao carregar ${url}:`, lastError);
    }
  }

  throw lastError || new Error('Nenhuma URL disponível');
};
```

---

## 4. Detecção de Bitrate

```typescript
// Hook para monitorar bandwidth em tempo real
export const useNetworkMonitoring = (player: shaka.Player | null) => {
  const [bandwidth, setBandwidth] = useState(0);
  const [bufferLength, setBufferLength] = useState(0);

  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      const stats = player.getStats();
      setBandwidth(stats.estimatedBandwidth || 0);

      if (player.getVideo()) {
        const buffered = player.getVideo()?.buffered;
        if (buffered && buffered.length > 0) {
          setBufferLength(buffered.end(buffered.length - 1) -
            (player.getVideo()?.currentTime || 0));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player]);

  return {
    bandwidth: Math.round(bandwidth / 1000000 * 10) / 10, // Mbps
    bufferLength: Math.round(bufferLength * 10) / 10, // segundos
  };
};
```

---

## 5. Video Tracks (Subtitle, Audio)

```typescript
export const useVideoTracks = (player: shaka.Player | null) => {
  const [audioTracks, setAudioTracks] = useState<shaka.extern.Track[]>([]);
  const [textTracks, setTextTracks] = useState<shaka.extern.Track[]>([]);

  useEffect(() => {
    if (!player) return;

    const updateTracks = () => {
      setAudioTracks(player.getAudioLanguages().map(lang => ({
        language: lang,
      } as any)));

      setTextTracks(player.getTextLanguages().map(lang => ({
        language: lang,
      } as any)));
    };

    // Initial
    updateTracks();

    // Listen to track changes
    const onTracksChanged = () => updateTracks();
    player.addEventListener('trackschanged', onTracksChanged);

    return () => {
      player.removeEventListener('trackschanged', onTracksChanged);
    };
  }, [player]);

  const selectAudio = useCallback(
    (language: string) => {
      player?.selectAudioLanguage(language);
    },
    [player]
  );

  const selectText = useCallback(
    (language: string) => {
      player?.selectTextLanguage(language);
    },
    [player]
  );

  return {
    audioTracks,
    textTracks,
    selectAudio,
    selectText,
  };
};
```

---

## 6. DRM Configuration (Futuro)

```typescript
// Configuração para DRM (PlayReady, Widevine)
export const configureDRM = (player: shaka.Player) => {
  player.configure({
    drm: {
      // PlayReady
      servers: {
        'com.microsoft.playready': 'https://your-playready-server.com/acquire',
        'com.widevine.alpha': 'https://your-widevine-server.com/acquire',
      },
      // Retry
      retryParameters: {
        maxAttempts: 3,
        backoffFactor: 2,
        baseDelay: 100,
      },
      // Advanced
      clearKeys: {},
      advanced: {
        'com.widevine.alpha': {
          videoRobustness: 'SW_SECURE_CRYPTO',
          audioRobustness: 'SW_SECURE_CRYPTO',
        },
      },
    },
  });
};
```

---

## 7. Checklist Shaka Player

- [ ] Inicialização em componente (not in render)
- [ ] Polyfill instalado
- [ ] Listeners de erro configurados
- [ ] Configuração otimizada para TV
- [ ] ABR funcionando
- [ ] Fallback URLs se necessário
- [ ] Cleanup em unmount
- [ ] Testes de stream HLS/DASH
- [ ] Network monitoring implementado
- [ ] DRM ready (se futuro)
