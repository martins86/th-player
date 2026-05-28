import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Cleanup após cada teste
afterEach(() => {
  cleanup();
});

// Mock do webOS (se necessário)
if (typeof window !== 'undefined') {
  const globalWindow = window as unknown as Record<string, unknown>;
  globalWindow.webOS = {
    platform: {
      back: () => {},
    },
    service: {
      request: vi.fn(),
    },
  };
}
