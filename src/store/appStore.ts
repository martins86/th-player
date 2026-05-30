import { create } from 'zustand';
import type { WebOSInfo } from '../types/webos.types';

interface AppState extends WebOSInfo {
  setPlatformInfo: (info: WebOSInfo) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isWebOS: false,
  version: null,
  deviceId: null,
  setPlatformInfo: (info: WebOSInfo) => set(info),
}));
