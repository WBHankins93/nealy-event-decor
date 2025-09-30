export const COLORS = {
  signature: {
    gold: '#D4AF37',
  },
  pearl: {
    white: '#F8F6F0',
    light: '#FAFAFA',
  },
  charcoal: {
    black: '#1A1A1A',
  },
  meadow: {
    sage: '#9CAF88',
    lavender: '#B19CD9',
  },
  forest: {
    green: '#2C3E28',
    emerald: '#014421',
  },
  light: {
    red: '#F6C6CD',
  },
  wine: {
    burgundy: '#4A1C28',
  },
  warm: {
    terracotta: '#D2691E',
    eggshell: '#F0EAD6',
  },
} as const;

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
] as const;
