import { useWalletKit } from '@/core/components/WalletKitProvider/context';
import { useWalletConnectModal } from '@/core/hooks/useWalletConnectModal';
import { isMobile } from '@/ui/base/utils/mobile';
import { DataSource, ClickWalletParams } from '@/ui/types';
import { useRef } from 'react';
import { useConnectors, useDisconnect } from 'wagmi';
import { isWalletConnectConnector } from '../wallets';

export function useUIConnectorsView(): ReturnType<DataSource['useConnectorsView']> {
  const { options, setSelectedConnector, wallets, log } = useWalletKit();
  const connectors = useConnectors();
  const { disconnect } = useDisconnect();

  const wcModal = useWalletConnectModal();

  const timerRef = useRef<any>();
  const mobile = isMobile();

  const onClickWallet = (params: ClickWalletParams) => {
    const { walletId, event, gotoQRCodeView, gotoConnectingView } = params;

    const connector = connectors.find((item) => item.id === walletId)!;
    const wallet = wallets.find((item) => item.id === walletId)!;

    const pass = options.onClickWallet?.(wallet, event);
    if (pass === false) return;

    log('[click wallet]', `connector:`, connector);
    log('[click wallet]', `ethereum:`, window.ethereum);
    log('[click wallet]', `installed:`, wallet.isInstalled());

    const jumpToQRCodeView = () => {
      setSelectedConnector(connector);
      gotoQRCodeView();
    };

    const jumpToConnectingView = () => {
      setSelectedConnector(connector);
      gotoConnectingView();
    };

    disconnect();

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (isWalletConnectConnector(connector)) {
        if (wallet.showQRCode) {
          jumpToQRCodeView();
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
          jumpToQRCodeView();
        } else {
          jumpToConnectingView();
        }
      } else {
        jumpToConnectingView();
      }
    }, 300);
  };

  return {
    onClickWallet,
  };
}
