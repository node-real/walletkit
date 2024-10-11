export function getTronInjectedProvider(flag: string): any {
  if (typeof window === 'undefined' || typeof window.tron === 'undefined') return;

  return window.tron[flag] ? window.tron : undefined;
}

export function hasTronInjectedProvider(flag: string): boolean {
  return Boolean(getTronInjectedProvider(flag));
}
