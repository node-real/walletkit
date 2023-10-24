import { ConnectButton, ConnectButtonProps } from './ConnectButton';
import { ConnectButtonRenderer } from './ConnectButtonRenderer';

type WalletKitButtonType = typeof ConnectButton & {
  Custom: typeof ConnectButtonRenderer;
};

(ConnectButton as WalletKitButtonType).Custom = ConnectButtonRenderer;
const WalletKitButton = ConnectButton as WalletKitButtonType;

export { type ConnectButtonProps as WalletKitButtonProps, WalletKitButton };
