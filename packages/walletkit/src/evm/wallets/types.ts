import { CreateConnectorFn } from 'wagmi';
import { InjectedParameters } from './injected';
import { BaseBehavior, BaseWallet } from '@/core/configs/types';

export interface EvmWalletBehavior extends BaseBehavior {
  getCreateConnectorFn?: () => CreateConnectorFn;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EvmWallet extends BaseWallet<EvmWalletBehavior> {}

export interface InjectedEvmWalletOptions extends Partial<EvmWallet> {
  connectorOptions?: InjectedParameters;
}
