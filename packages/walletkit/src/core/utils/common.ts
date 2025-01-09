import { isAndroid, isIOS, isPC, isTMA } from '../base/utils/mobile';
import { PlatformType } from '../configs/types';

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

export async function sleep(duration = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, duration);
  });
}

export async function openLink(uri?: string, target = '_self') {
  if (!uri) return;

  const finalTarget = isTMA() ? '_blank' : target;
  window.open(uri, finalTarget, 'noopener noreferrer');
}

export function getPlatform(): PlatformType {
  if (isTMA()) {
    if (isPC()) {
      return 'tg-pc';
    }
    if (isAndroid()) {
      return 'tg-android';
    }
    if (isIOS()) {
      return 'tg-ios';
    }
  } else {
    if (isPC()) {
      return 'browser-pc';
    }
    if (isAndroid()) {
      return 'browser-android';
    }
    if (isIOS()) {
      return 'browser-ios';
    }
  }
  return 'browser-pc';
}
