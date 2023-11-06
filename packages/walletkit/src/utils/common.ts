import { isTrustWallet } from '../wallets';
import { isIOS } from '../base/utils/mobile';

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

export function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item) && item !== null;
}

export function deepMerge(target: any, source: any) {
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return target;
}
