import { useUIConnectorsView } from '@/ui-data/useUIConnectorsView';
import { useTheme } from '../components/ThemeProvider/context';
import { useConnectModal } from '../modals/ConnectModal/context';
import { routes } from '../modals/ConnectModal/RouteProvider';
import { useRouter } from '../modals/ConnectModal/RouteProvider/context';
import { WalletConfig, WalletRenderProps } from '../types';
import { useWalletLogos } from './useWalletLogos';

export function useWalletRender(wallet: WalletConfig, layout: WalletRenderProps['layout']) {
  const router = useRouter();
  const { colorMode } = useTheme();

  const { onClickWallet } = useUIConnectorsView();

  const connectModal = useConnectModal();
  const logos = useWalletLogos(wallet.logos);

  const renderOptions = {
    layout,
    colorMode,
    wallet: {
      id: wallet.id,
      name: wallet.name,
      logo: layout === 'grid' ? logos.default : logos.transparent,
      isDisabled: wallet.isDisabled,
    },
    onClick(e: React.MouseEvent<Element, MouseEvent>) {
      const jumpTo = (route: string) => {
        if (connectModal.isOpen) {
          router.push(route);
        } else {
          connectModal.onOpen({
            route,
          });
        }
      };

      const gotoQRCodeView = () => {
        jumpTo(routes.CONNECT_WITH_QRCODE);
      };

      const gotoConnectingView = () => {
        jumpTo(routes.CONNECTING);
      };

      onClickWallet({
        walletId: wallet.id,
        event: e,
        gotoQRCodeView,
        gotoConnectingView,
      });
    },
  };

  return {
    ...renderOptions,
    element: wallet.render?.(renderOptions),
  };
}
