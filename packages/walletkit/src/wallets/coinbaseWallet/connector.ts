import { CoinbaseWalletConnector as WagmiCoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { hexValue } from 'ethers/lib/utils.js';
import { ProviderRpcError, SwitchChainError, UserRejectedRequestError } from 'wagmi';

export class CoinbaseWalletConnector extends WagmiCoinbaseWalletConnector {
  async switchChain(chainId: number) {
    const provider = await this.getProvider();
    const id = hexValue(chainId);

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id }],
      });
      return (
        this.chains.find((x) => x.id === chainId) ?? {
          id: chainId,
          name: `Chain ${id}`,
          network: `${id}`,
          nativeCurrency: { name: 'Ether', decimals: 18, symbol: 'ETH' },
          rpcUrls: { default: { http: [''] }, public: { http: [''] } },
        }
      );
    } catch (error) {
      const chain = this.chains.find((x) => x.id === chainId);
      if (!chain) {
        throw new Error(`Chain "${chainId}" not configured for connector "${this.id}".`);
      }

      // fix:
      // We found if there is no corresponding network in coinbaseWallet, error code is -32603
      // Indicates chain is not added to provider
      if (
        (error as ProviderRpcError).code === 4902 ||
        (error as ProviderRpcError).code === -32603
      ) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: id,
                chainName: chain.name,
                nativeCurrency: chain.nativeCurrency,
                rpcUrls: [chain.rpcUrls.public?.http[0] ?? ''],
                blockExplorerUrls: this.getBlockExplorerUrls(chain),
              },
            ],
          });
          return chain;
        } catch (error) {
          throw new UserRejectedRequestError(error as Error);
        }
      }

      throw new SwitchChainError(error as Error);
    }
  }
}
