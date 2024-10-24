export function getEvmInjectedProvider(flag: string): any {
  if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') return;
  const providers = window.ethereum.providers;

  return providers
    ? providers.find((provider: any) => provider[flag])
    : window.ethereum[flag]
      ? window.ethereum
      : undefined;
}

export function hasEvmInjectedProvider(flag: string): boolean {
  return Boolean(getEvmInjectedProvider(flag));
}
