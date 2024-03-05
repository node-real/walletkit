import { ColorMode } from '@/components/ThemeProvider/context';
import { ReactElement, ReactNode } from 'react';
import { Chain, Connector } from 'wagmi';

export interface WalletRenderProps {
  layout: 'list' | 'grid';
  colorMode: ColorMode;
  wallet: {
    id: string;
    name: string;
    logo: ReactElement;
    isDisabled?: boolean;
  };
  onClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export interface WalletProps {
  id: string;
  name: string;
  logos: {
    default: ReactElement | { [x in ColorMode]: ReactElement };
    transparent?: ReactElement | { [x in ColorMode]: ReactElement };
  };
  downloadUrls: {
    default: string | undefined;
  };
  spinnerColor?: string;
  showQRCode?: boolean;
  isInstalled: () => boolean | undefined;
  isDisabled?: boolean;
  createConnector: (chains: Chain[]) => Connector;
  getDeepLink: () => string | undefined;
  getQRCodeUri?: (uri: string) => string;
  render?: (props: WalletRenderProps) => ReactNode;
}

export type PartialWalletProps = Partial<WalletProps>;
