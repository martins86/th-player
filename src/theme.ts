/**
 * 🎨 Sistema de Tema TH Player
 * Paleta: Preta, Vermelha, Branca
 */

export const theme = {
  colors: {
    // Cores primárias
    black: '#000000',
    red: '#ff0000',
    white: '#ffffff',

    // Variações
    black900: '#1a1a1a',
    black800: '#2d2d2d',
    red600: '#dc2626',
    red700: '#b91c1c',
    white90: '#e6e6e6',
    gray400: '#999999',
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },

  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 8px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.5)',
  },

  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
} as const;

export type Theme = typeof theme;
