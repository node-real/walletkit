export function getSolanaInjectedProvider(flag: string): any {
  if (typeof window === 'undefined' || typeof window.solana === 'undefined') return;

  return window.solana[flag] ? window.solana : undefined;
}

export function hasSolanaInjectedProvider(flag: string): boolean {
  return Boolean(getSolanaInjectedProvider(flag));
}
