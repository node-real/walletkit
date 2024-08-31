import { CONNECT_STATUS } from '@/core/constants';
import { TemplateConnectingView } from '@/core/modals/ConnectModal/TemplateConnectingView';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useIsConnected } from '@/evm/hooks/useIsConnected';
import { useWalletConnector } from '@/evm/hooks/useWalletConnector';
import { useCallback } from 'react';
import { useConnectingStatus } from '@/evm/hooks/useConnectingStatus';

export function EvmConnectingView() {
  const { selectedWallet } = useWalletKit();
  const isConnected = useIsConnected();
  const selectedConnector = useWalletConnector(selectedWallet.id);

  const { connect, status, setStatus } = useConnectingStatus();

  const runConnect = useCallback(() => {
    if (!selectedWallet.isInstalled()) return;

    if (selectedConnector) {
      setStatus(CONNECT_STATUS.CONNECTING);
      connect({ connector: selectedConnector });
    } else {
      setStatus(CONNECT_STATUS.UNAVAILABLE);
    }
  }, [connect, selectedConnector, selectedWallet, setStatus]);

  return (
    <TemplateConnectingView
      status={status}
      runConnect={runConnect}
      onTryAgain={runConnect}
      wallet={selectedWallet}
      isConnected={isConnected}
    />
  );
}
