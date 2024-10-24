import { CreateConnectorFn } from 'wagmi';
import { InjectedParameters } from './injected';
import { BaseWallet } from '@/core/configs/types';

export interface EvmWallet extends BaseWallet {
  getCreateConnectorFn: () => CreateConnectorFn;
  getDeepLink: () => string | undefined;
  getUri: (uri: string) => string | undefined;
}

export interface InjectedEvmWalletOptions extends Partial<EvmWallet> {
  connectorOptions?: InjectedParameters;
}
