import { isIOS, isMobile } from '@/core/base/utils/mobile';
import { binanceWeb3Wallet, trustWallet } from '../wallets';

export function evmCommonErrorHandler(props: { log: any; handler: any; error: any }) {
  const { log, handler, error } = props;

  let text = '';

  if (error) {
    if (error.code) {
      switch (error.code) {
        case 4902:
          // TODO
          if (isIOS() && trustWallet().isInstalled()) {
            text = 'Not supported chainId';
          }
          break;
      }
    }

    let description = text || error.cause?.message || error.message;
    if (description?.includes('Connection request reset')) {
      description = undefined;
    }

    if (isMobile() && binanceWeb3Wallet().isInstalled()) {
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
