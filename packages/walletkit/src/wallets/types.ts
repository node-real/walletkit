import { ReactElement } from 'react';
import { Chain, Connector } from 'wagmi';
import { ColorMode } from '../components/ThemeProvider/context';

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
  installed: boolean | undefined;
  createConnector: (chains: Chain[]) => Connector;
  getUri: () => string | undefined;
}

export type PartialWalletProps = Partial<WalletProps>;
