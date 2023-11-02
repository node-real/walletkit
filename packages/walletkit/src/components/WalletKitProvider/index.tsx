import { useMemo, useState } from 'react';
import { Connector } from 'wagmi';
import { ConnectRole, WalletKitContext, WalletKitContextProps, WalletKitOptions } from './context';
import { useDisclosure } from '../../hooks/useDisclosure';
import { useChains } from '../../hooks/useChains';
import { getDefaultProviderOptions } from '../../defaultConfig/getDefaultProviderOptions';
import { getDefaultSupportedChains } from '../../defaultConfig/getDefaultSupportedChains';
import { RouteProvider } from '../RouteProvider';
import { WalletKitModal } from '../WalletKitModal';
import { ThemeMode, ThemeProvider, ThemeVariant } from '../ThemeProvider';
import { ToastProvider } from '../base/toast/ToastProvider';
import { CustomTheme } from '../../themes/base';
import { WalletConnectUriProvider } from '../WalletConnectUriProvider';

export interface WalletKitProviderProps {
  options: WalletKitOptions;
  children: any;
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const chains = useChains();

  const value = useMemo(() => {
    const finalOptions = getDefaultProviderOptions(options, chains);
    const finalChains = getDefaultSupportedChains(options, chains);

    const finalValue: WalletKitContextProps = {
      options: finalOptions,
      supportedChains: finalChains,
      isOpen,
      onOpen,
      onClose,
      connectRole,
      setConnectRole,
      selectedConnector,
      setSelectedConnector,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      log: debugMode ? console.log : () => {},
    };
    return finalValue;
  }, [options, chains, isOpen, onOpen, onClose, connectRole, selectedConnector, debugMode]);

  return (
    <WalletKitContext.Provider value={value}>
      <ThemeProvider variant={theme} mode={mode} customTheme={customTheme}>
        <RouteProvider>
          <WalletConnectUriProvider>
            {children}
            <WalletKitModal />
            <ToastProvider />
          </WalletConnectUriProvider>
        </RouteProvider>
      </ThemeProvider>
    </WalletKitContext.Provider>
  );
};
