export function getInjectedSolanaProvider(flag: string): any {
  if (typeof window === 'undefined' || typeof window.solana === 'undefined') return;

  return window.solana[flag] ? window.solana : undefined;
}

export function hasInjectedSolanaProvider(flag: string): boolean {
  return Boolean(getInjectedSolanaProvider(flag));
}
