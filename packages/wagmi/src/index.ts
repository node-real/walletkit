// ui
export {
  ConnectModal,
  useConnectModal,
  ProfileModal,
  useProfileModal,
  SwitchNetworkModal,
  useSwitchNetworkModal,
  EmbeddedConnectModal,
  ConnectButton,
  type ConnectButtonProps,
} from '@node-real/walletkit-ui';

// config
export * from './defaultConfig/defaultWagmiConfig';

// components
export * from './components/EthereumScript';
export * from './components/WalletKitProvider';
export type { WalletKitOptions } from './components/WalletKitProvider/context';
