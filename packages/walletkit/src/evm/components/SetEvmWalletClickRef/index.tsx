import { toast } from '@/core/base/components/toast';
import { isMobile } from '@/core/base/utils/mobile';
import { UseWalletRenderProps } from '@/core/hooks/useWalletRender';
import { useConnectModal } from '@/core/modals/ConnectModal/context';
import { ViewRoutes } from '@/core/providers/RouteProvider';
import { useRouter } from '@/core/providers/RouteProvider/context';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { getWalletBehaviorOnPlatform, openLink } from '@/core/utils/common';
import { getEvmGlobalData } from '@/evm/globalData';
import { useEvmConnect } from '@/evm/hooks/useEvmConnect';
import { useWalletConnectModal } from '@/evm/hooks/useWalletConnectModal';
import { openEvmUri } from '@/evm/utils/openEvmUri';
import { EvmWallet, EvmWalletBehavior } from '@/evm/wallets';
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
    const behavior = getWalletBehaviorOnPlatform<EvmWalletBehavior>(wallet);

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
        if (getEvmGlobalData().globalWcUri) {
          openEvmUri(wallet);
          jumpTo(ViewRoutes.EVM_URI_CONNECTING);
        } else {
          toast.info({
            description: 'Please try again in a few seconds',
          });
        }
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

    if (isMobile()) {
      handleJumping();
    } else {
      timerRef.current = setTimeout(handleJumping, 600);
    }
  };

  return null;
}
