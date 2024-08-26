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

  const finalConfig = useMemo(() => {
    const finalConfig = getDefaultConfig(config);

    const wallets: BaseWallet[] = [];
    const evmWallets = finalConfig.walletConfig.evmConfig?.wallets;
    const solanaWallets = finalConfig.walletConfig.solanaConfig?.wallets;

    if (evmWallets) wallets.push(...evmWallets);
    if (solanaWallets) wallets.push(...solanaWallets);

    return {
      appearance: finalConfig.appearance,
      eventConfig: finalConfig.eventConfig,
      walletConfig: finalConfig.walletConfig,
      wallets,
    };
  }, [config]);

  const [action, setAction] = useState<Action>();
  const [selectedWallet, setSelectedWallet] = useState<BaseWallet>({} as BaseWallet);

  const [wallets, setWallets] = useState<BaseWallet[]>(finalConfig.wallets);

  const value = useMemo(() => {
    return {
      ...finalConfig,
      logger: config.debug ? console.log : () => undefined,

      action,
      setAction,

      selectedWallet,
      setSelectedWallet,

      wallets,
      setWallets,
    };
  }, [action, config.debug, finalConfig, selectedWallet, wallets]);

  return (
    <WalletKitContext.Provider value={value}>
      <ToastProvider />

      <ThemeProvider mode={value.appearance!.mode} theme={value.appearance!.theme}>
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
