export type EvmFlagType =
  | 'isBinance'
  | 'isBitEthereum'
  | 'isCoinbaseWallet'
  | 'isMathWallet'
  | 'isMetaMask'
  | 'isOkxWallet'
  | 'isTokenPocket'
  | 'isTrust';

export function getEvmInjectedProvider(flag: EvmFlagType): any {
  if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') return;
  const providers = window.ethereum.providers;

  return providers
    ? providers.find((provider: any) => provider[flag])
    : window.ethereum[flag]
      ? window.ethereum
      : undefined;
}

export function hasEvmInjectedProvider(flag: EvmFlagType): boolean {
  return Boolean(getEvmInjectedProvider(flag));
}
