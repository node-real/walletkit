import { useState } from 'react';
import VConsole from 'vconsole';
import {
  ConnectModal,
  ProfileModal,
  SwitchNetworkModal,
  ThemeMode,
  ConnectButton,
  useConnectModal,
  useProfileModal,
  useSwitchNetworkModal,
  DataSourceProvider,
  CONNECT_STATUS,
} from '@/index';
import {
  ClickSwitchChainParams,
  ClickWalletParams,
  DataSource,
} from '@/components/DataSourceProvider/context';

new VConsole();

const dataSource: DataSource = {
  options: {
    title: 'Connect Modal',
    disclaimer: '',
    hideNoWalletCTA: true,
    hideOfficialWalletConnectCTA: true,

    gridLayoutThreshold: 5,
    useGridLayoutOnMobile: true,

    closeModalAfterConnected: true,
    closeModalAfterSwitchingNetwork: true,
    closeModalOnEsc: true,
    closeModalOnOverlayClick: true,

    openModalOnWrongNetwork: true,

    walletDownloadUrl: 'https://www.baidu.com',
  },
  action: 'add-network',
  setAction: () => undefined,
  log: console.log,
  wallets: [],

  useProvider: () => ({
    walletId: '',
    isConnected: false,
    disconnect: () => undefined,
  }),

  useChain: () => ({
    chain: undefined,
    isSupported: false,
  }),

  useAccount: () => ({
    balance: {
      formatted: '111',
      symbol: 'BNB',
    },
    address: '0x1111',
  }),

  useConnectedButton: () => ({
    chainName: '1',
    chainLogo: '',
  }),

  useDisconnectButton: () => ({
    onClick: () => undefined,
  }),

  useConnectWithQRCodeView: () => ({
    qrCodeUri: '12432',
    qrCodeLogo: null,
    onClickOpenWcModal: () => undefined,
  }),

  useConnectingView: () => ({
    isWalletConflict: true,
    status: CONNECT_STATUS.CONNECTED,
    onClickTryAgain: () => undefined,
    runConnect: () => undefined,
  }),

  useConnectorsView: () => ({
    onClickWallet: (params: ClickWalletParams) => undefined,
  }),

  useSwitchingConfig: () => ({
    chainsConfig: [],
    isPending: true,
    onClickSwitchChain: (params: ClickSwitchChainParams) => undefined,
  }),
};

export default function App() {
  const [mode, setMode] = useState<ThemeMode>('light');
  const nextMode = mode === 'light' ? 'dark' : 'light';

  return (
    <DataSourceProvider
      dataSource={dataSource}
      themeConfig={{
        mode,
      }}
    >
      <div>mode: {mode} </div>
      <button onClick={() => setMode(nextMode)}>switch to {nextMode}</button>
      <div style={{ height: 20 }} />

      <ConnectButton />
      <Example />

      <ConnectModal />
      <SwitchNetworkModal />
      <ProfileModal />
    </DataSourceProvider>
  );
}

function Example() {
  const connectModal = useConnectModal();
  const profileModal = useProfileModal();
  const switchNetworkModal = useSwitchNetworkModal();

  return (
    <>
      <button onClick={() => connectModal.onOpen()}>Open Connect Modal</button>
      <button onClick={() => profileModal.onOpen()}>Open Profile Modal</button>
      <button onClick={() => switchNetworkModal.onOpen()}>Open SwitchNetwork Modal</button>
    </>
  );
}
