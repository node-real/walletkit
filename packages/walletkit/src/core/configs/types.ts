import { ColorMode } from '@/core/providers/ThemeProvider/context';

export type WalletType = 'evm' | 'solana';

export interface WalletConfig {
  name: string;
  logos: {
    default: React.ReactElement | { [x in ColorMode]: React.ReactElement };
    transparent?: React.ReactElement | { [x in ColorMode]: React.ReactElement };
  };
  downloadUrls: {
    default: string | undefined;
  };
  spinnerColor?: string;
}

export interface BaseWallet extends WalletConfig {
  id: string;
  walletType: WalletType;
  isDisabled?: boolean;
  isVisible?: boolean;
  render?: (props: WalletRenderProps) => React.ReactNode;
  showQRCode?: boolean;
  useWalletConnect?: boolean;
  isInstalled: () => boolean | undefined;
}

export interface WalletRenderProps {
  layout: 'list' | 'grid';
  colorMode: ColorMode;
  wallet: {
    id: string;
    name: string;
    logo: React.ReactElement;
    isDisabled?: boolean;
    isVisible?: boolean;
    walletType: WalletType;
  };
  onClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}
