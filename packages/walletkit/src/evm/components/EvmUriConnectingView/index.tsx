import { CONNECT_STATUS } from '@/core/constants';
import { TemplateConnectingView } from '@/core/modals/ConnectModal/TemplateConnectingView';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useIsConnected } from '@/evm/hooks/useIsConnected';
import { EvmWallet, metaMask } from '@/evm/wallets';
import { openLink } from '@/core/utils/common';
import { useWalletConnectUri } from '@/evm/hooks/useWalletConnectUri';
import { useConnectingStatus } from '@/evm/hooks/useConnectingStatus';
import { useMetaMaskUri } from '@/evm/hooks/userMetaMaskUri';
import { useEffect, useRef } from 'react';

export function EvmUriConnectingView() {
  const { selectedWallet } = useWalletKit();
  const isConnected = useIsConnected();

  const { status, setStatus } = useConnectingStatus({
    initialStatus: CONNECT_STATUS.CONNECTING,
  });

  const { wcUri } = useWalletConnectUri({
    enabled: selectedWallet.id !== metaMask().id,
    refreshUriOnError: false,
  });

  const { metaMaskUri } = useMetaMaskUri({
    enabled: selectedWallet.id === metaMask().id,
  });

  const qrCodeUri =
    selectedWallet.id === metaMask().id
      ? metaMaskUri
      : wcUri
        ? (selectedWallet as EvmWallet).getUri?.(wcUri)
        : wcUri;

  const onConnect = () => {
    setStatus(CONNECT_STATUS.CONNECTING);
    if (selectedWallet.id !== metaMask().id) {
      openLink(qrCodeUri);
    }
  };

  const firstTimeRef = useRef(true);
  useEffect(() => {
    if (wcUri && firstTimeRef.current) {
      onConnect();
      firstTimeRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wcUri]);

  return (
    <TemplateConnectingView
      isConnected={isConnected}
      status={status}
      runConnect={() => undefined}
      onTryAgain={onConnect}
      wallet={selectedWallet}
    />
  );
}
