import { Chain } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { TRUST_WALLET_ID } from '.';

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
      getProvider: getTrustWalletProvider,
      ..._options,
    };

    super({
      chains,
      options,
    });
  }
}

function getTrustWalletProvider() {
  const isTrustWallet = (ethereum: any) => {
    return !!ethereum.isTrust;
  };

  const injectedProviderExist =
    typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';

  if (!injectedProviderExist) {
    return;
  }

  if (isTrustWallet(window.ethereum)) {
    return window.ethereum;
  }

  if (window.ethereum?.providers) {
    return window.ethereum.providers.find(isTrustWallet);
  }

  if (window.trustwallet && window.trustwallet.removeListener === undefined) {
    window.trustwallet.removeListener = window.trustwallet.off;
  }

  return window.trustwallet;
}
