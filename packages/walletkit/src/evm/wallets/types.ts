import { CreateConnectorFn } from 'wagmi';
import { InjectedParameters } from './injected';
import { BaseWallet } from '@/core/configs/wallets/types';

export interface EvmWallet extends BaseWallet {
  getCreateConnectorFn: () => CreateConnectorFn;
  getDeepLink: () => string | undefined;
  getQRCodeUri?: (uri: string) => string;
}

export interface InjectedEvmWalletOptions extends Partial<EvmWallet> {
  connectorOptions?: InjectedParameters;
}
