import { CONNECT_STATUS } from '@/core/constants';
import { ConnectingView } from '@/core/modals/ConnectModal/ConnectingView';
import {
  useAction,
  useEventConfig,
  useEvmConfig,
  useSelectedWallet,
} from '@/core/providers/WalletKitProvider/context';
import { useEvmIsConnected } from '@/evm/hooks/useEvmIsConnected';
import { useWalletConnector } from '@/evm/hooks/useWalletConnector';
import { useEvmConnect } from '@/evm/hooks/useEvmConnect';
import { useState, useCallback } from 'react';

export function EvmConnectingView() {
  const eventConfig = useEventConfig();
  const { action } = useAction();
  const { selectedWallet } = useSelectedWallet();

  const isConnected = useEvmIsConnected();
  const selectedConnector = useWalletConnector(selectedWallet.id);
  const { initialChainId } = useEvmConfig();

  const [status, setStatus] = useState(
    selectedWallet.isInstalled() ? CONNECT_STATUS.CONNECTING : CONNECT_STATUS.UNAVAILABLE,
  );

  const { connect } = useEvmConnect({
    mutation: {
      onMutate: (connector?: any) => {
        if (connector.connector) {
          setStatus(CONNECT_STATUS.CONNECTING);
        } else {
          setStatus(CONNECT_STATUS.UNAVAILABLE);
        }
      },
      onSettled(data?: any, error?: any) {
        if (error) {
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
        } else if (data) {
          if (initialChainId && data.chainId === initialChainId && action === 'add-network') {
            eventConfig.onChainAlreadyAdded?.(selectedWallet, initialChainId);
          }
        }
      },
    },
  });

  const runConnect = useCallback(() => {
    if (!selectedWallet.isInstalled()) return;

    if (selectedConnector) {
      connect({ connector: selectedConnector });
    } else {
      setStatus(CONNECT_STATUS.UNAVAILABLE);
    }
  }, [connect, selectedConnector, selectedWallet]);

  return (
    <ConnectingView
      status={status}
      runConnect={runConnect}
      wallet={selectedWallet}
      isConnected={isConnected}
    />
  );
}
