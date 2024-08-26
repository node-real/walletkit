export function getInjectedEvmProvider(flag: string): any {
  if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') return;
  const providers = window.ethereum.providers;

  return providers
    ? providers.find((provider: any) => provider[flag])
    : window.ethereum[flag]
      ? window.ethereum
      : undefined;
}

export function hasInjectedEvmProvider(flag: string): boolean {
  return Boolean(getInjectedEvmProvider(flag));
}
