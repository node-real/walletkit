import { CONNECT_STATUS } from '@/core/constants';
import { TemplateConnectingView } from '@/core/modals/ConnectModal/TemplateConnectingView';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useIsConnected } from '@/evm/hooks/useIsConnected';
import { EvmWallet } from '@/evm/wallets';
import { openLink } from '@/core/utils/common';
import { useWalletConnectUri } from '@/evm/hooks/useWalletConnectUri';
import { useConnectingStatus } from '@/evm/hooks/useConnectingStatus';

export function EvmUriConnectingView() {
  const { selectedWallet } = useWalletKit();
  const isConnected = useIsConnected();

  const { status, setStatus } = useConnectingStatus({
    initialStatus: CONNECT_STATUS.CONNECTING,
  });

  const { wcUri } = useWalletConnectUri({
    enabled: status !== CONNECT_STATUS.CONNECTING,
    refreshUriOnError: false,
  });

  const onTryAgain = () => {
    setStatus(CONNECT_STATUS.CONNECTING);

    const walletUri = (selectedWallet as EvmWallet).getUri(wcUri!);
    openLink(walletUri);
  };

  return (
    <TemplateConnectingView
      isConnected={isConnected}
      status={status}
      runConnect={() => undefined}
      onTryAgain={onTryAgain}
      wallet={selectedWallet}
    />
  );
}
