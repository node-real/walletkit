import { ThemeProvider } from '../ThemeProvider';
import { useMemo, useState } from 'react';
import { EvmWalletProvider } from '@/evm/components/EvmWalletProvider';
import { SolanaWalletProvider } from '@/solana/components/SolanaWalletProvider';
import { Action, WalletKitConfig, WalletKitContext } from './context';
import { getDefaultConfig } from '../../configs/getDefaultConfig';
import { BaseWallet } from '@/core/configs/wallets/types';
import { ConnectModalProvider } from '@/core/modals/ConnectModal/provider';
import { ToastProvider } from '@/core/base/components/toast/ToastProvider';

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
      logger: debug ? console.log : () => undefined,
      action,
      setAction,
      selectedWallet,
      setSelectedWallet,
    };
  }, [action, config, debug, selectedWallet]);

  return (
    <WalletKitContext.Provider value={value}>
      <ToastProvider />

      <ThemeProvider mode={value.config.appearance!.mode} theme={value.config.appearance!.theme}>
        <EvmWalletProvider>
          <SolanaWalletProvider>
            <ConnectModalProvider>{children}</ConnectModalProvider>
          </SolanaWalletProvider>
        </EvmWalletProvider>
      </ThemeProvider>
    </WalletKitContext.Provider>
  );
}
