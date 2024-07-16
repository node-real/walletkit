import { routes } from '@/modals/ConnectModal/RouteProvider';
import { useRouter } from '@/modals/ConnectModal/RouteProvider/context';
import { useCallback, useRef } from 'react';
import { useConnectors, useDisconnect } from 'wagmi';
import { isMobile } from '..';
import { useWalletConnectModal } from './useWalletConnectModal';
import { useWalletKit } from '@/components/WalletKitProvider/context';
import { useConnectModal } from '@/modals/ConnectModal/context';
import { isWalletConnectConnector, WalletProps } from '@/wallets';

export function useClickWallet() {
  const { options, log, setSelectedConnector } = useWalletKit();
  const router = useRouter();
  const connectors = useConnectors();
  const { disconnect } = useDisconnect();

  const connectModal = useConnectModal();
  const wcModal = useWalletConnectModal();

  const timerRef = useRef<any>();
  const mobile = isMobile();

  const onClickWallet = useCallback(
    (wallet: WalletProps, e?: React.MouseEvent<Element, MouseEvent>) => {
      const connector = connectors.find((item) => item.id === wallet.id)!;

      const pass = options.onClickWallet?.(connector, e);
      if (pass === false) return;

      log('[click wallet]', `connector:`, connector);
      log('[click wallet]', `ethereum:`, window.ethereum);
      log('[click wallet]', `installed:`, wallet.isInstalled());

      const jumpTo = (route: string) => {
        setSelectedConnector(connector);
        if (connectModal.isOpen) {
          router.push(route);
        } else {
          connectModal.onOpen({
            route,
          });
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
          if (wallet.showQRCode) {
            gotoQRcodePage();
          } else {
            wcModal.onOpen();
          }
        } else if (!wallet.isInstalled()) {
          if (mobile) {
            const deepLink = wallet.getDeepLink?.();
            if (deepLink) {
              window.open(deepLink, '_self', 'noopener noreferrer');
            } else {
              options.onError?.(new Error('Not supported wallet'), 'Not supported wallet');
            }
          } else if (wallet.showQRCode) {
            gotoQRcodePage();
          } else {
            gotoConnectingPage();
          }
        } else {
          gotoConnectingPage();
        }
      }, 300);
    },
    [
      connectModal,
      connectors,
      disconnect,
      log,
      mobile,
      options,
      router,
      setSelectedConnector,
      wcModal,
    ],
  );

  return onClickWallet;
}
