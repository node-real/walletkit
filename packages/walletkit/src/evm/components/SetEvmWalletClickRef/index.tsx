import { walletConnectConfig } from '@/core/configs/wallets/walletConnect';
import { UseWalletRenderProps } from '@/core/hooks/useWalletRender';
import { isMobile } from '@/core/index';
import { useConnectModal } from '@/core/modals/ConnectModal/context';
import { ViewRoutes } from '@/core/modals/ConnectModal/RouteProvider';
import { useRouter } from '@/core/modals/ConnectModal/RouteProvider/context';
import {
  useConfig,
  useLogger,
  useSelectedWallet,
  useWallets,
} from '@/core/providers/WalletKitProvider/context';
import { useWalletConnectModal } from '@/evm/hooks/useWalletConnectModal';
import { EvmWallet } from '@/evm/wallets';
import { useRef } from 'react';
import { useConnectors, useDisconnect } from 'wagmi';

interface SetEvmWalletClickRefProps {
  clickRef: UseWalletRenderProps['clickRef'];
}

export function SetEvmWalletClickRef(props: SetEvmWalletClickRefProps) {
  const { clickRef } = props;

  const config = useConfig();
  const log = useLogger();
  const { setSelectedWallet } = useSelectedWallet();

  const connectors = useConnectors();
  const { disconnect } = useDisconnect();
  const wcModal = useWalletConnectModal();

  const connectModal = useConnectModal();
  const router = useRouter();

  const timerRef = useRef<any>();
  const mobile = isMobile();
  const { wallets } = useWallets('evm');

  clickRef.current = (walletId: string, e: React.MouseEvent<Element, MouseEvent>) => {
    const connector = connectors.find((item) => item.id === walletId)!;
    const wallet = wallets.find((item) => item.id === walletId)! as EvmWallet;

    const pass = config.events.onClickWallet?.(wallet, e);
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

    disconnect();

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (connector.id === walletConnectConfig.id) {
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
            config.events.onError?.(new Error('Not supported wallet'), 'Not supported wallet');
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

  return null;
}
