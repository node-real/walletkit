import { ThemeProvider } from '../ThemeProvider';
import { useMemo, useState } from 'react';
import { EvmWalletProvider } from '@/evm/components/EvmWalletProvider';
import { SolanaWalletProvider } from '@/solana/components/SolanaWalletProvider';
import { Action, WalletKitConfig, WalletKitContext } from './context';
import { getDefaultConfig } from '../../configs/getDefaultConfig';
import { ConnectModalProvider } from '@/core/modals/ConnectModal/provider';
import { ToastProvider } from '@/core/base/components/toast/ToastProvider';
import { BaseWallet } from '@/core/configs/types';
import { ProfileModalProvider } from '@/core/modals/ProfileModal/provider';

export interface WalletKitProviderProps {
  config: WalletKitConfig;
  children?: React.ReactNode;
}

export function WalletKitProvider(props: WalletKitProviderProps) {
  const { config, children } = props;

  const [action, setAction] = useState<Action>();
  const [selectedWallet, setSelectedWallet] = useState<BaseWallet>({} as BaseWallet);

  const initialWallets = useMemo(() => {
    const evmWallets = config.walletConfig?.evmConfig?.wallets ?? [];
    const solanaWallets = config.walletConfig?.solanaConfig?.wallets ?? [];
    return [...evmWallets, ...solanaWallets];
  }, [config.walletConfig?.evmConfig?.wallets, config.walletConfig?.solanaConfig?.wallets]);

  const [wallets, setWallets] = useState<BaseWallet[]>(initialWallets);

  const value = useMemo(() => {
    return {
      config: getDefaultConfig(config),
      logger: config.debug ? console.log : () => undefined,
      action,
      setAction,
      selectedWallet,
      setSelectedWallet,
      wallets,
      setWallets,
    };
  }, [action, config, selectedWallet, wallets]);

  return (
    <WalletKitContext.Provider value={value}>
      <ToastProvider />

      <ThemeProvider mode={value.config.appearance!.mode} theme={value.config.appearance!.theme}>
        <EvmWalletProvider>
          <SolanaWalletProvider>
            <ConnectModalProvider>
              <ProfileModalProvider>{children}</ProfileModalProvider>
            </ConnectModalProvider>
          </SolanaWalletProvider>
        </EvmWalletProvider>
      </ThemeProvider>
    </WalletKitContext.Provider>
  );
}
