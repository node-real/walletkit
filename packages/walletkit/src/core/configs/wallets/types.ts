import { ColorMode } from '@/core/providers/ThemeProvider/context';

export interface WalletConfig {
  id: string;
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
  isDisabled?: boolean;
  render?: (props: WalletRenderProps) => React.ReactNode;
  showQRCode?: boolean;
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
  };
  onClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}
