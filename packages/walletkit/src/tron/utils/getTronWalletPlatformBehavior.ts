import { getPlatform } from '@/core/utils/common';
import { TronWallet } from '../wallets';

export function getTronWalletPlatformBehavior(wallet: TronWallet) {
  const platform = getPlatform();
  const behavior = wallet.behaviors.find((e) => e.platforms.includes(platform));
  return behavior;
}
