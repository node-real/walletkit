import { getPlatform } from '@/core/utils/common';
import { EvmWallet } from '../wallets';

export function getEvmWalletPlatformBehavior(wallet: EvmWallet) {
  const platform = getPlatform();
  const behavior = wallet.behaviors.find((e) => e.platforms.includes(platform));
  return behavior;
}
