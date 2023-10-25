import { useMemo, useState } from 'react';
import { Connector } from 'wagmi';
import { ConnectMode, WalletKitContext, WalletKitContextProps, WalletKitOptions } from './context';
import { useDisclosure } from '../../hooks/useDisclosure';
import { useChains } from '../../hooks/useChains';
import { getDefaultProviderOptions } from '../../defaultConfig/getDefaultProviderOptions';
import { getDefaultSupportedChains } from '../../defaultConfig/getDefaultSupportedChains';
import { RouteProvider } from '../RouteProvider';
import { WalletKitModal } from '../WalletKitModal';
import { ThemeMode, ThemeProvider, ThemeVariant } from '../ThemeProvider';
import { ToastProvider } from '../base/toast/ToastProvider';
import { CustomTheme } from '../../themes/base';

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

  const [connectMode, setConnectMode] = useState<ConnectMode>('default');
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
      connectMode,
      setConnectMode,
      selectedConnector,
      setSelectedConnector,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      log: debugMode ? console.log : () => {},
    };
    return finalValue;
  }, [options, chains, isOpen, onOpen, onClose, connectMode, selectedConnector, debugMode]);

  return (
    <WalletKitContext.Provider value={value}>
      <ThemeProvider variant={theme} mode={mode} customTheme={customTheme}>
        <RouteProvider>
          {children}
          <WalletKitModal />
          <ToastProvider />
        </RouteProvider>
      </ThemeProvider>
    </WalletKitContext.Provider>
  );
};
