import { metaMask, safe, trustWallet, walletConnect, WalletProps } from '@/wallets/index';

export const getDefaultWallets = () => {
  const shouldUseSafeConnector = !(typeof window === 'undefined') && window?.parent !== window;

  let wallets: WalletProps[] = [];

  // If we're in an iframe, include the SafeConnector
  if (shouldUseSafeConnector) {
    wallets = [...wallets, safe()];
  }

  wallets = [...wallets, trustWallet(), metaMask(), walletConnect()];

  return wallets;
};
