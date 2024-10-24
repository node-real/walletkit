import { isMobile } from '@/core/index';
import { useConnectModal } from '@/core/modals/ConnectModal/context';
import { ViewRoutes } from '@/core/modals/ConnectModal/RouteProvider';
import { useRouter } from '@/core/modals/ConnectModal/RouteProvider/context';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useTronConnect } from '@/tron/hooks/useTronConnect';
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

    const pass = options.onClickWallet?.(wallet, e);
    if (pass === false) return;

    log('[ClickWallet]', `wallet:`, wallet);
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

    const jumpToConnectingView = () => {
      jumpTo(ViewRoutes.TRON_CONNECTING);
    };

    disconnect();

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (isMobile()) {
        if (wallet.isInstalled()) {
          jumpToConnectingView();
        } else {
          connect({
            adapterName: wallet.adapterName,
          });
        }
      } else {
        jumpToConnectingView();
      }
    }, 300);
  };

  return null;
}
