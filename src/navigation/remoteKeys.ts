export const remoteKeys = {
  ENTER: 'Enter',
  BACK: 'Backspace',
  ESCAPE: 'Escape',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
} as const;

export type RemoteKey = (typeof remoteKeys)[keyof typeof remoteKeys];
