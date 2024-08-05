import { getDefaultChainsConfig } from '@/core/defaultConfig/getDefaultChainsConfig';
import { getDefaultWalletKitOptions } from '@/core/defaultConfig/getDefaultWalletKitOptions';
import { getGlobalData } from '@/core/globalData';
import { Action } from '@/ui/types';
import { useState, useMemo } from 'react';
import { Connector, useConfig } from 'wagmi';
import { WalletKitOptions, WalletKitContextProps, WalletKitContext } from './context';
import { DataSourceProvider } from '@/ui/components/DataSourceProvider';
import { ThemeVariant, ThemeMode } from '@/ui/components/ThemeProvider';
import { CustomTheme } from '@/ui/themes/base';

export interface WalletKitProviderProps {
  options?: WalletKitOptions;
  children: React.ReactNode;
  debugMode?: boolean;
  theme?: ThemeVariant;
  mode?: ThemeMode;
  customTheme?: CustomTheme;
}

export const WalletKitProvider = (props: WalletKitProviderProps) => {
  const {
    children,
    options = {},
    debugMode = false,
    theme = 'base',
    mode = 'light',
    customTheme,
  } = props;

  const [action, setAction] = useState<Action>();
  const [selectedConnector, setSelectedConnector] = useState<Connector>({} as Connector);

  const { chains } = useConfig();

  const value = useMemo(() => {
    const finalOptions = getDefaultWalletKitOptions(options ?? {});
    const finalChainsConfig = getDefaultChainsConfig(options, chains);

    const finalValue: WalletKitContextProps = {
      log: debugMode ? console.log : () => undefined,
      options: finalOptions,
      wallets: getGlobalData().wallets,
      chainsConfig: finalChainsConfig,
      action,
      setAction,
      selectedConnector,
      setSelectedConnector,
    };
    return finalValue;
  }, [options, chains, debugMode, action, selectedConnector]);

  const themeConfig = useMemo(() => {
    return {
      variant: theme,
      mode,
      customTheme,
    };
  }, [customTheme, mode, theme]);

  return (
    <WalletKitContext.Provider value={value}>
      <DataSourceProvider themeConfig={themeConfig}>{children}</DataSourceProvider>
    </WalletKitContext.Provider>
  );
};
