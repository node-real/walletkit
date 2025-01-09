import { isMobile } from '@/core/index';
import { useConnectModal } from '@/core/modals/ConnectModal/context';
import { ViewRoutes } from '@/core/providers/RouteProvider';
import { useRouter } from '@/core/providers/RouteProvider/context';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useTronConnect } from '@/tron/hooks/useTronConnect';
import { getTronWalletPlatformBehavior } from '@/tron/utils/getTronWalletPlatformBehavior';
import { TronWallet } from '@/tron/wallets';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useRef } from 'react';

interface SetTronWalletClickRefProps {
  clickRef: any;
}

export function SetTronWalletClickRef(props: SetTronWalletClickRefProps) {
  const { clickRef } = props;

  const { log, options, setSelectedWallet, tronConfig } = useWalletKit();
  const { disconnect } = useWallet();
  const { connect } = useTronConnect();

  const connectModal = useConnectModal();
  const router = useRouter();

  const timerRef = useRef<any>();

  clickRef.current = (walletId: string, e: React.MouseEvent<Element, MouseEvent>) => {
    const wallet = tronConfig!.wallets.find((item) => item.id === walletId)! as TronWallet;
    const behavior = getTronWalletPlatformBehavior(wallet);

    const pass = options.onClickWallet?.(wallet, e);
    if (pass === false) return;

    log('[ClickWallet]', `wallet:`, wallet);
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
    timerRef.current = setTimeout(() => {
      if (behavior?.connectType === 'default') {
        if (isMobile()) {
          if (behavior?.isInstalled?.()) {
            jumpTo(ViewRoutes.TRON_CONNECTING);
          } else {
            connect({
              adapterName: wallet.adapterName,
            });
          }
        } else {
          jumpTo(ViewRoutes.TRON_CONNECTING);
        }
      }
    }, 300);
  };

  return null;
}
