import { useTheme } from '../components/ThemeProvider/context';
import { useMemo } from 'react';
import { WalletProps } from '../wallets';

type LogosType = WalletProps['logos'];

export function useWalletLogos(walletLogos: LogosType) {
  const { colorMode } = useTheme();

  const logos = useMemo(() => {
    const { default: defaultLogos, transparent: transparentLogos } = walletLogos;

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
