import { EvmWallet } from '../types';
import {
  codexFieldWallet as wagmiCodexFieldWallet,
  WalletConnectParameters,
} from 'codexfield-wallet-connector';
import { getEvmGlobalData } from '@/evm/globalData';
import { codexFieldWalletConfig } from '@/core/configs/codexFieldWallet';
import { isTMA } from '@/core/base/utils/mobile';

interface CodexFieldWalletOptions extends Partial<EvmWallet> {
  connectorOptions?: Partial<WalletConnectParameters>;
}

export function codexFieldWallet(props: CodexFieldWalletOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  return {
    ...codexFieldWalletConfig,
    id: 'codexFieldWallet',
    walletType: 'evm',
    showQRCode: false,
    platforms: ['tg-android', 'tg-ios', 'tg-pc'],
    isInstalled() {
      return isTMA();
    },
    getDeepLink() {
      return undefined;
    },
    getUri(uri) {
      return undefined;
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
    ...restProps,
  };
}
