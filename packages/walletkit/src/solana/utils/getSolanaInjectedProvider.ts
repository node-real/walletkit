export type SolanaFlagType = 'isPhantom' | 'isTrust';

export function getSolanaInjectedProvider(flag: SolanaFlagType): any {
  if (typeof window === 'undefined' || typeof window.solana === 'undefined') return;

  return window.solana[flag] ? window.solana : undefined;
}

export function hasSolanaInjectedProvider(flag: SolanaFlagType): boolean {
  return Boolean(getSolanaInjectedProvider(flag));
}
