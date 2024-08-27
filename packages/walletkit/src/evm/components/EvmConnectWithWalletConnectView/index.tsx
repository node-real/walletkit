import { CONNECT_STATUS } from '@/core/constants';
import { ConnectingView } from '@/core/modals/ConnectModal/ConnectingView';
import { useLogger, useSelectedWallet } from '@/core/providers/WalletKitProvider/context';
import { useEvmIsConnected } from '@/evm/hooks/useEvmIsConnected';
import { useWalletConnectUri } from '@/evm/hooks/useWalletConnectUri';
import { EvmWallet } from '@/evm/wallets';
import { useCallback, useState } from 'react';
import { isTMA } from '@/core/index';
import WebApp from '@twa-dev/sdk';

export function EvmConnectWithWalletConnectView() {
  const { selectedWallet } = useSelectedWallet();

  const log = useLogger();
  const [status, setStatus] = useState(CONNECT_STATUS.CONNECTING);

  const wcUri = useWalletConnectUri({
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

  const walletUri = (selectedWallet as EvmWallet).getUri(wcUri);
  const isConnected = useEvmIsConnected();

  const onClickConnect = useCallback(() => {
    log(`[connectWithWalletConnect] walletUri`, walletUri);
    setStatus(CONNECT_STATUS.CONNECTING);

    if (isTMA()) {
      const link = `https://www.baidu.com/wc?uri=${encodeURIComponent(wcUri)}`;
      console.log(link, '===');
      WebApp.openLink(link);
    } else {
      window.open(walletUri, '_self', 'noopener noreferrer');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletUri]);

  return (
    <>
      <ConnectingView
        isConnected={isConnected}
        status={status}
        runConnect={() => undefined}
        wallet={selectedWallet}
        isReady={!!wcUri}
      />
      <button onClick={onClickConnect}>connect</button>
    </>
  );
}
