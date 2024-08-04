// ui
export * from '@node-real/walletkit-ui';

// config
export * from './defaultConfig/defaultSolanaConfig';

// components
export * from './components/WalletKitProvider';
export type { WalletKitOptions } from './components/WalletKitProvider/context';

// utils
export { useWallet } from '@solana/wallet-adapter-react';
