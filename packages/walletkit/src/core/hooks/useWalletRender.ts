import { BaseWallet, WalletRenderProps } from '../configs/wallets/types';
import { useTheme } from '../providers/ThemeProvider/context';
import { useWalletLogos } from './useWalletLogos';

export interface UseWalletRenderProps {
  wallet: BaseWallet;
  layout: WalletRenderProps['layout'];
  clickRef: React.MutableRefObject<
    (walletId: string, e: React.MouseEvent<Element, MouseEvent>) => void
  >;
  defaultRender: BaseWallet['render'];
}

export function useWalletRender(props: UseWalletRenderProps) {
  const { wallet, layout, clickRef, defaultRender } = props;

  const { colorMode } = useTheme();
  const logos = useWalletLogos(wallet.logos);

  const renderOptions = {
    layout,
    colorMode,
    wallet: {
      id: wallet.id,
      walletType: wallet.walletType,
      name: wallet.name,
      logo: layout === 'grid' ? logos.default : logos.transparent,
      isDisabled: wallet.isDisabled,
    },
    onClick(e: React.MouseEvent<Element, MouseEvent>) {
      clickRef.current?.(wallet.id, e);
    },
  };

  const render = wallet.render ?? defaultRender;

  return () => {
    return render?.(renderOptions);
  };
}
