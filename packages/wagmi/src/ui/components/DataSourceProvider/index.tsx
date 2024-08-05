import { ThemeProvider, ThemeProviderProps } from '../ThemeProvider';
import { ToastProvider } from '@/ui/base/components/toast/ToastProvider';
import { ConnectModalProvider } from '@/ui/modals/ConnectModal/provider';
import { ProfileModalProvider } from '@/ui/modals/ProfileModal/provider';
import { SwitchNetworkModalProvider } from '@/ui/modals/SwitchNetworkModal/provider';

export interface DataSourceProviderProps {
  children: React.ReactNode;
  themeConfig: Omit<ThemeProviderProps, 'children'>;
}

export function DataSourceProvider(props: DataSourceProviderProps) {
  const { children, themeConfig } = props;

  return (
    <ThemeProvider {...themeConfig}>
      <ToastProvider />

      <ConnectModalProvider>
        <SwitchNetworkModalProvider>
          <ProfileModalProvider>{children}</ProfileModalProvider>
        </SwitchNetworkModalProvider>
      </ConnectModalProvider>
    </ThemeProvider>
  );
}
