import { WalletConnectConnector as WagmiWalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { createWalletClient, custom } from 'viem';
import { WalletClient } from 'wagmi';

export class WalletConnectConnector extends WagmiWalletConnectConnector {
  async getWalletClient({ chainId }: { chainId?: number } = {}): Promise<WalletClient> {
    const [provider, account] = await Promise.all([
      this.getProvider(), // TODO
      this.getAccount(),
    ]);

    const chain = this.chains.find((x) => x.id === chainId);
    if (!provider) throw new Error('provider is required.');

    return createWalletClient({
      account: account,
      chain: chain,
      transport: custom(provider),
    }) as any;
  }
}
