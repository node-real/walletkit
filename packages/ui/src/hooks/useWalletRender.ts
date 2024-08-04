import { useWalletLogos } from './useWalletLogos';
import { useTheme } from '@/components/ThemeProvider/context';
import {
  useDataSource,
  WalletConfig,
  WalletRenderProps,
} from '@/components/DataSourceProvider/context';
import { useRouter } from '@/modals/ConnectModal/RouteProvider/context';
import { useConnectModal } from '@/modals/ConnectModal/context';
import { routes } from '@/modals/ConnectModal/RouteProvider';

export function useWalletRender(wallet: WalletConfig, layout: WalletRenderProps['layout']) {
  const router = useRouter();
  const { colorMode } = useTheme();

  const { useConnectorsView } = useDataSource();
  const { onClickWallet } = useConnectorsView();

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
