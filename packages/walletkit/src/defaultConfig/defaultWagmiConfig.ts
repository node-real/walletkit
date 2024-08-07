import {
  Connector,
  http,
  createConfig,
  CreateConnectorFn,
  type CreateConfigParameters,
} from 'wagmi';
import { Chain, mainnet } from 'wagmi/chains';
import { WALLET_CONNECT_PROJECT_ID } from '../constants/common';
import { setGlobalData } from '../globalData';
import { getDefaultWallets } from './getDefaultWallets';
import { isWalletConnectConnector, walletConnect, WalletProps } from '@/wallets';

export interface DefaultWagmiConfig extends Omit<CreateConfigParameters, 'chains' | 'connectors'> {
  appName: string;
  appIcon?: string;
  appDescription?: string;
  appUrl?: string;

  // WC 2.0 requires a project ID (get one here: https://cloud.walletconnect.com/sign-in)
  walletConnectProjectId?: string;

  chains?: Chain[];
  connectors?: WalletProps[];
}

export const defaultWagmiConfig = (params: DefaultWagmiConfig) => {
  const {
    appName = 'WalletKit',
    appIcon,
    appDescription,
    appUrl,
    walletConnectProjectId = WALLET_CONNECT_PROJECT_ID,
    chains = [mainnet],
    connectors: customizedWallets,
    client,
    ...restProps
  } = params;

  const transports: CreateConfigParameters['transports'] =
    params?.transports ?? Object.fromEntries(chains.map((chain) => [chain.id, http()]));

  const wallets = customizedWallets ?? getDefaultWallets();
  setGlobalData({
    appName,
    walletConnectProjectId,
    appIcon,
    appDescription,
    appUrl,
    wallets,
  });

  const fns = getCreateConnectorFns(wallets);

  const config = createConfig({
    ...restProps,
    chains,
    connectors: fns,
    transports,
  } as CreateConfigParameters<any, any>);

  return config;
};

function getCreateConnectorFns(wallets: WalletProps[]) {
  const fns = wallets.map((w) => {
    const fn = w.getCreateConnectorFn();

    // If we disable a wallet but still let it show up in the list,
    // we should clear the cache to prevent `autoConnect` from automatically connecting to the wallet.
    if (w.isDisabled && typeof window !== 'undefined') {
      localStorage.removeItem(`wagmi.${w.id}.shimDisconnect`);
    }

    return fn;
  });

  createSingletonWalletConnect(wallets, fns);

  return fns;
}

// !!! notice
// Try to keep only one walletConnect connector in a project
// or multiple walletConnect connectors may lead some competition issues.
function createSingletonWalletConnect(wallets: WalletProps[], fns: CreateConnectorFn[]) {
  if (wallets.find((w) => isWalletConnectConnector({ id: w.id } as Connector))) {
    return;
  }

  const fn = walletConnect().getCreateConnectorFn();
  fns.push(fn);
}
