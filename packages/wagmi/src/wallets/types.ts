import { CreateConnectorFn } from 'wagmi';
import { InjectedParameters } from './injected';
import { WalletConfig } from '@node-real/walletkit-ui';

export interface WalletProps extends WalletConfig {
  getCreateConnectorFn: () => CreateConnectorFn;
  getDeepLink: () => string | undefined;
  getQRCodeUri?: (uri: string) => string;
}

export interface InjectedWalletOptions extends Partial<WalletProps> {
  connectorOptions?: InjectedParameters;
}
