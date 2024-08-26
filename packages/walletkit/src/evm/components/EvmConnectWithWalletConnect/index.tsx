import { CONNECT_STATUS } from '@/core/constants';
import { ConnectingView } from '@/core/modals/ConnectModal/ConnectingView';
import { useSelectedWallet } from '@/core/providers/WalletKitProvider/context';
import { useEvmIsConnected } from '@/evm/hooks/useEvmIsConnected';
import { useQRCodeUri } from '@/evm/hooks/useQRCodeUri';
import { EvmWallet } from '@/evm/wallets';
import { useCallback, useState } from 'react';

export function EvmConnectWithWalletConnect() {
  const { selectedWallet } = useSelectedWallet();

  const [status, setStatus] = useState(CONNECT_STATUS.CONNECTING);

  const wcUri = useQRCodeUri({
    onError(error: any) {
      if (error.code) {
        // https://github.com/MetaMask/eth-rpc-errors/blob/main/src/error-constants.ts
        switch (error.code) {
          case -32002:
            setStatus(CONNECT_STATUS.NOTCONNECTED);
            break;
          case 4001:
            setStatus(CONNECT_STATUS.REJECTED);
            break;
          default:
            setStatus(CONNECT_STATUS.FAILED);
            break;
        }
      } else {
        // Sometimes the error doesn't respond with a code
        if (error.message) {
          switch (error.message) {
            case 'User rejected request':
              setStatus(CONNECT_STATUS.REJECTED);
              break;
            default:
              setStatus(CONNECT_STATUS.FAILED);
              break;
          }
        }
      }
    },
  });

  const qrCodeUri = (selectedWallet as EvmWallet).getUri(wcUri);
  const isConnected = useEvmIsConnected();

  const onClickConnect = useCallback(() => {
    setStatus(CONNECT_STATUS.CONNECTING);
    window.open(qrCodeUri, '_self', 'noopener noreferrer');
  }, [qrCodeUri]);

  return (
    <ConnectingView
      isConnected={isConnected}
      status={status}
      runConnect={onClickConnect}
      wallet={selectedWallet}
      isReady={!!wcUri}
    />
  );
}
