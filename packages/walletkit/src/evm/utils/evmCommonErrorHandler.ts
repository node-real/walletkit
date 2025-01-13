import { isIOS, isMobile } from '@/core/base/utils/mobile';
import { binanceWallet, EvmWallet, EvmWalletBehavior, trustWallet } from '../wallets';
import { getWalletBehaviorOnPlatform } from '@/core/utils/common';

export function evmCommonErrorHandler(props: {
  log: any;
  handler: any;
  error: any;
  wallet: EvmWallet;
}) {
  const { log, handler, error } = props;

  const trustBehavior = getWalletBehaviorOnPlatform<EvmWalletBehavior>(trustWallet());
  const binanceBehavior = getWalletBehaviorOnPlatform<EvmWalletBehavior>(binanceWallet());

  let text = '';

  if (error) {
    if (error.code) {
      switch (error.code) {
        case 4902:
          // TODO
          if (isIOS() && trustBehavior?.isInstalled?.()) {
            text = 'Not supported chainId';
          }
          break;
      }
    }

    let description = text || error.cause?.message || error.message;
    if (description?.includes('Connection request reset')) {
      description = undefined;
    }
    if (description?.includes('[binance-w3w] User closed modal')) {
      description = 'Use rejected the request';
    }

    if (isMobile() && binanceBehavior?.isInstalled?.()) {
      if (
        description?.includes('Request failed: The JSON sent is not a valid Request object.') ||
        description?.includes('Adaptor not found: eip155')
      ) {
        description = 'Please update to the latest version of the Binance app and try again later.';
      }
    }

    log('[WalletError]', error);
    handler?.(error, description);
  }
}
