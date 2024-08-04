import { useResponsive } from '@/base/hooks/useResponsive';
import { DataSource, DataSourceContext } from './context';
import { ConnectModalProvider } from '@/modals/ConnectModal/provider';
import { SwitchNetworkModalProvider } from '@/modals/SwitchNetworkModal/provider';
import { ProfileModalProvider } from '@/modals/ProfileModal/provider';
import { ThemeProvider, ThemeProviderProps } from '../ThemeProvider';
import { ToastProvider } from '@/base/components/toast/ToastProvider';

export interface DataSourceProviderProps {
  children: React.ReactNode;
  themeConfig: Omit<ThemeProviderProps, 'children'>;
  dataSource: DataSource;
}

export function DataSourceProvider(props: DataSourceProviderProps) {
  const { children, themeConfig, dataSource } = props;

  const { isMobileLayout } = useResponsive();

  const value = {
    isMobileLayout,
    ...dataSource,
  };

  return (
    <ThemeProvider {...themeConfig}>
      <ToastProvider />

      <DataSourceContext.Provider value={value}>
        <ConnectModalProvider>
          <SwitchNetworkModalProvider>
            <ProfileModalProvider>{children}</ProfileModalProvider>
          </SwitchNetworkModalProvider>
        </ConnectModalProvider>
      </DataSourceContext.Provider>
    </ThemeProvider>
  );
}
