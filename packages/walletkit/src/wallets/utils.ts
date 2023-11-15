import { INJECTED_ID, injected } from './injected';
import { META_MASK_ID, metaMask } from './metaMask';
import { SAFE_ID, safe } from './safe';
import { TOKEN_POCKET_ID, tokenPocket } from './tokenPocket';
import { TRUST_WALLET_ID, trustWallet } from './trustWallet';
import { WalletProps } from './types';
import { WALLET_CONNECT_ID, walletConnect } from './walletConnect';
import type { InjectedProviderFlags, WindowProvider } from 'wagmi/window';

export function getInjectedProvider(flag: keyof InjectedProviderFlags): WindowProvider | undefined {
  if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') return;
  const providers = window.ethereum.providers;

  return providers
    ? providers.find((provider: WindowProvider) => provider[flag])
    : window.ethereum[flag]
    ? window.ethereum
    : undefined;
}

export function hasInjectedProvider(flag: keyof InjectedProviderFlags): boolean {
  return Boolean(getInjectedProvider(flag));
}

export function getWalletById(id: string, config?: WalletProps) {
  const wallet =
    {
      [INJECTED_ID]: injected,
      [META_MASK_ID]: metaMask,
      [SAFE_ID]: safe,
      [TOKEN_POCKET_ID]: tokenPocket,
      [TRUST_WALLET_ID]: trustWallet,
      [WALLET_CONNECT_ID]: walletConnect,
    }[id] ?? injected;

  return wallet(config);
}
