import { routes } from '@/components/RouteProvider';
import { useRouter } from '@/components/RouteProvider/context';
import { isWalletConnectConnector } from '@/wallets';
import { useCallback, useRef } from 'react';
import { Connector, useDisconnect } from 'wagmi';
import { useWalletKitContext, isMobile } from '..';
import { useWalletConnectModal } from './useWalletConnectModal';

export function useClickWallet() {
  const router = useRouter();
  const { options, log, setSelectedConnector } = useWalletKitContext();

  const { disconnect } = useDisconnect();
  const { onOpenWcModal } = useWalletConnectModal();

  const timerRef = useRef<any>();
  const mobile = isMobile();

  const onClickWallet = useCallback(
    (connector: Connector, e?: React.MouseEvent<Element, MouseEvent>) => {
      const pass = options.onClickWallet?.(connector, e);
      if (pass === false) return;

      log('[click wallet]', `connector:`, connector);
      log('[click wallet]', `ethereum:`, window.ethereum);
      log('[click wallet]', `installed:`, connector._wallet.isInstalled());

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
          if (connector._wallet.showQRCode) {
            gotoQRcodePage();
          } else {
            onOpenWcModal();
          }
        } else if (!connector._wallet.isInstalled()) {
          if (mobile) {
            const deepLink = connector._wallet.getDeepLink?.();
            if (deepLink) {
              window.open(deepLink, '_self', 'noopener noreferrer');
            } else {
              options.onError?.(new Error('Not supported wallet'), 'Not supported wallet');
            }
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
    [disconnect, log, mobile, onOpenWcModal, options, router, setSelectedConnector],
  );

  return onClickWallet;
}
