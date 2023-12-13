import { ColorMode } from '@/components/ThemeProvider/context';
import { ReactElement } from 'react';
import { Chain, Connector } from 'wagmi';

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
  createConnector: (chains: Chain[]) => Connector;
  getDeepLink: () => string | undefined;
  getQRCodeUri?: (uri: string) => string;
}

export type PartialWalletProps = Partial<WalletProps>;
