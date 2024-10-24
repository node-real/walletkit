import { BaseWallet } from '@/core/configs/types';
import { Adapter, BaseAdapterConfig } from '@tronweb3/tronwallet-abstract-adapter';

export interface TronWallet extends BaseWallet {
  adapterName: string;
  getAdapter: () => Adapter;
}

export interface InjectedTronWalletOptions extends Partial<TronWallet> {
  adapterOptions?: BaseAdapterConfig;
}
