// utils
export * from '@/ui/base/utils/mobile';
export * from '@/ui/base/utils/css';

// config
export * from '@/core/defaultConfig/defaultSolanaConfig';

// components
export * from '@/ui/components/ConnectButton';
export * from '@/core/components/WalletKitProvider';
export type { WalletKitOptions } from '@/core/components/WalletKitProvider/context';

export type { ThemeMode, ThemeVariant } from '@/ui/components/ThemeProvider';
export type { ColorMode } from '@/ui/components/ThemeProvider/context';
export * from '@/ui/themes/base';

// modals
export { EmbeddedConnectModal } from '@/ui/modals/EmbeddedConnectModal';

export { ConnectModal } from '@/ui/modals/ConnectModal';
export { useConnectModal } from '@/ui/modals/ConnectModal/context';

export { ProfileModal } from '@/ui/modals/ProfileModal';
export { useProfileModal } from '@/ui/modals/ProfileModal/context';
