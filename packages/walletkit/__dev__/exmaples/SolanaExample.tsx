import {
  defaultSolanaConfig,
  WalletKitOptions,
  WalletKitProvider,
  ConnectButton,
  ConnectModal,
  ProfileModal,
  useConnectModal,
  useProfileModal,
} from '@/solana/index';
import { phantomWallet, trustWallet, walletConnect } from '@/solana/wallets';

const config = defaultSolanaConfig({
  autoConnect: true,
  appName: 'WalletKit',
  rpcUrl: 'https://api.devnet.solana.com',
  wallets: [trustWallet(), phantomWallet(), walletConnect()],
});

const options: WalletKitOptions = {};

export function SolanaExample() {
  return (
    <WalletKitProvider config={config} options={options} debugMode={true}>
      <ConnectButton />
      <Example />

      <ConnectModal />
      <ProfileModal />
    </WalletKitProvider>
  );
}

function Example() {
  const connectModal = useConnectModal();
  const profileModal = useProfileModal();

  return (
    <>
      <button onClick={() => connectModal.onOpen()}>Open Connect Modal</button>
      <button onClick={() => profileModal.onOpen()}>Open Profile Modal</button>
    </>
  );
}
