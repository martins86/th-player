export type Channel = {
  id: string;
  name: string;
  streamUrl: string;
};

export const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'Exemplo — Sintel (HLS)',
    streamUrl:
      'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
  },
  {
    id: '2',
    name: 'Demo MP4 (compatível Chrome)',
    streamUrl:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
];
