import { Chain } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { TRUST_WALLET_ID } from '.';
import { getInjectedProvider } from '../utils';
import { sleep } from '@/utils/common';

export type TrustWalletConnectorOptions = {
  shimDisconnect?: boolean;
};

export class TrustWalletConnector extends MetaMaskConnector {
  readonly id: any = TRUST_WALLET_ID;
  protected shimDisconnectKey = `${this.id}.shimDisconnect`;

  constructor({
    chains,
    options: _options,
  }: {
    chains?: Chain[];
    options?: TrustWalletConnectorOptions;
  } = {}) {
    const options = {
      name: 'Trust Wallet',
      shimDisconnect: true,
      getProvider,
      ..._options,
    };

    super({
      chains,
      options,
    });
  }

  public async getProvider() {
    if (typeof window !== 'undefined' && !window.trustwallet?.request) {
      await sleep();
    }
    return this.options.getProvider();
  }
}

function getProvider() {
  if (typeof window === 'undefined') return;

  const provider = getInjectedProvider('isTrust') ?? window.trustwallet ?? window.trustWallet;

  if (provider && provider.removeListener === undefined) {
    provider.removeListener = provider.off;
  }

  return provider;
}
