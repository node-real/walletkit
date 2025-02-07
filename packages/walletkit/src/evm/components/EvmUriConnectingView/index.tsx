import { CONNECT_STATUS } from '@/core/constants';
import { TemplateConnectingView } from '@/core/modals/ConnectModal/TemplateConnectingView';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useIsConnected } from '@/evm/hooks/useIsConnected';
import { useConnectingStatus } from '@/evm/hooks/useConnectingStatus';
import { useAccount } from 'wagmi';
import { openEvmUri } from '@/evm/utils/openEvmUri';

export function EvmUriConnectingView() {
  const { selectedWallet } = useWalletKit();
  const isConnected = useIsConnected();
  const { address } = useAccount();

  const { status, setStatus } = useConnectingStatus({
    initialStatus: CONNECT_STATUS.CONNECTING,
  });

  const onConnect = () => {
    setStatus(CONNECT_STATUS.CONNECTING);
    openEvmUri(selectedWallet);
  };

  return (
    <TemplateConnectingView
      isConnected={isConnected}
      status={status}
      runConnect={() => undefined}
      onTryAgain={onConnect}
      wallet={selectedWallet}
      address={address}
    />
  );
}
