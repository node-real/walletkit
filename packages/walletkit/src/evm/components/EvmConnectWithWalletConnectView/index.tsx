import { CONNECT_STATUS } from '@/core/constants';
import { TemplateConnectingView } from '@/core/modals/ConnectModal/TemplateConnectingView';
import { useSelectedWallet } from '@/core/providers/WalletKitProvider/context';
import { useEvmIsConnected } from '@/evm/hooks/useEvmIsConnected';
import { useCallback, useEffect, useState } from 'react';
import { EventEmitter } from '@/core/utils/eventEmitter';
import { useEvmWalletConnectUri } from '../EvmWalletConnectUriProvider';
import { EvmWallet } from '@/evm/wallets';
import { openUri } from '@/core/utils/common';

export function EvmConnectWithWalletConnectView() {
  const { selectedWallet } = useSelectedWallet();

  const [status, setStatus] = useState(CONNECT_STATUS.CONNECTING);
  const { wcUri } = useEvmWalletConnectUri();

  useEffect(() => {
    const onError = (error: any) => {
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
    };

    EventEmitter.on(EventEmitter.EVM_WC_URI_ERROR, onError);
    return () => {
      EventEmitter.off(EventEmitter.EVM_WC_URI_ERROR, onError);
    };
  }, []);

  const isConnected = useEvmIsConnected();

  const onTryAgain = useCallback(() => {
    setStatus(CONNECT_STATUS.CONNECTING);

    const walletUri = (selectedWallet as EvmWallet).getUri(wcUri);
    openUri(walletUri);
  }, [selectedWallet, wcUri]);

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
