import { WalletConnectConnector as WagmiWalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { providers } from 'ethers';

export class WalletConnectConnector extends WagmiWalletConnectConnector {
  async getSigner({ chainId }: { chainId?: number } = {}) {
    const [provider, account] = await Promise.all([this.getProvider(), this.getAccount()]);
    return new providers.Web3Provider(provider, chainId).getSigner(account);
  }
}
