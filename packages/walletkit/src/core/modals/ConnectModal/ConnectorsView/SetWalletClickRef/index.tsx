import { BaseWallet } from '@/core/configs/wallets/types';
import { UseWalletRenderProps } from '@/core/hooks/useWalletRender';
import { SetEvmWalletClickRef } from '@/evm/components/SetEvmWalletClickRef';
import { SetSolanaWalletClickRef } from '@/solana/components/SetSolanaWalletClickRef';

interface SetWalletClickRefProps {
  wallet: BaseWallet;
  clickRef: UseWalletRenderProps['clickRef'];
}

export function SetWalletClickRef(props: SetWalletClickRefProps) {
  const { wallet, clickRef } = props;

  if (wallet.walletType === 'evm') {
    return <SetEvmWalletClickRef clickRef={clickRef} />;
  }

  if (wallet.walletType === 'solana') {
    return <SetSolanaWalletClickRef clickRef={clickRef} />;
  }
}
