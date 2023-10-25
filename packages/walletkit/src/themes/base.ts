import { DeepPartial } from '../types';
import { rgba } from '../utils/css';

const radii = {
  common: '8px',
  modal: '12px',

  connectButton: 'var(--wk-radii-common)',
  disconnectButton: 'var(--wk-radii-common)',
  walletOption: 'var(--wk-radii-common)',
  walletOptionIcon: 'var(--wk-radii-common)',
  chainOption: 'var(--wk-radii-common)',
  toast: 'var(--wk-radii-common)',
};

export const base = {
  light: {
    colors: {
      text: '#1e2026',
      textSecondary: '#76808F',
      primary: '#9B00FB',
      primaryActive: '#B845FF',
      warning: '#F5B631',
      error: '#FC6E75',
      border: '#E6E8EA',

      modalBackground: '#FFFFFF',
      modalOverlay: 'rgba(0, 0, 0, 0.5)',

      optionText: '#1e2026',
      optionTextHover: '#1e2026',
      optionBackground: '#f5f5f5',
      optionBackgroundHover: rgba('#B845FF', 0.1),

      connectButtonText: '#fff',
      connectButtonTextHover: '#fff',
      connectButtonBackground: 'var(--wk-colors-primary)',
      connectButtonBackgroundHover: 'var(--wk-colors-primaryActive)',

      walletOptionText: 'var(--wk-colors-optionText)',
      walletOptionTextHover: 'var(--wk-colors-optionTextHover)',
      walletOptionBackground: 'var(--wk-colors-optionBackground)',
      walletOptionBackgroundHover: 'var(--wk-colors-optionBackgroundHover)',

      chainOptionText: 'var(--wk-colors-optionText)',
      chainOptionTextHover: 'var(--wk-colors-optionTextHover)',
      chainOptionBackground: 'var(--wk-colors-optionBackground)',
      chainOptionBackgroundHover: 'var(--wk-colors-optionBackgroundHover)',

      closeButtonText: 'var(--wk-colors-textSecondary)',
      closeButtonBackgroundHover: 'var(--wk-colors-border)',

      disconnectButtonBackgroundText: '#fff',
      disconnectButtonBackgroundTextHover: '#fff',
      disconnectButtonBackground: 'var(--wk-colors-primary)',
      disconnectButtonBackgroundHover: 'var(--wk-colors-primaryActive)',

      toastBackground: 'var(--wk-colors-modalBackground)',
    },
    shadows: {
      toast: '0px 4px 24px rgba(0, 0, 0, 0.08)',
    },
    radii,
  },
  dark: {
    colors: {
      text: '#FFF',
      textSecondary: '#76808F',
      primary: '#9B00FB',
      primaryActive: '#B845FF',
      warning: '#F5B631',
      error: '#FC6E75',
      border: '#2e323a',

      modalBackground: '#1E2026',
      modalOverlay: rgba('#000', 0.5),

      optionText: '#FFF',
      optionTextHover: '#FFF',
      optionBackground: '#14151a',
      optionBackgroundHover: rgba('#B845FF', 0.1),

      connectButtonText: '#fff',
      connectButtonTextHover: '#fff',
      connectButtonBackground: 'var(--wk-colors-primary)',
      connectButtonBackgroundHover: 'var(--wk-colors-primaryActive)',

      walletOptionText: 'var(--wk-colors-optionText)',
      walletOptionTextHover: 'var(--wk-colors-optionTextHover)',
      walletOptionBackground: 'var(--wk-colors-optionBackground)',
      walletOptionBackgroundHover: 'var(--wk-colors-optionBackgroundHover)',

      chainOptionText: 'var(--wk-colors-optionText)',
      chainOptionTextHover: 'var(--wk-colors-optionTextHover)',
      chainOptionBackground: 'var(--wk-colors-optionBackground)',
      chainOptionBackgroundHover: 'var(--wk-colors-optionBackgroundHover)',

      closeButtonText: 'var(--wk-colors-textSecondary)',
      closeButtonBackgroundHover: 'var(--wk-colors-border)',

      disconnectButtonBackgroundText: '#fff',
      disconnectButtonBackgroundTextHover: '#fff',
      disconnectButtonBackground: 'var(--wk-colors-primary)',
      disconnectButtonBackgroundHover: 'var(--wk-colors-primaryActive)',

      toastBackground: 'var(--wk-colors-modalBackground)',
    },
    shadows: {
      toast: '0px 4px 24px rgba(0, 0, 0, 0.08)',
    },
    radii,
  },
};

export type Theme = (typeof base)['light'];
export type ThemeWithMode = typeof base;

export type CustomTheme = DeepPartial<Theme> & DeepPartial<ThemeWithMode>;
