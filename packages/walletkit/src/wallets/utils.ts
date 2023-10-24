import { INJECTED_ID, injected } from './injected';
import { META_MASK_ID, metaMask } from './metaMask';
import { SAFE_ID, safe } from './safe';
import { TOKEN_POCKET_ID, tokenPocket } from './tokenPocket';
import { TRUST_WALLET_ID, trustWallet } from './trustWallet';
import { WalletProps } from './types';
import { WALLET_CONNECT_ID, walletConnect } from './walletConnect';

export function getWalletById(id: string, config?: WalletProps) {
  switch (id) {
    case INJECTED_ID:
      return injected(config);
    case META_MASK_ID:
      return metaMask(config);
    case SAFE_ID:
      return safe(config);
    case TOKEN_POCKET_ID:
      return tokenPocket(config);
    case TRUST_WALLET_ID:
      return trustWallet(config);
    case WALLET_CONNECT_ID:
      return walletConnect(config);
    default:
      return injected(config);
  }
}
