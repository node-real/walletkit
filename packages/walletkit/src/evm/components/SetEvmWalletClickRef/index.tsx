import { isMobile, isTMA } from '@/core/base/utils/mobile';
import { UseWalletRenderProps } from '@/core/hooks/useWalletRender';
import { useConnectModal } from '@/core/modals/ConnectModal/context';
import { ViewRoutes } from '@/core/modals/ConnectModal/RouteProvider';
import { useRouter } from '@/core/modals/ConnectModal/RouteProvider/context';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { openUri } from '@/core/utils/common';
import { getEvmGlobalData } from '@/evm/globalData';
import { useEvmConnect } from '@/evm/hooks/useEvmConnect';
import { useWalletConnectModal } from '@/evm/hooks/useWalletConnectModal';
import { EvmWallet, isMetaMask, isWalletConnect } from '@/evm/wallets';
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

  const { connect, connectors } = useEvmConnect();

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
      jumpTo(ViewRoutes.EVM_QRCODE);
    };

    const jumpToConnectingView = () => {
      jumpTo(ViewRoutes.EVM_CONNECTING);
    };

    const jumpToWcUriConnectingView = () => {
      const wcUri = getEvmGlobalData().homeViewWalletConnectUri;
      if (wcUri) {
        openUri(wallet.getUri(wcUri));
        jumpTo(ViewRoutes.EVM_WALLET_CONNECT_URI_CONNECTING);
      }
    };

    const jumpToMetaMaskUriConnectingView = () => {
      const connector = connectors.find((item) => item.id === walletId)!;

      connect({
        connector,
      });

      jumpTo(ViewRoutes.EVM_WALLET_CONNECT_URI_CONNECTING);
    };

    disconnect();

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (isTMA()) {
        // 1. TMA
        if (isMobile()) {
          if (isWalletConnect(walletId)) {
            wcModal.onOpen();
          } else if (isMetaMask(walletId)) {
            jumpToMetaMaskUriConnectingView();
          } else {
            jumpToWcUriConnectingView();
          }
        } else {
          jumpToQRCodeView();
        }
      } else if (isMobile()) {
        // 2. mobile
        if (isWalletConnect(walletId)) {
          wcModal.onOpen();
        } else if (wallet.connectWithUri) {
          if (isMetaMask(walletId)) {
            jumpToMetaMaskUriConnectingView();
          } else {
            jumpToWcUriConnectingView();
          }
        } else if (wallet.isInstalled()) {
          jumpToConnectingView();
        } else {
          const deepLink = wallet.getDeepLink();
          if (deepLink) {
            window.open(deepLink, '_self', 'noopener noreferrer');
          } else {
            options.onError?.(new Error('Not supported wallet'), 'Not supported wallet');
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
