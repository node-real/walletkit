import { BaseBehavior, BaseWallet } from '@/core/configs/types';
import { Adapter, BaseAdapterConfig } from '@tronweb3/tronwallet-abstract-adapter';

export interface TronWalletBehavior extends BaseBehavior {
  getAdapter?: () => Adapter;
}

export interface TronWallet extends BaseWallet<TronWalletBehavior> {
  adapterName: string;
}

export interface InjectedTronWalletOptions extends Partial<TronWallet> {
  adapterOptions?: BaseAdapterConfig;
}
