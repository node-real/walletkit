import { DataSource } from '@node-real/walletkit-ui';

export function useSwitchingConfig(): ReturnType<DataSource['useSwitchingConfig']> {
  return {
    chainsConfig: [],
    isPending: false,
    onClickSwitchChain: () => undefined,
  };
}
