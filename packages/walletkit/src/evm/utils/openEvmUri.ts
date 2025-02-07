import { getWalletBehaviorOnPlatform, openLink } from '@/core/utils/common';
import { getEvmGlobalData } from '../globalData';
import { EvmWallet, EvmWalletBehavior } from '../wallets';

export function openEvmUri(selectedWallet: EvmWallet) {
  const behavior = getWalletBehaviorOnPlatform<EvmWalletBehavior>(selectedWallet);
  const wcUri = getEvmGlobalData().globalWcUri;

  if (wcUri) {
    const qrCodeUri = behavior?.getUri?.(wcUri);
    if (qrCodeUri) {
      openLink(qrCodeUri);
    }
  }
}
