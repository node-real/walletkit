import { ToastProvider } from '@/base/components/toast/ToastProvider';
import { CustomTheme } from '@/themes/base';
import { useMemo, useState } from 'react';
import { Connector, useAccount, useConfig } from 'wagmi';
import { ThemeVariant, ThemeMode, ThemeProvider } from '../ThemeProvider';
import {
  WalletKitOptions,
  WalletKitContextProps,
  WalletKitContext,
  Action,
  useWalletKit,
} from './context';
import { useResponsive } from '@/base/hooks/useResponsive';
import { getDefaultWalletKitOptions } from '@/defaultConfig/getDefaultWalletKitOptions';
import { getDefaultChainsConfig } from '@/defaultConfig/getDefaultChainsConfig';
import { ConnectModalProvider } from '@/modals/ConnectModal/provider';
import { getGlobalData } from '@/globalData';
import { ProfileModalProvider } from '@/modals/ProfileModal/provider';
import { SwitchNetworkModalProvider } from '@/modals/SwitchNetworkModal/provider';
import { useRouter } from '@/modals/ConnectModal/RouteProvider/context';

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

  const { chains } = useConfig();
  const { isMobileLayout } = useResponsive();

  const context = useMemo(() => {
    const finalOptions = getDefaultWalletKitOptions(options);
    const finalChainsConfig = getDefaultChainsConfig(options, chains);

    const finalValue: WalletKitContextProps = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      log: debugMode ? console.log : () => {},
      options: finalOptions,
      wallets: getGlobalData().wallets,
      chainsConfig: finalChainsConfig,
      isMobileLayout,
      action,
      setAction,
      selectedConnector,
      setSelectedConnector,
    };
    return finalValue;
  }, [options, chains, debugMode, isMobileLayout, action, selectedConnector]);

  return (
    <WalletKitContext.Provider value={context}>
      <ThemeProvider variant={theme} mode={mode} customTheme={customTheme}>
        <ToastProvider />

        <ConnectModalProvider>
          <SwitchNetworkModalProvider>
            <ProfileModalProvider>
              {children}
              <Log />
            </ProfileModalProvider>
          </SwitchNetworkModalProvider>
        </ConnectModalProvider>
      </ThemeProvider>
    </WalletKitContext.Provider>
  );
};

function Log() {
  const { address, isConnected, isConnecting, isDisconnected, isReconnecting, connector, chainId } =
    useAccount();

  const { log, options, ...restProps } = useWalletKit();
  const route = useRouter();

  const logObj = {
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    isReconnecting,
    chainId,
    connectorId: connector?.id,
    connectorName: connector?.name,
    route: route.route,
    _options: options,
    _context: { ...restProps },
  };
  log(`[walletkit log]`, logObj);

  return null;
}
