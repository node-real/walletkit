import { useMemo, useState } from 'react';
import { Connector } from 'wagmi';
import { ConnectRole, WalletKitContext, WalletKitContextProps, WalletKitOptions } from './context';
import { useChains } from '../../hooks/useChains';
import { getDefaultProviderOptions } from '../../defaultConfig/getDefaultProviderOptions';
import { getDefaultSupportedChains } from '../../defaultConfig/getDefaultSupportedChains';
import { RouteProvider } from '../RouteProvider';
import { WalletKitModal } from '../WalletKitModal';
import { ThemeMode, ThemeProvider, ThemeVariant } from '../ThemeProvider';
import { ToastProvider } from '../../base/components/toast/ToastProvider';
import { CustomTheme } from '../../themes/base';
import { WalletConnectUriProvider } from '../WalletConnectUriProvider';
import { ModalProvider } from '../ModalProvider';

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

  const [connectRole, setConnectRole] = useState<ConnectRole>('default');
  const [selectedConnector, setSelectedConnector] = useState<Connector>({} as Connector);

  const chains = useChains();

  const value = useMemo(() => {
    const finalOptions = getDefaultProviderOptions(options, chains);
    const finalChains = getDefaultSupportedChains(options, chains);

    const finalValue: WalletKitContextProps = {
      options: finalOptions,
      supportedChains: finalChains,
      connectRole,
      setConnectRole,
      selectedConnector,
      setSelectedConnector,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      log: debugMode ? console.log : () => {},
    };
    return finalValue;
  }, [options, chains, connectRole, selectedConnector, debugMode]);

  return (
    <WalletKitContext.Provider value={value}>
      <ThemeProvider variant={theme} mode={mode} customTheme={customTheme}>
        <RouteProvider>
          <ModalProvider>
            <WalletConnectUriProvider>
              {children}
              <WalletKitModal />
              <ToastProvider />
            </WalletConnectUriProvider>
          </ModalProvider>
        </RouteProvider>
      </ThemeProvider>
    </WalletKitContext.Provider>
  );
};
