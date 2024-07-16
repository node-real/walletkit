import { useClickWallet } from './useClickWallet';
import { useWalletLogos } from './useWalletLogos';
import { WalletProps, WalletRenderProps } from '@/wallets';
import { useMemo } from 'react';
import { useTheme } from '@/components/ThemeProvider/context';

export function useWalletRender(wallet: WalletProps, layout: WalletRenderProps['layout']) {
  const onClickWallet = useClickWallet();
  const { colorMode } = useTheme();

  const logos = useWalletLogos(wallet.logos);

  const renderOptions = useMemo(() => {
    return {
      layout,
      colorMode,
      wallet: {
        id: wallet.id,
        name: wallet.name,
        logo: layout === 'grid' ? logos.default : logos.transparent,
        isDisabled: wallet.isDisabled,
      },
      onClick(e: React.MouseEvent<Element, MouseEvent>) {
        onClickWallet(wallet, e);
      },
    };
  }, [colorMode, layout, logos.default, logos.transparent, onClickWallet, wallet]);

  return {
    ...renderOptions,
    element: wallet.render?.(renderOptions),
  };
}
