# 📺 IPTV Patterns — M3U, Playlists e Canais

## 1. Parser M3U/M3U8 Robusto

```typescript
// src/services/m3uParser.ts
export interface M3UHeader {
  tvgShift?: number;
  version?: string;
}

export interface M3UChannel {
  id: string;
  name: string;
  url: string;
  category?: string;
  logo?: string;
  tvgId?: string;
  tvgName?: string;
  group?: string;
  attributes?: Record<string, string>;
}

export class M3UParser {
  // Parse M3U content completo
  static parse(content: string): {
    header: M3UHeader;
    channels: M3UChannel[];
  } {
    const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

    if (lines[0]?.startsWith('#EXTM3U')) {
      // Header
      const headerLine = lines[0];
      const header = this.parseHeader(headerLine);

      // Canais
      const channels: M3UChannel[] = [];
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].startsWith('#EXTINF:')) {
          const channelInfo = this.parseChannelInfo(lines[i]);
          if (lines[i + 1] && !lines[i + 1].startsWith('#')) {
            const url = lines[i + 1];
            channels.push({
              id: channelInfo.tvgId || crypto.randomUUID(),
              name: channelInfo.name,
              url,
              ...channelInfo,
            });
            i++; // Skip URL line
          }
        }
      }

      return { header, channels };
    }

    throw new Error('M3U inválido: cabeçalho não encontrado');
  }

  private static parseHeader(line: string): M3UHeader {
    const tvgShiftMatch = line.match(/tvg-shift=(-?\d+)/);
    const versionMatch = line.match(/version="([^"]*)"/);

    return {
      tvgShift: tvgShiftMatch ? parseInt(tvgShiftMatch[1]) : undefined,
      version: versionMatch ? versionMatch[1] : undefined,
    };
  }

  private static parseChannelInfo(line: string) {
    // Regex complexo para parsear EXTINF
    const extinf = line.match(/#EXTINF:(.+?)(?=,|\s|$)/)?.[1] || '-1';
    const tvgId = this.extractAttribute(line, 'tvg-id');
    const tvgName = this.extractAttribute(line, 'tvg-name');
    const logo = this.extractAttribute(line, 'tvg-logo');
    const group = this.extractAttribute(line, 'group-title');

    // Nome é tudo após a última vírgula
    const nameMatch = line.match(/,(.+)$/);
    const name = nameMatch ? nameMatch[1].trim() : 'Unknown';

    return {
      tvgId,
      tvgName,
      logo,
      group,
      name,
      attributes: {
        extinf,
        ...this.extractAllAttributes(line),
      },
    };
  }

  private static extractAttribute(
    line: string,
    attribute: string
  ): string | undefined {
    const regex = new RegExp(`${attribute}="([^"]*)"`);
    const match = line.match(regex);
    return match ? match[1] : undefined;
  }

  private static extractAllAttributes(
    line: string
  ): Record<string, string> {
    const attrs: Record<string, string> = {};
    const attrRegex = /(\w+)="([^"]*)"/g;
    let match;

    while ((match = attrRegex.exec(line)) !== null) {
      attrs[match[1]] = match[2];
    }

    return attrs;
  }
}
```

---

## 2. Gerenciar Categorias

```typescript
// src/services/channelService.ts
export class ChannelService {
  static categorizeChannels(channels: M3UChannel[]) {
    const categories = new Map<string, M3UChannel[]>();

    for (const channel of channels) {
      const category = channel.category || 'Outros';

      if (!categories.has(category)) {
        categories.set(category, []);
      }

      categories.get(category)!.push(channel);
    }

    // Ordenar alfabeticamente
    return new Map([...categories.entries()].sort());
  }

  // Search de canais
  static searchChannels(
    channels: M3UChannel[],
    query: string
  ): M3UChannel[] {
    const normalized = query.toLowerCase();

    return channels.filter(ch =>
      ch.name.toLowerCase().includes(normalized) ||
      ch.tvgName?.toLowerCase().includes(normalized) ||
      ch.category?.toLowerCase().includes(normalized)
    );
  }

  // Sort by name
  static sortByName(channels: M3UChannel[]): M3UChannel[] {
    return [...channels].sort((a, b) =>
      a.name.localeCompare(b.name, 'pt-BR')
    );
  }
}
```

---

## 3. Store de Canais

```typescript
// src/store/channelStore.ts
interface ChannelStore {
  // State
  channels: M3UChannel[];
  categories: Map<string, M3UChannel[]>;
  currentCategory: string | null;
  
  // Actions
  loadChannels: (content: string) => void;
  setCurrentCategory: (category: string | null) => void;
  searchChannels: (query: string) => M3UChannel[];
  addFavorite: (channelId: string) => void;
  removeFavorite: (channelId: string) => void;
  getFavorites: () => M3UChannel[];
}

