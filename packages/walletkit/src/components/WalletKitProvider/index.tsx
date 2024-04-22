import { ToastProvider } from '@/base/components/toast/ToastProvider';
import { getDefaultProviderOptions } from '@/defaultConfig/getDefaultProviderOptions';
import { getDefaultSupportedChains } from '@/defaultConfig/getDefaultSupportedChains';
import { useChains } from '@/hooks/useChains';
import { CustomTheme } from '@/themes/base';
import { useMemo, useState } from 'react';
import { Connector } from 'wagmi';
import { ThemeVariant, ThemeMode, ThemeProvider } from '../ThemeProvider';
import { WalletKitOptions, WalletKitContextProps, WalletKitContext, Action } from './context';
import { useResponsive } from '@/base/hooks/useResponsive';
import { SwitchNetworkProvider } from '../SwitchNetworkModal/SwitchNetworkProvider';
import { ProfileModalProvider } from '../ProfileModal/ProfileModalProvider';
import { WalletKitModalProvider } from '../WalletKitModal/WalletKitModalProvider';
import { RouteProvider } from '../RouteProvider';
import { WalletKitModal } from '../WalletKitModal';
import { ProfileModal } from '../ProfileModal';

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
  const { isMobileLayout } = useResponsive();

  const context = useMemo(() => {
    const finalOptions = getDefaultProviderOptions(options);
    const finalChains = getDefaultSupportedChains(options, chains);

    const finalValue: WalletKitContextProps = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      log: debugMode ? console.log : () => {},
      options: finalOptions,
      supportedChains: finalChains,
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
        <RouteProvider>
          <SwitchNetworkProvider>
            <ProfileModalProvider>
              <WalletKitModalProvider>
                {children}
                {!context.options.hideInnerModal && <WalletKitModal />}
                {!context.options.hideInnerModal && <ProfileModal />}
              </WalletKitModalProvider>
            </ProfileModalProvider>
          </SwitchNetworkProvider>
        </RouteProvider>
      </ThemeProvider>
    </WalletKitContext.Provider>
  );
};
