import { DataSource } from '@/ui/types';

export function useUISwitchingConfig(): ReturnType<DataSource['useSwitchingConfig']> {
  return {
    chainsConfig: [],
    isPending: false,
    onClickSwitchChain: () => undefined,
  };
}
