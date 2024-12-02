import { ThemeProvider, ThemeProviderProps } from '../ThemeProvider';
import { useMemo, useState } from 'react';
import { EvmWalletProvider } from '@/evm/components/EvmWalletProvider';
import { SolanaWalletProvider } from '@/solana/components/SolanaWalletProvider';
import { Action, WalletKitConfig, WalletKitContext } from './context';
import { getDefaultConfig } from '../../configs/getDefaultConfig';
import { ConnectModalProvider } from '@/core/modals/ConnectModal/provider';
import { ToastProvider } from '@/core/base/components/toast/ToastProvider';
import { BaseWallet } from '@/core/configs/types';
import { ProfileModalProvider } from '@/core/modals/ProfileModal/provider';
import { TronWalletProvider } from '@/tron/components/TronWalletProvider';
import { Buffer } from 'buffer';

export interface WalletKitProviderProps {
  config: WalletKitConfig;
  children?: React.ReactNode;
  debugMode?: boolean;
  theme?: ThemeProviderProps['theme'];
  mode?: ThemeProviderProps['mode'];
}

export function WalletKitProvider(props: WalletKitProviderProps) {
  const { config, children, theme, mode, debugMode = false } = props;

  useMemo(() => {
    if (typeof window !== 'undefined') {
      window.Buffer = window.Buffer || Buffer;
    }
  }, []);

  const finalConfig = useMemo(() => {
    const finalConfig = getDefaultConfig(config);

    const wallets: BaseWallet[] = [];
    const evmWallets = finalConfig.evmConfig?.wallets;
    const solanaWallets = finalConfig.solanaConfig?.wallets;
    const tronWallets = finalConfig.tronConfig?.wallets;

    if (evmWallets) wallets.push(...evmWallets);
    if (solanaWallets) wallets.push(...solanaWallets);
    if (tronWallets) wallets.push(...tronWallets);

    return {
      ...finalConfig,
      wallets,
    };
  }, [config]);

  const [action, setAction] = useState<Action>();
  const [selectedWallet, setSelectedWallet] = useState<BaseWallet>({} as BaseWallet);

  const [wallets, setWallets] = useState<BaseWallet[]>(finalConfig.wallets);

  const value = useMemo(() => {
    return {
      ...finalConfig,
      log: debugMode ? console.log : () => undefined,

      action,
      setAction,

      selectedWallet,
      setSelectedWallet,

      wallets,
      setWallets,
    };
  }, [action, debugMode, finalConfig, selectedWallet, wallets]);

  return (
    <WalletKitContext.Provider value={value}>
      <ThemeProvider mode={mode} theme={theme}>
        <ToastProvider />

        <EvmWalletProvider>
          <SolanaWalletProvider>
            <TronWalletProvider>
              <ConnectModalProvider>
                <ProfileModalProvider>{children}</ProfileModalProvider>
              </ConnectModalProvider>
            </TronWalletProvider>
          </SolanaWalletProvider>
        </EvmWalletProvider>
      </ThemeProvider>
    </WalletKitContext.Provider>
  );
}
