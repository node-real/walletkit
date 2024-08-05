import { useWalletKit } from '@/core/components/WalletKitProvider/context';
import { useWalletConfig } from '@/core/hooks/useWalletConfig';
import { useWalletKitConnect } from '@/core/hooks/useWalletKitConnect';
import { CONNECT_STATUS } from '@/ui/constants';
import { DataSource } from '@/ui/types';
import { useState, useCallback } from 'react';
import { isMetaMaskConnector } from '../wallets';

export function useUIConnectingView(): ReturnType<DataSource['useConnectingView']> {
  const { selectedConnector, options, action } = useWalletKit();

  const isWalletConflict =
    typeof window !== 'undefined' &&
    window.ethereum?.isTokenPocket &&
    isMetaMaskConnector(selectedConnector);

  const wallet = useWalletConfig(selectedConnector?.id);
  const [status, setStatus] = useState(
    wallet.isInstalled() ? CONNECT_STATUS.CONNECTING : CONNECT_STATUS.UNAVAILABLE,
  );

  const { connect } = useWalletKitConnect({
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
          if (
            options.initialChainId &&
            data.chainId === options.initialChainId &&
            action === 'add-network'
          ) {
            options.onChainAlreadyAdded?.(wallet, options.initialChainId);
          }
        }
      },
    },
  });

  const runConnect = useCallback(() => {
    if (!wallet.isInstalled()) return;

    if (selectedConnector) {
      connect({ connector: selectedConnector });
    } else {
      setStatus(CONNECT_STATUS.UNAVAILABLE);
    }
  }, [connect, selectedConnector, wallet]);

  return {
    isWalletConflict,
    status,
    onClickTryAgain: runConnect,
    runConnect,
  };
}
