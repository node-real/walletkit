import { Chain } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { TRUST_WALLET_ID } from '.';
import { sleep } from '@/utils/common';

export type TrustWalletConnectorOptions = {
  shimDisconnect?: boolean;
  delayTime?: number;
};

export class TrustWalletConnector extends MetaMaskConnector {
  readonly id: any = TRUST_WALLET_ID;
  protected shimDisconnectKey = `${this.id}.shimDisconnect`;

  private delayTime: number;
  private twProvider: any;

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
      ..._options,
    };

    super({
      chains,
      options,
    });

    this.delayTime = options.delayTime ?? 1500;
  }

  public async getProvider() {
    if (!this.twProvider) {
      await sleep(this.delayTime);
      this.twProvider = (await getTrustWalletFromEip6963()) || (await getTrustWalletFromWindow());
      if (this.twProvider?.removeListener === undefined) {
        this.twProvider.removeListener = this.twProvider.off;
      }
    }
    return this.twProvider;
  }
}

function getTrustWalletFromEip6963({ timeout } = { timeout: 100 }) {
  return new Promise((resolve) => {
    window.addEventListener('eip6963:announceProvider', (event: any) => {
      const provider = event.detail.provider;
      if (provider.isTrust) {
        resolve(provider);
      }
    });
    window.dispatchEvent(new Event('eip6963:requestProvider'));

    setTimeout(() => {
      resolve(null);
    }, timeout);
  });
}

function getTrustWalletFromWindow() {
  const isTrustWallet = (ethereum: any) => {
    // Identify if Trust Wallet injected provider is present.
    const trustWallet = !!ethereum.isTrust;

    return trustWallet;
  };

  const injectedProviderExist =
    typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';

  // No injected providers exist.
  if (!injectedProviderExist) {
    return null;
  }

  // Trust Wallet was injected into window.ethereum.
  if (isTrustWallet(window.ethereum)) {
    return window.ethereum;
  }

  // Trust Wallet provider might be replaced by another
  // injected provider, check the providers array.
  if (window.ethereum?.providers) {
    // ethereum.providers array is a non-standard way to
    // preserve multiple injected providers. Eventually, EIP-5749
    // will become a living standard and we will have to update this.
    return window.ethereum.providers.find(isTrustWallet) ?? null;
  }

  // Trust Wallet injected provider is available in the global scope.
  // There are cases that some cases injected providers can replace window.ethereum
  // without updating the ethereum.providers array. To prevent issues where
  // the TW connector does not recognize the provider when TW extension is installed,
  // we begin our checks by relying on TW's global object.
  return window['trustwallet'] ?? null;
}
