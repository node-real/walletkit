import { isMobile, isTMA } from '@/core/base/utils/mobile';
import { UseWalletRenderProps } from '@/core/hooks/useWalletRender';
import { useConnectModal } from '@/core/modals/ConnectModal/context';
import { ViewRoutes } from '@/core/modals/ConnectModal/RouteProvider';
import { useRouter } from '@/core/modals/ConnectModal/RouteProvider/context';
import {
  useEventConfig,
  useEvmConfig,
  useLogger,
  useSelectedWallet,
} from '@/core/providers/WalletKitProvider/context';
import { openUri } from '@/core/utils/common';
import { useWalletConnectModal } from '@/evm/hooks/useWalletConnectModal';
import { EvmWallet, isWalletConnect } from '@/evm/wallets';
import { useRef } from 'react';
import { useConnectors, useDisconnect } from 'wagmi';
import { useEvmWalletConnectUri } from '../EvmWalletConnectUriProvider';

interface SetEvmWalletClickRefProps {
  clickRef: UseWalletRenderProps['clickRef'];
}

export function SetEvmWalletClickRef(props: SetEvmWalletClickRefProps) {
  const { clickRef } = props;

  const eventConfig = useEventConfig();
  const log = useLogger();
  const { setSelectedWallet } = useSelectedWallet();

  const connectors = useConnectors();
  const { disconnect } = useDisconnect();
  const wcModal = useWalletConnectModal();
  const { wcUri } = useEvmWalletConnectUri();

  const connectModal = useConnectModal();
  const router = useRouter();

  const timerRef = useRef<any>();
  const { wallets } = useEvmConfig();

  clickRef.current = (walletId: string, e: React.MouseEvent<Element, MouseEvent>) => {
    const connector = connectors.find((item) => item.id === walletId)!;
    const wallet = wallets.find((item) => item.id === walletId)! as EvmWallet;

    const pass = eventConfig.onClickWallet?.(wallet, e);
    if (pass === false) return;

    log('[click wallet]', `connector:`, connector);
    log('[click wallet]', `ethereum:`, window.ethereum);
    log('[click wallet]', `installed:`, wallet.isInstalled());

    const jumpTo = (viewRoute: ViewRoutes) => {
      setSelectedWallet(wallet);

      if (connectModal.isOpen) {
        router.push(viewRoute);
      } else {
        connectModal.onOpen({
          viewRoute,
        });
      }
    };

    const jumpToQRCodeView = () => {
      jumpTo(ViewRoutes.EVM_CONNECT_WITH_QRCODE);
    };

    const jumpToConnectingView = () => {
      jumpTo(ViewRoutes.EVM_CONNECTING);
    };

    const jumpToWalletConnectView = () => {
      if (!wcUri) return;

      openUri(wallet.getUri(wcUri));
      jumpTo(ViewRoutes.EVM_CONNECT_WITH_WALLET_CONNECT);
    };

    disconnect();

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (isTMA()) {
        // 1. TMA
        if (isMobile()) {
          if (isWalletConnect(walletId)) {
            wcModal.onOpen();
          } else {
            jumpToWalletConnectView();
          }
        } else {
          jumpToQRCodeView();
        }
      } else if (isMobile()) {
        // 2. mobile
        if (isWalletConnect(walletId)) {
          wcModal.onOpen();
        } else if (wallet.useWalletConnect) {
          jumpToWalletConnectView();
        } else if (wallet.isInstalled()) {
          jumpToConnectingView();
        } else {
          const deepLink = wallet.getDeepLink?.();
          if (deepLink) {
            window.open(deepLink, '_self', 'noopener noreferrer');
          } else {
            eventConfig.onError?.(new Error('Not supported wallet'), 'Not supported wallet');
          }
        }
      } else {
        // 3. pc
        if (isWalletConnect(walletId)) {
          if (wallet.showQRCode) {
            jumpToQRCodeView();
          } else {
            wcModal.onOpen();
          }
        } else if (wallet.showQRCode) {
          jumpToQRCodeView();
        } else {
          jumpToConnectingView();
        }
      }
    }, 300);
  };

  return null;
}
