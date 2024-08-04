import { DataSource, DataSourceProvider, DataSourceProviderProps } from '@node-real/walletkit-ui';
import { useWalletKit } from '../WalletKitProvider/context';
import { useAccountInfo } from './hooks/useAccountInfo';
import { useChainInfo } from './hooks/useChainInfo';
import { useConnectedButton } from './hooks/useConnectedButton';
import { useConnectingView } from './hooks/useConnectingView';
import { useConnectorsView } from './hooks/useConnectorsView';
import { useConnectWithQRCodeView } from './hooks/useConnectWithQRCodeView';
import { useDisconnectButton } from './hooks/useDisconnectButton';
import { useProviderConfig } from './hooks/useProviderConfig';
import { useSwitchingConfig } from './hooks/useSwitchingConfig';
import { useMemo } from 'react';

export interface ContentProps extends Omit<DataSourceProviderProps, 'dataSource'> {
  children: React.ReactNode;
}

export function Content(props: ContentProps) {
  const { children, ...restProps } = props;

  const { wallets, options, action, setAction, log } = useWalletKit();

  const dataSource: DataSource = useMemo(() => {
    return {
      options,
      wallets,
      action,
      setAction,
      log,

      useProvider: useProviderConfig,
      useAccount: useAccountInfo,
      useChain: useChainInfo,

      useConnectedButton,
      useDisconnectButton,

      useConnectWithQRCodeView,
      useConnectingView,
      useConnectorsView,

      useSwitchingConfig,
    };
  }, [action, log, options, setAction, wallets]);

  return (
    <DataSourceProvider {...restProps} dataSource={dataSource}>
      {children}
    </DataSourceProvider>
  );
}
