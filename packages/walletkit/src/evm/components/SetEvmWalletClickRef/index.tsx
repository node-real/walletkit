import { isMobile, isTMA } from '@/core/base/utils/mobile';
import { UseWalletRenderProps } from '@/core/hooks/useWalletRender';
import { useConnectModal } from '@/core/modals/ConnectModal/context';
import { ViewRoutes } from '@/core/providers/RouteProvider';
import { useRouter } from '@/core/providers/RouteProvider/context';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { openLink } from '@/core/utils/common';
import { getEvmGlobalData } from '@/evm/globalData';
import { useWalletConnectModal } from '@/evm/hooks/useWalletConnectModal';
import { EvmWallet, isWalletConnect } from '@/evm/wallets';
import { useRef } from 'react';
import { useDisconnect } from 'wagmi';

interface SetEvmWalletClickRefProps {
  clickRef: UseWalletRenderProps['clickRef'];
}

export function SetEvmWalletClickRef(props: SetEvmWalletClickRefProps) {
  const { clickRef } = props;

  const { log, options, evmConfig, setSelectedWallet } = useWalletKit();
  const { disconnect } = useDisconnect();
  const wcModal = useWalletConnectModal();

  const connectModal = useConnectModal();
  const router = useRouter();

  const timerRef = useRef<any>();

  clickRef.current = (walletId: string, e: React.MouseEvent<Element, MouseEvent>) => {
    const wallet = evmConfig!.wallets.find((item) => item.id === walletId)! as EvmWallet;

    const pass = options.onClickWallet?.(wallet, e);
    if (pass === false) return;

    log('[ClickWallet]', `ethereum:`, typeof window.ethereum);
    log('[ClickWallet]', `installed:`, wallet.isInstalled());

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
      const qrCodeUri = wallet.getUri('xxx');
      if (qrCodeUri) {
        jumpTo(ViewRoutes.EVM_QRCODE);
      } else {
        options.onError?.(
          new Error(`The wallet does not support QR code`),
          `The wallet does not support QR code`,
        );
      }
    };

    const jumpToConnectingView = () => {
      jumpTo(ViewRoutes.EVM_CONNECTING);
    };

    const jumpToDeepLink = () => {
      const deepLink = wallet.getDeepLink();
      if (deepLink) {
        openLink(deepLink);
      } else {
        options.onError?.(
          new Error(`The wallet does not support deeplink`),
          `The wallet does not support deeplink`,
        );
      }
    };

    const jumpToUriConnectingView = () => {
      const wcUri = getEvmGlobalData().homeViewWalletConnectUri;
      if (wcUri) {
        const connectUri = wallet.getUri(wcUri);
        if (connectUri) {
          openLink(connectUri);
          jumpTo(ViewRoutes.EVM_URI_CONNECTING);
        } else {
          options.onError?.(
            new Error(`The wallet does not support URI connection`),
            `The wallet does not support URI connection`,
          );
        }
      }
    };

    disconnect();

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (isTMA()) {
        // 1. TMA
        if (isMobile()) {
          // 1.1 mobile
          if (isWalletConnect(walletId)) {
            wcModal.onOpen();
          } else {
            jumpToUriConnectingView();
          }
        } else {
          // 1.2 pc
          jumpToQRCodeView();
        }
      } else if (isMobile()) {
        // 2. mobile
        if (isWalletConnect(walletId)) {
          wcModal.onOpen();
        } else if (wallet.isInstalled()) {
          jumpToConnectingView();
        } else {
          jumpToDeepLink();
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
