import { useWalletKit } from '@/components/WalletKitProvider/context';
import { ClickWalletParams, DataSource } from '@node-real/walletkit-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRef } from 'react';

export function useConnectorsView(): ReturnType<DataSource['useConnectorsView']> {
  const { options, setSelectedWallet, wallets, log } = useWalletKit();
  const { disconnect } = useWallet();

  const timerRef = useRef<any>();

  const onClickWallet = (params: ClickWalletParams) => {
    const { walletId, event, gotoConnectingView } = params;
    const wallet = wallets.find((item) => item.id === walletId)!;

    const pass = options.onClickWallet?.(wallet, event);
    if (pass === false) return;

    log('[click wallet]', `wallet:`, wallet);
    log('[click wallet]', `installed:`, wallet.isInstalled());

    const jumpToConnectingView = () => {
      setSelectedWallet(wallet);
      gotoConnectingView();
    };

    disconnect();

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      jumpToConnectingView();
    }, 300);
  };

  return {
    onClickWallet,
  };
}
