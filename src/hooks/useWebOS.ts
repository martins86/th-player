import { useState } from 'react';
import { webOSService } from '../services/webos';
import type { WebOSInfo } from '../types/webos.types';

export const useWebOS = (): WebOSInfo => {
  const [platform] = useState<WebOSInfo>(() => webOSService.getInfo());
  return platform;
};
