/**
 * 🎨 Paleta de Cores Padrão TH Player
 * Cores: Preta, Vermelha, Branca
 *
 * Uso:
 * import { colors } from '@/constants/colors';
 *
 * style={{ backgroundColor: colors.black }}
 */

export const colors = {
  // Pretas
  black: '#000000',
  black900: '#1a1a1a',
  black800: '#2d2d2d',

  // Vermelhas
  red: '#ff0000',
  red600: '#dc2626',
  red700: '#b91c1c',

  // Brancas
  white: '#ffffff',
  white90: '#e6e6e6',

  // Cinzentos (suporte)
  gray400: '#999999',

  // Aliases de design
  primary: '#ff0000',
  primaryHover: '#dc2626',
  background: '#000000',
  surface: '#1a1a1a',
  surfaceSecondary: '#2d2d2d',
  text: '#ffffff',
  textMuted: '#999999',
  border: '#ff0000',
} as const;

export type ColorName = keyof typeof colors;
