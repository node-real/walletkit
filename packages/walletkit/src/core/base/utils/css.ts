export function cx(...classNames: Array<string | undefined>) {
  if (!classNames.length) return;
  return classNames.filter(Boolean).join(' ');
}

export function cssVar(name: string, type = 'colors') {
  return `var(--wk-${type}-${name.replace(/\./g, '-')})`;
}

export function rgba(
  firstValue: number | string,
  secondValue?: number,
  thirdValue?: number,
  fourthValue = 1,
): string {
  if (typeof firstValue === 'string') {
    if (firstValue.startsWith('#')) {
      const hexStr = firstValue.slice(1);
      const formatStr = hexStr.length === 3 ? hexStr.replace(/[A-F\d]/gi, '$&$&') : hexStr;
      const hexArr = formatStr.match(/.{2}/g)?.map((v) => parseInt(v, 16));

      if (hexArr?.length === 3) {
        return rgba(hexArr[0], hexArr[1], hexArr[2], secondValue);
      }
    }
  }

  return `rgba(${firstValue}, ${secondValue}, ${thirdValue}, ${fourthValue})`;
}
