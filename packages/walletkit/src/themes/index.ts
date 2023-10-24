import { DeepPartial } from '../types';
import { rgba } from '../utils/css';

export const theme = {
  colors: {
    text: '#1e2026',
    textSecondary: '#76808f',
    primary: '#9B00FB',
    primaryActive: '#B845FF',
    warning: '#EB9E09',
    error: '#D9304E',
    modalBackground: '#fff',
    modalOverlay: 'rgba(0, 0, 0, 0.5)',

    connectButtonText: '#fff',
    connectButtonTextHover: '#fff',
    connectButtonBackground: '#9B00FB',
    connectButtonBackgroundHover: '#B845FF',

    walletItemBackground: '#f5f5f5',
    walletItemBackgroundHover: rgba('#b845ff', 0.1),

    closeButtonText: '#76808f',
    closeButtonBackgroundHover: '#e6e8ea',
  },
  shadows: {
    toast: '0px 4px 24px rgba(0, 0, 0, 0.08)',
  },
  radii: {
    modal: '12px',
    connectButton: '4px',
    walletItem: '8px',
    walletItemIcon: '8px',
    toast: '8px',
  },
  fonts: {},
};

export type Theme = DeepPartial<typeof theme>;
