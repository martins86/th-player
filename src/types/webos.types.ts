export interface WebOSInfo {
  isWebOS: boolean;
  version: string | null;
  deviceId: string | null;
}

declare global {
  interface Window {
    webOS?: {
      version?: string;
      deviceId?: string;
      request?: Record<string, unknown>;
      [key: string]: unknown;
    };
  }
}
