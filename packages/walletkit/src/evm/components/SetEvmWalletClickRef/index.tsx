import { isMobile, isTMA } from '@/core/base/utils/mobile';
import { UseWalletRenderProps } from '@/core/hooks/useWalletRender';
import { useConnectModal } from '@/core/modals/ConnectModal/context';
import { ViewRoutes } from '@/core/providers/RouteProvider';
import { useRouter } from '@/core/providers/RouteProvider/context';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { openLink } from '@/core/utils/common';
import { useEvmConnect } from '@/evm/hooks/useEvmConnect';
import { useWalletConnectModal } from '@/evm/hooks/useWalletConnectModal';
import {
  binanceWallet,
  codexFieldWallet,
  EvmWallet,
  isWalletConnect,
  uxuyWallet,
} from '@/evm/wallets';
import { useRef } from 'react';
import { useConnectors, useDisconnect } from 'wagmi';

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
  const { connect } = useEvmConnect();
  const connectors = useConnectors();

  const timerRef = useRef<any>();

  clickRef.current = (walletId: string, e: React.MouseEvent<Element, MouseEvent>) => {
    const wallet = evmConfig!.wallets.find((item) => item.id === walletId)! as EvmWallet;
    const connector = connectors.find((item) => item.id === walletId)!;

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
      jumpTo(ViewRoutes.EVM_QRCODE);
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
      jumpTo(ViewRoutes.EVM_URI_CONNECTING);
    };

    disconnect();
    clearTimeout(timerRef.current);

    const useSDK = [binanceWallet().id].includes(walletId);
    const delay = useSDK ? 0 : 300;

    const handleJumping = () => {
      if (useSDK) {
        setSelectedWallet(wallet);
        connect({
          connector,
        });
        setTimeout(() => {
          connectModal.onClose();
        }, 500);
        return;
      }

      // 1. TMA
      if (isTMA()) {
        if ([uxuyWallet().id, codexFieldWallet().id].includes(walletId)) {
          jumpToConnectingView();
          return;
        }

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
        if (wallet.isInstalled()) {
          if (isWalletConnect(walletId)) {
            wcModal.onOpen();
          } else {
            jumpToConnectingView();
          }
        } else {
          jumpToDeepLink();
        }
      } else {
        // 3. pc
        if (wallet.showQRCode) {
          jumpToQRCodeView();
        } else {
          if (isWalletConnect(walletId)) {
            wcModal.onOpen();
          } else {
            jumpToConnectingView();
          }
        }
      }
    };

    if (isTMA() && isMobile()) {
      handleJumping();
    } else {
      timerRef.current = setTimeout(handleJumping, delay);
    }
  };

  return null;
}
