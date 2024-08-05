export function getInjectedProvider(flag: string): any {
  if (typeof window === 'undefined' || typeof window.solana === 'undefined') return;

  return window.solana[flag] ? window.solana : undefined;
}

export function hasInjectedProvider(flag: string): boolean {
  return Boolean(getInjectedProvider(flag));
}
