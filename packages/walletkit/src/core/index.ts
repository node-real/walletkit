// utils
export * from '@/core/base/utils/mobile';
export * from '@/core/base/utils/css';

// providers
export type { BaseWallet, WalletType } from '@/core/configs/types';
export * from '@/core/providers/WalletKitProvider';
export { type WalletKitConfig, useWalletKit } from '@/core/providers/WalletKitProvider/context';

export { type ColorMode } from '@/core/providers/ThemeProvider/context';
export { type Theme } from '@/core/providers/ThemeProvider';

// components
export * from '@/core/components/ConnectButton';

// modals
export * from '@/core/modals/EmbeddedConnectModal';
export * from '@/core/modals/ConnectModal';
export { useConnectModal } from '@/core/modals/ConnectModal/context';

// TODO - currently only support evm wallets
export * from '@/core/modals/SwitchNetworkModal';
export { useSwitchNetworkModal } from '@/core/modals/SwitchNetworkModal/context';
export * from '@/core/modals/ProfileModal';
export { useProfileModal } from '@/core/modals/ProfileModal/context';
