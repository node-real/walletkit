import { Connector } from 'wagmi';
import { useClickWallet } from './useClickWallet';
import { useWalletConfig } from './useWalletConfig';
import { useWalletLogos } from './useWalletLogos';
import { WalletRenderProps } from '@/wallets';
import { useMemo } from 'react';
import { useTheme } from '@/components/ThemeProvider/context';

export function useWalletRender(connector: Connector, layout: WalletRenderProps['layout']) {
  const onClickWallet = useClickWallet();
  const { colorMode } = useTheme();

  const wallet = useWalletConfig(connector);
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
        onClickWallet(connector, e);
      },
    };
  }, [
    colorMode,
    connector,
    layout,
    logos.default,
    logos.transparent,
    onClickWallet,
    wallet.id,
    wallet.isDisabled,
    wallet.name,
  ]);

  return {
    ...renderOptions,
    element: wallet.render?.(renderOptions),
  };
}
