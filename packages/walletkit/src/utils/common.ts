import { isIOS } from '@/base/utils/mobile';
import { isTrustWallet } from '@/wallets';

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

    log('[wallet error]', error);
    handler?.(error, description);
  }
}
