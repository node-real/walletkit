import { isMobile } from '@/core/base/utils/mobile';
import { useConnectModal } from '@/core/modals/ConnectModal/context';
import { ViewRoutes } from '@/core/modals/ConnectModal/RouteProvider';
import { useRouter } from '@/core/modals/ConnectModal/RouteProvider/context';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { openLink } from '@/core/utils/common';
import { useSolanaConnect } from '@/solana/hooks/useSolanaConnect';
import { SolanaWallet } from '@/solana/wallets';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRef } from 'react';

interface SetSolanaWalletClickRefProps {
  clickRef: any;
}

export function SetSolanaWalletClickRef(props: SetSolanaWalletClickRefProps) {
  const { clickRef } = props;

  const { log, options, setSelectedWallet, solanaConfig } = useWalletKit();
  const { disconnect } = useWallet();
  const { connect } = useSolanaConnect();

  const connectModal = useConnectModal();
  const router = useRouter();

  const timerRef = useRef<any>();

  clickRef.current = (walletId: string, e: React.MouseEvent<Element, MouseEvent>) => {
    const wallet = solanaConfig!.wallets.find((item) => item.id === walletId)! as SolanaWallet;

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
      jumpTo(ViewRoutes.SOLANA_CONNECTING);
    };

    disconnect();

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (isMobile()) {
        const deeplink = wallet.getDeepLink();

        if (wallet.isInstalled()) {
          jumpToConnectingView();
        } else if (deeplink) {
          openLink(deeplink);
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
