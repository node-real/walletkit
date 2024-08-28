import { isTMA } from '../base/utils/mobile';

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

export async function openUri(uri: string) {
  if (!uri) return;

  if (isTMA()) {
    import('@twa-dev/sdk').then((module) => {
      module.default.openLink(uri);
    });
  } else {
    window.open(uri, '_self', 'noopener noreferrer');
  }
}
