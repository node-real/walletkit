import { ReactElement } from 'react';
import { Chain, Connector } from 'wagmi';

export interface WalletProps {
  id: string;
  name: string;
  logos: {
    default: ReactElement;
  };
  downloadUrls: {
    default: string | undefined;
  };
  installed: boolean | undefined;
  createConnector: (chains: Chain[]) => Connector;
  getUri: () => string | undefined;
}

export type PartialWalletProps = Partial<Omit<WalletProps, 'id'>>;
