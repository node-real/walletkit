import { useMemo, useState } from 'react';
import { Connector } from 'wagmi';
import { ConnectMode, WalletKitContext, WalletKitContextProps, WalletKitOptions } from './context';
import { useDisclosure } from '../../hooks/useDisclosure';
import { useChains } from '../../hooks/useChains';
import { getDefaultProviderOptions } from '../../defaultConfig/getDefaultProviderOptions';
import { getDefaultSupportedChains } from '../../defaultConfig/getDefaultSupportedChains';
import { RouteProvider } from '../RouteProvider';
import { WalletKitModal } from '../WalletKitModal';
import { ThemeProvider } from '../ThemeProvider';
import { getDefaultTheme } from '../../defaultConfig/getDefaultTheme';
import { Theme } from '../../themes';
import { ToastProvider } from '../toast/ToastProvider';

export interface WalletKitProviderProps {
  options: WalletKitOptions;
  children: any;
  debugMode?: boolean;
  // theme?: 'auto';
  // mode?: 'auto';
  customTheme?: Theme;
}

export const WalletKitProvider = (props: WalletKitProviderProps) => {
  const { children, options, debugMode = false, customTheme } = props;

  const [connectMode, setConnectMode] = useState<ConnectMode>('default');
  const [selectedConnector, setSelectedConnector] = useState<Connector>({} as Connector);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const chains = useChains();

  const value = useMemo(() => {
    const finalOptions = getDefaultProviderOptions(options, chains);
    const finalChains = getDefaultSupportedChains(options, chains);
    const finalTheme = getDefaultTheme(customTheme);

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
      customTheme: finalTheme,
    };
    return finalValue;
  }, [
    options,
    chains,
    customTheme,
    isOpen,
    onOpen,
    onClose,
    connectMode,
    selectedConnector,
    debugMode,
  ]);

  return (
    <WalletKitContext.Provider value={value}>
      <RouteProvider>
        <ThemeProvider>
          {children}
          <WalletKitModal />
          <ToastProvider />
        </ThemeProvider>
      </RouteProvider>
    </WalletKitContext.Provider>
  );
};
