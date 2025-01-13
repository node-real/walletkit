export type TronFlagType = 'isTronLink';

export function getTronInjectedProvider(flag: TronFlagType): any {
  if (typeof window === 'undefined' || typeof window.tron === 'undefined') return;

  return window.tron[flag] ? window.tron : undefined;
}

export function hasTronInjectedProvider(flag: TronFlagType): boolean {
  return Boolean(getTronInjectedProvider(flag));
}
