import { WalletProps } from '@/wallets';
import { Connector } from 'wagmi';

export function useWalletConfig(connector: Connector): WalletProps {
  return connector._wallet;
}
