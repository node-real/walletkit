import { routes } from '@/components/RouteProvider';
import { useRouter } from '@/components/RouteProvider/context';
import { isWalletConnectConnector } from '@/wallets';
import { useCallback, useRef } from 'react';
import { Connector, useDisconnect } from 'wagmi';
import { useWalletKitContext, isMobile } from '..';
import { useWalletConnectModal } from './useWalletConnectModal';

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

      console.log('connector', connector);
      console.log('ethereum', window.ethereum);
      console.log('okexchain', window.okexchain);

      const gotoQRcodePage = () => {
        setSelectedConnector(connector);
        router.push(routes.CONNECT_WITH_QRCODE);
      };

      const gotoConnectingPage = () => {
        setSelectedConnector(connector);
        router.push(routes.CONNECTING);
      };

      disconnect();

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (isWalletConnectConnector(connector)) {
          if (connector.options.showQrModal) {
            onOpenWcModal();
          } else {
            gotoQRcodePage();
          }
        } else if (!connector._wallet.installed) {
          if (mobile) {
            // const deepLink = connector._wallet.getDeepLink?.();
            // if (deepLink) {
            //   window.open(deepLink, '_self', 'noopener noreferrer');
            // }
          } else if (connector._wallet.showQRCode) {
            gotoQRcodePage();
          } else {
            gotoConnectingPage();
          }
        } else {
          gotoConnectingPage();
        }
      }, 300);
    },
    [disconnect, mobile, onOpenWcModal, options, router, setSelectedConnector],
  );

  return onClickWallet;
}
