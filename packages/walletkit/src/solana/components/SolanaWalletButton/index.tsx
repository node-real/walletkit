import { Button } from '@/core/base/components/Button';
import { useWallets } from '@/core/hooks/useWallets';
import { useWalletKit } from '@/core/providers/WalletKitProvider/context';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRef } from 'react';

export function SolanaOnClickWallet(props: { onSetCallback: () => void }) {
  const { onSetCallback } = props;

  const { config, setSelectedWallet, log } = useWalletKit();
  const { disconnect } = useWallet();

  const timerRef = useRef<any>();
  const { wallets } = useWallets();

  const onClickWallet = (e: any) => {
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

  return <Button {...restProps} />;
}
