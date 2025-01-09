import { isMobile, isTMA } from '@/core/base/utils/mobile';
import { UseWalletRenderProps } from '@/core/hooks/useWalletRender';
import { useConnectModal } from '@/core/modals/ConnectModal/context';
import { ViewRoutes } from '@/core/providers/RouteProvider';
import { useRouter } from '@/core/providers/RouteProvider/context';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { openLink } from '@/core/utils/common';
import { useEvmConnect } from '@/evm/hooks/useEvmConnect';
import { useWalletConnectModal } from '@/evm/hooks/useWalletConnectModal';
import { getEvmWalletPlatformBehavior } from '@/evm/utils/getEvmWalletPlatformBehavior';
import { EvmWallet } from '@/evm/wallets';
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
    const behavior = getEvmWalletPlatformBehavior(wallet);

    const pass = options.onClickWallet?.(wallet, e);
    if (pass === false) return;

    log('[ClickWallet]', `ethereum:`, typeof window.ethereum);
    log('[ClickWallet]', `installed:`, behavior?.isInstalled?.());

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

    disconnect();
    clearTimeout(timerRef.current);

    const handleJumping = () => {
      if (behavior?.connectType === 'walletConnect') {
        if (isMobile()) {
          wcModal.onOpen();
        } else {
          jumpTo(ViewRoutes.EVM_QRCODE);
        }
      }

      if (behavior?.connectType === 'sdk') {
        setSelectedWallet(wallet);
        connect({
          connector,
        });
        setTimeout(() => {
          connectModal.onClose();
        }, 500);
        return;
      }

      if (behavior?.connectType === 'qrcode') {
        jumpTo(ViewRoutes.EVM_QRCODE);
      }

      if (behavior?.connectType === 'uri') {
        jumpTo(ViewRoutes.EVM_URI_CONNECTING);
      }

      if (behavior?.connectType === 'default') {
        if (isMobile()) {
          if (behavior.isInstalled?.()) {
            jumpTo(ViewRoutes.EVM_CONNECTING);
          } else {
            const appLink = behavior.getAppLink?.();
            if (appLink) {
              openLink(appLink);
            }
          }
        } else {
          jumpTo(ViewRoutes.EVM_CONNECTING);
        }
      }
    };

    if (isTMA() && isMobile()) {
      handleJumping();
    } else {
      const delay = behavior?.connectType === 'sdk' ? 0 : 300;
      timerRef.current = setTimeout(handleJumping, delay);
    }
  };

  return null;
}
