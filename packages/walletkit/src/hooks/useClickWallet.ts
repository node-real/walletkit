import { routes } from '@/components/RouteProvider';
import { useRouter } from '@/components/RouteProvider/context';
import { isWalletConnectConnector } from '@/wallets';
import { useCallback, useRef } from 'react';
import { Connector, useDisconnect } from 'wagmi';
import { isMobile } from '..';
import { useWalletConnectModal } from './useWalletConnectModal';
import { useWalletKitContext } from '@/components/WalletKitProvider/context';
import { useWalletKitModal } from '@/components/WalletKitModal/WalletKitModalProvider/context';

export function useClickWallet() {
  const router = useRouter();
  const { options, log, setSelectedConnector } = useWalletKitContext();

  const { onOpen: onOpenWKModal } = useWalletKitModal();
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

      const jumpTo = (route: string) => {
        setSelectedConnector(connector);
        if (options.hideInnerModal) {
          onOpenWKModal({
            route,
          });
        } else {
          router.push(route);
        }
      };

      const gotoQRcodePage = () => {
        jumpTo(routes.CONNECT_WITH_QRCODE);
      };

      const gotoConnectingPage = () => {
        jumpTo(routes.CONNECTING);
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
    [disconnect, log, mobile, onOpenWKModal, onOpenWcModal, options, router, setSelectedConnector],
  );

  return onClickWallet;
}
