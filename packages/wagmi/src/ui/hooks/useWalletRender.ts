import { useUIConnectorsView } from '@/ui-data/useUIConnectorsView';
import { useTheme } from '../components/ThemeProvider/context';
import { useConnectModal } from '../modals/ConnectModal/context';
import { ViewRoutes } from '../modals/ConnectModal/RouteProvider';
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
      const jumpTo = (viewRoute: ViewRoutes) => {
        if (connectModal.isOpen) {
          router.push(viewRoute);
        } else {
          connectModal.onOpen({
            viewRoute,
          });
        }
      };

      const gotoQRCodeView = () => {
        jumpTo(ViewRoutes.CONNECT_WITH_QRCODE);
      };

      const gotoConnectingView = () => {
        jumpTo(ViewRoutes.CONNECTING);
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
