export function getInjectedProvider(flag: any): any {
  if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') return;
  const providers = window.ethereum.providers;

  return providers
    ? providers.find((provider: any) => provider[flag])
    : (window.ethereum as any)[flag]
      ? window.ethereum
      : undefined;
}

export function hasInjectedProvider(flag: any): boolean {
  return Boolean(getInjectedProvider(flag));
}
