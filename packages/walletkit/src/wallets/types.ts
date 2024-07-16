import { ColorMode } from '@/components/ThemeProvider/context';
import { ReactElement, ReactNode } from 'react';
import { CreateConnectorFn } from 'wagmi';
import { InjectedParameters } from './injected';

export interface WalletRenderProps {
  layout: 'list' | 'grid';
  colorMode: ColorMode;
  wallet: {
    id: string;
    name: string;
    logo: ReactElement;
    isDisabled?: boolean;
  };
  onClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export interface WalletProps {
  id: string;
  name: string;
  logos: {
    default: ReactElement | { [x in ColorMode]: ReactElement };
    transparent?: ReactElement | { [x in ColorMode]: ReactElement };
  };
  downloadUrls: {
    default: string | undefined;
  };
  spinnerColor?: string;
  showQRCode?: boolean;
  isInstalled: () => boolean | undefined;
  isDisabled?: boolean;
  getCreateConnectorFn: () => CreateConnectorFn;
  getDeepLink: () => string | undefined;
  getQRCodeUri?: (uri: string) => string;
  render?: (props: WalletRenderProps) => ReactNode;
}

export interface InjectedWalletOptions extends Partial<WalletProps> {
  connectorOptions?: InjectedParameters;
}
