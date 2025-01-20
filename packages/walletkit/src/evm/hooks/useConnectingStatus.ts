import { CONNECT_STATUS } from '@/core/constants';
import { useWalletKit } from '@/core/index';
import { useEffect, useState } from 'react';
import { useEvmConnect } from './useEvmConnect';
import { EventEmitter } from '@/core/utils/eventEmitter';
import { Config } from 'wagmi';
import { ConnectData } from 'wagmi/query';
import { getWalletBehaviorOnPlatform } from '@/core/utils/common';
import { EvmWalletBehavior } from '../wallets';

interface UseConnectingStatusProps {
  initialStatus?: CONNECT_STATUS;
}

export function useConnectingStatus(props: UseConnectingStatusProps = {}) {
  const { initialStatus } = props;

  const { selectedWallet, evmConfig, options, action } = useWalletKit();

  const behavior = getWalletBehaviorOnPlatform<EvmWalletBehavior>(selectedWallet);

  const defaultStatus = behavior?.isInstalled?.()
    ? CONNECT_STATUS.CONNECTING
    : CONNECT_STATUS.UNAVAILABLE;

  const [status, setStatus] = useState(initialStatus ?? defaultStatus);

  const { connect } = useEvmConnect();

  useEffect(() => {
    const onSettled = (data: ConnectData<Config> | undefined, error: any) => {
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
              case 'User disapproved requested methods':
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
          evmConfig?.initialChainId &&
          data.chainId === evmConfig.initialChainId &&
          action === 'add-network'
        ) {
          options.onChainAlreadyAdded?.({
            wallet: selectedWallet,
            chainId: data.chainId,
          });
        }
      }
    };

    EventEmitter.on(EventEmitter.EVM_CONNECT_SETTLE, onSettled);
    return () => {
      EventEmitter.off(EventEmitter.EVM_CONNECT_SETTLE, onSettled);
    };
  }, [action, evmConfig?.initialChainId, options, selectedWallet]);

  return {
    status,
    connect,
    setStatus,
  };
}
