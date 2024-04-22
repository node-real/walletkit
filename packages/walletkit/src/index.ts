// utils
export * from './base/utils/mobile';
export * from './base/utils/css';

// config
export * from './defaultConfig/getDefaultConfig';

// components
export * from './components/EthereumScript';
export * from './components/WalletKitButton';
export * from './components/WalletKitProvider';
export type { WalletKitOptions } from './components/WalletKitProvider/context';
export type { ThemeMode, ThemeVariant } from './components/ThemeProvider';

export * from './components/WalletKitModal';
export { useWalletKitModal as useModal } from './components/WalletKitModal/WalletKitModalProvider/context';

export * from './components/SwitchNetworkModal';
export { useSwitchNetworkModal } from './components/SwitchNetworkModal/SwitchNetworkProvider/context';

export * from './components/ProfileModal';
export { useProfileModal } from './components/ProfileModal/ProfileModalProvider/context';

export * from './components/WalletKitEmbeddedModal';
