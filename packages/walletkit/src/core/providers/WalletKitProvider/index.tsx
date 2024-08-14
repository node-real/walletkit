import { ThemeProvider } from '../ThemeProvider';
import { useMemo, useState } from 'react';
import { EvmWalletProvider } from '@/evm/components/EvmWalletProvider';
import { SolanaWalletProvider } from '@/solana/components/SolanaWalletProvider';
import { Action, WalletKitConfig, WalletKitContext } from './context';
import { getDefaultConfig } from '../../configs/getDefaultConfig';
import { BaseWallet } from '@/core/configs/wallets/types';

export interface WalletKitProviderProps {
  config: WalletKitConfig;
  children?: React.ReactNode;
  debug?: boolean;
}

export function WalletKitProvider(props: WalletKitProviderProps) {
  const { config, debug = false, children } = props;

  const [action, setAction] = useState<Action>();
  const [selectedWallet, setSelectedWallet] = useState<BaseWallet>({} as BaseWallet);

  const value = useMemo(() => {
    return {
      config: getDefaultConfig(config),
      log: debug ? console.log : () => undefined,
      action,
      setAction,
      selectedWallet,
      setSelectedWallet,
    };
  }, [action, config, debug, selectedWallet]);

  return (
    <WalletKitContext.Provider value={value}>
      <ThemeProvider mode={value.config.appearance.mode} theme={value.config.appearance.theme}>
        <EvmWalletProvider>
          <SolanaWalletProvider>{children}</SolanaWalletProvider>
        </EvmWalletProvider>
      </ThemeProvider>
    </WalletKitContext.Provider>
  );
}
