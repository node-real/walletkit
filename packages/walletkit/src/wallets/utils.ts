import type { InjectedProviderFlags, WindowProvider } from 'wagmi/window';

export function getInjectedProvider(flag: keyof InjectedProviderFlags): WindowProvider | undefined {
  if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') return;
  const providers = window.ethereum.providers;

  return providers
    ? providers.find((provider: WindowProvider) => provider[flag])
    : window.ethereum[flag]
      ? window.ethereum
      : undefined;
}

export function hasInjectedProvider(flag: keyof InjectedProviderFlags): boolean {
  return Boolean(getInjectedProvider(flag));
}
