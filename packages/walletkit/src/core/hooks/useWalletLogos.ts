import { useMemo } from 'react';
import { BaseWallet } from '../configs/wallets/types';
import { useTheme } from '../providers/ThemeProvider/context';

type LogosType = BaseWallet['logos'];

export function useWalletLogos(walletLogos: LogosType) {
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
