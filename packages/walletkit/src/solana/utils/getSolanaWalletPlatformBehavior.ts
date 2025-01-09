import { getPlatform } from '@/core/utils/common';
import { SolanaWallet } from '../wallets';

export function getSolanaWalletPlatformBehavior(wallet: SolanaWallet) {
  const platform = getPlatform();
  const behavior = wallet.behaviors.find((e) => e.platforms.includes(platform));
  return behavior;
}
