// utils
export * from './base/utils/mobile';
export * from './base/utils/css';

// config
export * from './defaultConfig/defaultWagmiConfig';

// components
export * from './components/EthereumScript';
export * from './components/WalletKitButton';
export * from './components/WalletKitProvider';
export type { WalletKitOptions } from './components/WalletKitProvider/context';
export type { ThemeMode, ThemeVariant } from './components/ThemeProvider';

export * from './modals/EmbeddedConnectModal';
export { ConnectModal } from './modals/ConnectModal';
export { useConnectModal } from './modals/ConnectModal/context';

export { ProfileModal } from './modals/ProfileModal';
export { useProfileModal } from './modals/ProfileModal/context';

export { SwitchNetworkModal } from './modals/SwitchNetworkModal';
export { useSwitchNetworkModal } from './modals/SwitchNetworkModal/context';
