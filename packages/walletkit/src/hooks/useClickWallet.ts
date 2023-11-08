import { useCallback, useRef } from 'react';
import { Connector, useDisconnect } from 'wagmi';
import { useRouter } from '../components/RouteProvider/context';
import { useWalletKitContext } from '../components/WalletKitProvider/context';
import { useWalletConnectModal } from './useWalletConnectModal';
import { isMobile } from '../base/utils/mobile';
import { isWalletConnectConnector } from '../wallets';
import { routes } from '../components/RouteProvider';

export function useClickWallet() {
  const router = useRouter();
  const { options, setSelectedConnector } = useWalletKitContext();

  const { disconnect } = useDisconnect();
  const { onOpenWcModal } = useWalletConnectModal();

  const timerRef = useRef<any>();
  const mobile = isMobile();

  const onClickWallet = useCallback(
    (connector: Connector, e?: React.MouseEvent<Element, MouseEvent>) => {
      const pass = options.onClickWallet?.(connector, e);
      if (pass === false) return;

      disconnect();

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (isWalletConnectConnector(connector)) {
          if (connector.options.showQrModal) {
            onOpenWcModal();
          } else {
            setSelectedConnector(connector);
            router.push(routes.CONNECT_WITH_QRCODE);
          }
        } else if (mobile && !connector._wallet.installed) {
          const uri = connector._wallet.getUri?.();
          if (uri) {
            window.open(uri, '_self', 'noopener noreferrer');
          }
        } else {
          setSelectedConnector(connector);
          router.push(routes.CONNECTING);
        }
      }, 300);
    },
    [disconnect, mobile, onOpenWcModal, options, router, setSelectedConnector],
  );

  return onClickWallet;
}
