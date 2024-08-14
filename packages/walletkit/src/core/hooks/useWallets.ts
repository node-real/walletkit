import { BaseWallet, WalletType } from '../configs/wallets/types';
import { useWalletSetting } from '../providers/WalletKitProvider/context';

export function useWallets(walletType?: WalletType) {
  const { evm, solana } = useWalletSetting();

  const evmWallets = evm?.wallets ?? [];
  const solanaWallets = solana?.wallets ?? [];

  const wallets: BaseWallet[] = [...evmWallets, ...solanaWallets];

  if (walletType) {
    return {
      wallets: wallets.filter((item) => item.walletType === walletType),
    };
  }

  return {
    wallets,
  };
}
