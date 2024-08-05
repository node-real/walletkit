import {
  ConnectionProvider,
  WalletProvider,
  WalletProviderProps,
} from '@solana/wallet-adapter-react';

import { useCallback, useMemo, useState } from 'react';
import { WalletKitOptions, WalletKitContextProps, WalletKitContext } from './context';
import { getDefaultWalletKitOptions } from '@/core/defaultConfig/getDefaultWalletKitOptions';
import { getGlobalData } from '@/core/globalData';
import { defaultSolanaConfig } from '@/core/defaultConfig/defaultSolanaConfig';
import { WalletProps } from '@/wallets';
import { EventEmitter } from '@/core/utils/eventEmitter';
import { DataSourceProvider } from '@/ui/components/DataSourceProvider';
import { ThemeVariant, ThemeMode } from '@/ui/components/ThemeProvider';
import { CustomTheme } from '@/ui/themes/base';
import { Action } from '@/ui/types';

export interface WalletKitProviderProps {
  options?: WalletKitOptions;
  children: React.ReactNode;
  debugMode?: boolean;
  theme?: ThemeVariant;
  mode?: ThemeMode;
  customTheme?: CustomTheme;
  config: ReturnType<typeof defaultSolanaConfig>;
}

export const WalletKitProvider = (props: WalletKitProviderProps) => {
  const {
    children,
    options,
    config,
    debugMode = false,
    theme = 'base',
    mode = 'light',
    customTheme,
  } = props;

  const [action, setAction] = useState<Action>();
  const [selectedWallet, setSelectedWallet] = useState<WalletProps>({} as WalletProps);

  const value = useMemo(() => {
    const finalOptions = getDefaultWalletKitOptions(options ?? {});

    const finalValue: WalletKitContextProps = {
      log: debugMode ? console.log : () => undefined,
      options: finalOptions,
      wallets: getGlobalData().wallets,

      action,
      setAction,

      selectedWallet,
      setSelectedWallet,

      rpcUrl: config.rpcUrl,
      adapters: config.adapters,
      autoConnect: config.autoConnect,
    };
    return finalValue;
  }, [
    options,
    debugMode,
    action,
    selectedWallet,
    config.rpcUrl,
    config.adapters,
    config.autoConnect,
  ]);

  const themeConfig = useMemo(() => {
    return {
      variant: theme,
      mode,
      customTheme,
    };
  }, [customTheme, mode, theme]);

  const onError = useCallback<Required<WalletProviderProps>['onError']>((error) => {
    EventEmitter.emit(EventEmitter.WalletError, error);
  }, []);

  return (
    <WalletKitContext.Provider value={value}>
      <ConnectionProvider endpoint={value.rpcUrl}>
        <WalletProvider wallets={value.adapters} onError={onError} autoConnect={value.autoConnect}>
          <DataSourceProvider themeConfig={themeConfig}>{children}</DataSourceProvider>
        </WalletProvider>
      </ConnectionProvider>
    </WalletKitContext.Provider>
  );
};
