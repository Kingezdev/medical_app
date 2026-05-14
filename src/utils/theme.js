import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0066CC',
    primaryDark: '#004C99',
    primaryLight: '#4D94DB',
    accent: '#00A86B',
    accentLight: '#E6F7F0',
    danger: '#E53935',
    warning: '#FF9800',
    success: '#4CAF50',
    info: '#2196F3',
    background: '#F5F7FA',
    surface: '#FFFFFF',
    text: '#1A1A2E',
    textLight: '#6B7280',
    textMuted: '#9CA3AF',
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    cardBg: '#FFFFFF',
    shadow: 'rgba(0, 0, 0, 0.08)',
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};
