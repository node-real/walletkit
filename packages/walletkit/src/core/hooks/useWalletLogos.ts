import { useMemo } from 'react';
import { BaseWallet } from '../configs/types';
import { useTheme } from '../providers/ThemeProvider/context';

export function useWalletLogos(walletLogos: BaseWallet['logos']) {
  const { colorMode } = useTheme();

  const logos = useMemo(() => {
    const { default: defaultLogos, transparent: transparentLogos } = walletLogos ?? {};

    const defaultLogo = (defaultLogos as any)?.[colorMode] ?? defaultLogos;
    const transparentLogo =
      (transparentLogos as any)?.[colorMode] ?? transparentLogos ?? defaultLogo;

    return {
      default: defaultLogo,
      transparent: transparentLogo,
    };
  }, [colorMode, walletLogos]);

  return logos;
}
