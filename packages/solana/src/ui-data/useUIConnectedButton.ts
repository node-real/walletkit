import { DataSource } from '@/ui/types';

export function useUIConnectedButton(): ReturnType<DataSource['useConnectedButton']> {
  return {
    chainName: '',
    chainLogo: null,
  };
}
