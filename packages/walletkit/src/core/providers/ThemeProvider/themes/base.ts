import { rgba } from '@/core/base/utils/css';

const radii = {
  common: '8px',
  modal: '12px',

  navButton: '4px',
  button: 'var(--wk-radii-common)',
  connectButton: 'var(--wk-radii-common)',
  disconnectButton: 'var(--wk-radii-common)',
  noWalletButton: 'var(--wk-radii-common)',
  walletOption: 'var(--wk-radii-common)',
  walletOptionIcon: 'var(--wk-radii-common)',
  chainOption: 'var(--wk-radii-common)',
  toast: 'var(--wk-radii-common)',
  qrCode: 'var(--wk-radii-common)',
};

const zIndices = {
  modal: 1300,
  toast: 1500,
};

export const base = {
  light: {
    colors: {
      text: '#1E2026',
      textSecondary: '#76808F',
      primary: '#CC9D09',
      primaryActive: '#F0B90B',
      error: '#D9304E',
      errorActive: '#B82942',
      border: '#E6E8EA',
      disabled: '#AEB4BC',

      modalBackground: '#FFFFFF',
      modalOverlay: 'rgba(0, 0, 0, 0.5)',

      buttonText: 'var(--wk-colors-text)',
      buttonTextHover: 'var(--wk-colors-text)',
      buttonBackground: '#f5f5f5',
      buttonBackgroundHover: rgba('#F0B90B', 0.1),

      connectButtonText: 'var(--wk-colors-text)',
      connectButtonTextHover: 'var(--wk-colors-text)',
      connectButtonBackground: '#f5f5f5',
      connectButtonBackgroundHover: '#e6e8ea',

      navButtonText: 'var(--wk-colors-textSecondary)',
      navButtonBackgroundHover: 'var(--wk-colors-border)',

      optionText: 'var(--wk-colors-text)',
      optionTextHover: 'var(--wk-colors-text)',
      optionBackground: '#f5f5f5',
      optionBackgroundHover: rgba('#F0B90B', 0.1),

      walletOptionText: 'var(--wk-colors-optionText)',
      walletOptionTextHover: 'var(--wk-colors-optionTextHover)',
      walletOptionBackground: 'var(--wk-colors-optionBackground)',
      walletOptionBackgroundHover: 'var(--wk-colors-optionBackgroundHover)',

      chainOptionText: 'var(--wk-colors-optionText)',
      chainOptionTextHover: 'var(--wk-colors-optionTextHover)',
      chainOptionBackground: 'var(--wk-colors-optionBackground)',
      chainOptionBackgroundHover: 'var(--wk-colors-optionBackgroundHover)',

      toastBackground: 'var(--wk-colors-modalBackground)',

      qrCodeDot: 'var(--wk-colors-text)',
      qrCodeBorder: 'var(--wk-colors-border)',

      noWalletButtonText: 'var(--wk-colors-text)',
      noWalletButtonTextHover: 'var(--wk-colors-text)',
      noWalletButtonBackground: 'transparent',
      noWalletButtonBackgroundHover: 'var(--wk-colors-border)',
      noWalletButtonBorder: 'var(--wk-colors-border)',
      noWalletButtonBorderHover: 'var(--wk-colors-border)',

      disconnectButtonBackgroundText: 'var(--wk-colors-text)',
      disconnectButtonBackgroundTextHover: 'var(--wk-colors-text)',
      disconnectButtonBackground: 'transparent',
      disconnectButtonBackgroundHover: 'var(--wk-colors-border)',
      disconnectButtonBorder: 'var(--wk-colors-border)',
      disconnectButtonBorderHover: 'var(--wk-colors-border)',
    },
    shadows: {
      normal: '0px 4px 20px 0px rgba(0, 0, 0, 0.04)',
      toast: '0px 4px 24px rgba(0, 0, 0, 0.08)',
    },
    radii,
    zIndices,
  },
  dark: {
    colors: {
      text: '#FFF',
      textSecondary: '#76808F',
      primary: '#CC9D09',
      primaryActive: '#F0B90B',
      error: '#D9304E',
      errorActive: '#B82942',
      border: '#2e323a',
      disabled: '#5E6673',

      modalBackground: '#1E2026',
      modalOverlay: rgba('#000', 0.5),

      buttonText: 'var(--wk-colors-text)',
      buttonTextHover: 'var(--wk-colors-text)',
      buttonBackground: '#14151a',
      buttonBackgroundHover: rgba('#F0B90B', 0.1),

      connectButtonText: 'var(--wk-colors-text)',
      connectButtonTextHover: 'var(--wk-colors-text)',
      connectButtonBackground: '#2b2f36',
      connectButtonBackgroundHover: '#2e323a',

      navButtonText: 'var(--wk-colors-textSecondary)',
      navButtonBackgroundHover: 'var(--wk-colors-border)',

      optionText: 'var(--wk-colors-text)',
      optionTextHover: 'var(--wk-colors-text)',
      optionBackground: '#14151a',
      optionBackgroundHover: rgba('#F0B90B', 0.1),

      walletOptionText: 'var(--wk-colors-optionText)',
      walletOptionTextHover: 'var(--wk-colors-optionTextHover)',
      walletOptionBackground: 'var(--wk-colors-optionBackground)',
      walletOptionBackgroundHover: 'var(--wk-colors-optionBackgroundHover)',

      chainOptionText: 'var(--wk-colors-optionText)',
      chainOptionTextHover: 'var(--wk-colors-optionTextHover)',
      chainOptionBackground: 'var(--wk-colors-optionBackground)',
      chainOptionBackgroundHover: 'var(--wk-colors-optionBackgroundHover)',

      toastBackground: 'var(--wk-colors-modalBackground)',

      qrCodeDot: 'var(--wk-colors-text)',
      qrCodeBorder: 'var(--wk-colors-border)',

      noWalletButtonText: 'var(--wk-colors-text)',
      noWalletButtonTextHover: 'var(--wk-colors-text)',
      noWalletButtonBackground: 'transparent',
      noWalletButtonBackgroundHover: 'var(--wk-colors-border)',
      noWalletButtonBorder: 'var(--wk-colors-border)',
      noWalletButtonBorderHover: 'var(--wk-colors-border)',

      disconnectButtonBackgroundText: 'var(--wk-colors-text)',
      disconnectButtonBackgroundTextHover: 'var(--wk-colors-text)',
      disconnectButtonBackground: 'transparent',
      disconnectButtonBackgroundHover: 'var(--wk-colors-border)',
      disconnectButtonBorder: 'var(--wk-colors-border)',
      disconnectButtonBorderHover: 'var(--wk-colors-border)',
    },
    shadows: {
      normal: '0px 4px 20px 0px rgba(0, 0, 0, 0.04)',
      toast: '0px 4px 24px rgba(0, 0, 0, 0.08)',
    },
    radii,
    zIndices,
  },
};
