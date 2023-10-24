import { Connector } from 'wagmi';
import { WalletProps } from '../wallets';

export function useWalletConfig(connector: Connector): WalletProps {
  return connector._wallet;
}
