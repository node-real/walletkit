import { EvmWallet } from '../types';
import {
  codexFieldWallet as wagmiCodexFieldWallet,
  WalletConnectParameters,
} from 'codexfield-wallet-connector';
import { getEvmGlobalData } from '@/evm/globalData';
import { codexFieldWalletConfig } from '@/core/configs/codexFieldWallet';

interface CodexFieldWalletOptions extends Partial<EvmWallet> {
  connectorOptions?: Partial<WalletConnectParameters>;
}

export function codexFieldWallet(props: CodexFieldWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...codexFieldWalletConfig,
    id: 'codexFieldWallet',
    walletType: 'evm',
    behaviors: [
      {
        platforms: ['tg-android', 'tg-ios', 'tg-pc'],
        connectType: 'default',
        isInstalled() {
          return true;
        },
        getCreateConnectorFn() {
          const { walletConnectProjectId } = getEvmGlobalData();

          if (!walletConnectProjectId) {
            throw new Error('walletConnectProjectId is required.');
          }

          return wagmiCodexFieldWallet({
            projectId: walletConnectProjectId,
            ...connectorOptions,
          });
        },
      },
    ],
    ...restProps,
  };
}
