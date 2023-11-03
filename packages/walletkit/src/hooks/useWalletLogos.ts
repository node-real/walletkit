import { useTheme } from '../components/ThemeProvider/context';
import { useMemo } from 'react';
import { WalletProps } from '../wallets';

type LogosType = WalletProps['logos'];

export function useWalletLogos(walletLogos: LogosType) {
  const { colorMode } = useTheme();

  const logos = useMemo(() => {
    const { default: defaultLogos, mobile: mobileLogos } = walletLogos;

    const defaultLogo = (defaultLogos as any)?.[colorMode] ?? defaultLogos;
    const mobileLogo = (mobileLogos as any)?.[colorMode] ?? mobileLogos ?? defaultLogo;

    return {
      default: defaultLogo,
      mobile: mobileLogo,
    };
  }, [colorMode, walletLogos]);

  return logos;
}
