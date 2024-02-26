import { isIOS } from '@/base/utils/mobile';
import { isBinanceWeb3Wallet, isTrustWallet } from '@/wallets';

export function mergeList(list1: any[] = [], list2: any[] = []) {
  const result: any[] = [...list1];

  list2.forEach((item) => {
    const index = list1.findIndex((e) => e.id === item.id);
    if (index > -1) {
      result[index] = {
        ...result[index],
        ...item,
      };
    } else {
      result.push({
        ...item,
      });
    }
  });

  return result;
}

export function commonErrorHandler(props: { log: any; handler: any; error: any }) {
  const { log, handler, error } = props;

  let text = '';

  if (error) {
    if (error.code) {
      switch (error.code) {
        case 4902:
          // TODO
          if (isIOS() && isTrustWallet()) {
            text = 'Not supported chainId';
          }
          break;
      }
    }

    let description = text || error.cause?.message || error.message;
    if (description?.includes('Connection request reset')) {
      description = undefined;
    }

    if (isBinanceWeb3Wallet()) {
      if (
        description?.includes('Request failed: The JSON sent is not a valid Request object.') ||
        description?.includes('Adaptor not found: eip155')
      ) {
        description = 'Please update to the latest version of the Binance app and try again later.';
      }
    }

    log('[wallet error]', error);
    handler?.(error, description);
  }
}

export async function sleep(duration = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, duration);
  });
}
