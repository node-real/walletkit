import { DataSource } from '@node-real/walletkit-ui';

export function useConnectedButton(): ReturnType<DataSource['useConnectedButton']> {
  return {
    chainName: '',
    chainLogo: null,
  };
}
