import { CONNECT_STATUS } from '@/core/constants';
import { TemplateConnectingView } from '@/core/modals/ConnectModal/TemplateConnectingView';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useIsConnected } from '@/evm/hooks/useIsConnected';
import { useCallback, useEffect, useState } from 'react';
import { EventEmitter } from '@/core/utils/eventEmitter';
import { EvmWallet } from '@/evm/wallets';
import { openUri } from '@/core/utils/common';
import { getEvmGlobalData } from '@/evm/globalData';

export function EvmConnectWithWalletConnectView() {
  const { selectedWallet } = useWalletKit();

  const [status, setStatus] = useState(CONNECT_STATUS.CONNECTING);

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

  const isConnected = useIsConnected();

  const onTryAgain = useCallback(() => {
    setStatus(CONNECT_STATUS.CONNECTING);

    const wcUri = getEvmGlobalData().walletConnectUri;

    const walletUri = (selectedWallet as EvmWallet).getUri(wcUri!);
    openUri(walletUri);
  }, [selectedWallet]);

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
