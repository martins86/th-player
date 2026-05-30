import type { WebOSInfo } from '../types/webos.types';

export const webOSService = {
  isAvailable: (): boolean =>
    typeof window !== 'undefined' && Boolean(window.webOS),

  getVersion: (): string | null => {
    if (typeof window === 'undefined' || !window.webOS) {
      return null;
    }

    return window.webOS.version ?? null;
  },

  getDeviceId: (): string | null => {
    if (typeof window === 'undefined' || !window.webOS) {
      return null;
    }

    return window.webOS.deviceId ?? null;
  },

  getInfo: (): WebOSInfo => ({
    isWebOS: typeof window !== 'undefined' && Boolean(window.webOS),
    version:
      typeof window !== 'undefined' && window.webOS
        ? (window.webOS.version ?? null)
        : null,
    deviceId:
      typeof window !== 'undefined' && window.webOS
        ? (window.webOS.deviceId ?? null)
        : null,
  }),
};
