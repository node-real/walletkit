import { WalletProps, phantomWallet, trustWallet, walletConnect } from '@/wallets';

export const getDefaultWallets = () => {
  const wallets: WalletProps[] = [trustWallet(), phantomWallet(), walletConnect()];
  return wallets;
};