export const useChannelStore = create<ChannelStore>((set, get) => ({
  channels: [],
  categories: new Map(),
  currentCategory: null,

  loadChannels: (content) => {
    try {
      const { channels } = M3UParser.parse(content);
      const categories = ChannelService.categorizeChannels(channels);

      set({
        channels: ChannelService.sortByName(channels),
        categories,
        currentCategory: [...categories.keys()][0] || null,
      });
    } catch (err) {
      console.error('Erro ao carregar canais:', err);
      throw err;
    }
  },

  setCurrentCategory: (category) => set({ currentCategory: category }),

  searchChannels: (query) => {
    const { channels } = get();
    return ChannelService.searchChannels(channels, query);
  },

  addFavorite: (channelId) => {
    const state = get();
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    ) as string[];

    if (!favorites.includes(channelId)) {
      favorites.push(channelId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  },

  removeFavorite: (channelId) => {
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    ) as string[];

    const updated = favorites.filter(id => id !== channelId);
    localStorage.setItem('favorites', JSON.stringify(updated));
  },

  getFavorites: () => {
    const { channels } = get();
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    ) as string[];

    return channels.filter(ch => favorites.includes(ch.id));
  },
}));
```

---

## 4. EPG (Electronic Program Guide)

```typescript
// src/services/epgService.ts
export interface EPGProgram {
  channelId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  image?: string;
}

export class EPGService {
  // Parsear EPG em XML
  static parseXML(xmlContent: string): EPGProgram[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlContent, 'application/xml');

    if (doc.getElementsByTagName('parsererror').length > 0) {
      throw new Error('EPG XML inválido');
    }

    const programs: EPGProgram[] = [];
    const channels = doc.getElementsByTagName('channel');

    for (const channel of channels) {
      const channelId = channel.getAttribute('id');

      const programs_elem = channel.getElementsByTagName('programme');
      for (const prog of programs_elem) {
        programs.push({
          channelId: channelId || '',
          title: prog.getElementsByTagName('title')[0]?.textContent || '',
          description:
            prog.getElementsByTagName('desc')[0]?.textContent || '',
          startTime: new Date(prog.getAttribute('start') || ''),
          endTime: new Date(prog.getAttribute('stop') || ''),
          image: prog.getElementsByTagName('icon')[0]?.getAttribute('src'),
        });
      }
    }

    return programs;
  }

  // Pegar programa atual de um canal
  static getCurrentProgram(
    programs: EPGProgram[],
    channelId: string
  ): EPGProgram | null {
    const now = new Date();

    return (
      programs.find(
        p =>
          p.channelId === channelId &&
          p.startTime <= now &&
          now < p.endTime
      ) || null
    );
  }

  // Próximos programas
  static getUpcomingPrograms(
    programs: EPGProgram[],
    channelId: string,
    limit: number = 5
  ): EPGProgram[] {
    const now = new Date();

    return programs
      .filter(p => p.channelId === channelId && p.startTime >= now)
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
      .slice(0, limit);
  }
}
```

---

## 5. Stream URL Variations

```typescript
// Lidar com múltiplas URLs para mesmo canal (fallback)
export interface StreamVariant {
  url: string;
  bandwidth?: number;
  quality?: 'HD' | 'SD' | 'AUTO';
  protocol?: 'hls' | 'dash' | 'rtmp';
}

export class StreamResolver {
  private variants: Map<string, StreamVariant[]> = new Map();

  addVariant(channelId: string, variant: StreamVariant) {
    if (!this.variants.has(channelId)) {
      this.variants.set(channelId, []);
    }
    this.variants.get(channelId)!.push(variant);
  }

  // Get best variant para um canal
  getBestVariant(
    channelId: string,
    preferQuality?: 'HD' | 'SD'
  ): StreamVariant | null {
    const variants = this.variants.get(channelId);
    if (!variants || variants.length === 0) return null;

    if (preferQuality === 'HD') {
      return (
        variants.find(v => v.quality === 'HD') ||
        variants.find(v => v.quality === 'AUTO') ||
        variants[0]
      );
    }

    if (preferQuality === 'SD') {
      return (
        variants.find(v => v.quality === 'SD') ||
        variants.find(v => v.quality === 'AUTO') ||
        variants[0]
      );
    }

    // Default: maior bandwidth
    return variants.reduce((best, curr) =>
      (curr.bandwidth || 0) > (best.bandwidth || 0) ? curr : best
    );
  }
}
```

---

## 6. M3U Validation

```typescript
export class M3UValidator {
  static validate(content: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!content.includes('#EXTM3U')) {
      errors.push('Cabeçalho #EXTM3U não encontrado');
    }

    const lines = content.split('\n');
    let extinf_count = 0;
    let url_count = 0;

    for (const line of lines) {
      if (line.startsWith('#EXTINF:')) {
        extinf_count++;
      }
      if (!line.startsWith('#') && line.trim()) {
        url_count++;
      }
    }

    if (extinf_count !== url_count) {
      errors.push(
        `Mismatch: ${extinf_count} EXTINF mas ${url_count} URLs`
      );
    }

    if (extinf_count === 0) {
      errors.push('Nenhum canal encontrado');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
```

---

## Checklist IPTV

- [ ] Parser M3U testado com playlists reais
- [ ] Categorização funcionando
- [ ] Search de canais implementado
- [ ] Favoritos salvos em storage
- [ ] EPG carregando corretamente
- [ ] URLs com fallback
- [ ] Validação de M3U
- [ ] Performance com 1000+ canais
- [ ] Suporte a múltiplos idiomas (áudio/legenda)
- [ ] Cache de EPG implementado
