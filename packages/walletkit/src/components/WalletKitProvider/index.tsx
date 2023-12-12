import { ToastProvider } from '@/base/components/toast/ToastProvider';
import { getDefaultProviderOptions } from '@/defaultConfig/getDefaultProviderOptions';
import { getDefaultSupportedChains } from '@/defaultConfig/getDefaultSupportedChains';
import { useChains } from '@/hooks/useChains';
import { CustomTheme } from '@/themes/base';
import { useMemo, useState } from 'react';
import { Connector } from 'wagmi';
import { ModalProvider } from '../ModalProvider';
import { RouteProvider } from '../RouteProvider';
import { ThemeVariant, ThemeMode, ThemeProvider } from '../ThemeProvider';
import { WalletKitModal } from '../WalletKitModal';
import { WalletKitOptions, WalletKitContextProps, WalletKitContext, Action } from './context';

export interface WalletKitProviderProps {
  options: WalletKitOptions;
  children: React.ReactNode;
  debugMode?: boolean;
  theme?: ThemeVariant;
  mode?: ThemeMode;
  customTheme?: CustomTheme;
}

export const WalletKitProvider = (props: WalletKitProviderProps) => {
  const {
    children,
    options,
    debugMode = false,
    theme = 'base',
    mode = 'light',
    customTheme,
  } = props;

  const [action, setAction] = useState<Action>();
  const [selectedConnector, setSelectedConnector] = useState<Connector>({} as Connector);

  const chains = useChains();

  const value = useMemo(() => {
    const finalOptions = getDefaultProviderOptions(options);
    const finalChains = getDefaultSupportedChains(options, chains);

    const finalValue: WalletKitContextProps = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      log: debugMode ? console.log : () => {},
      options: finalOptions,
      supportedChains: finalChains,
      action,
      setAction,
      selectedConnector,
      setSelectedConnector,
    };
    return finalValue;
  }, [options, chains, debugMode, action, selectedConnector]);

  return (
    <WalletKitContext.Provider value={value}>
      {/* <WalletConnectUriProvider> */}
      <ThemeProvider variant={theme} mode={mode} customTheme={customTheme}>
        <RouteProvider>
          <ModalProvider>
            {children}
            <WalletKitModal />
            <ToastProvider />
          </ModalProvider>
        </RouteProvider>
      </ThemeProvider>
      {/* </WalletConnectUriProvider> */}
    </WalletKitContext.Provider>
  );
};
