import { isMobile } from '@/core/base/utils/mobile';
import { useConnectModal } from '@/core/modals/ConnectModal/context';
import { ViewRoutes } from '@/core/providers/RouteProvider';
import { useRouter } from '@/core/providers/RouteProvider/context';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { openLink } from '@/core/utils/common';
import { useSolanaConnect } from '@/solana/hooks/useSolanaConnect';
import { getSolanaWalletPlatformBehavior } from '@/solana/utils/getSolanaWalletPlatformBehavior';
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
    const behavior = getSolanaWalletPlatformBehavior(wallet);

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
          const appLink = behavior.getAppLink?.();

          if (behavior.isInstalled?.()) {
            jumpTo(ViewRoutes.SOLANA_CONNECTING);
          } else if (appLink) {
            openLink(appLink);
          } else {
            connect({
              adapterName: wallet.adapterName,
            });
          }
        } else {
          jumpTo(ViewRoutes.SOLANA_CONNECTING);
        }
      }
    }, 300);
  };

  return null;
}
