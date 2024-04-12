import { ChainProviderFn, Connector, configureChains } from 'wagmi';
import { Chain, mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { WalletProps } from '../wallets/types';
import { WALLET_CONNECT_PROJECT_ID } from '../constants/common';
import { setGlobalData } from '../globalData';
import { getDefaultWallets } from './getDefaultWallets';
import { isWalletConnectConnector, walletConnect } from '@/wallets';

export interface DefaultConfigProps {
  appName: string;
  appIcon?: string;
  appDescription?: string;
  appUrl?: string;

  /* WC 2.0 requires a project ID (get one here: https://cloud.walletconnect.com/sign-in) */
  walletConnectProjectId?: string;
  alchemyId?: string;
  infuraId?: string;

  chains?: Chain[];
  connectors?: WalletProps[];

  autoConnect?: boolean;
  publicClient?: any;
  webSocketPublicClient?: any;
  enableWebSocketPublicClient?: boolean;
  stallTimeout?: number;
}

const defaultChains: Chain[] = [mainnet];

export const getDefaultConfig = (props: DefaultConfigProps) => {
  const {
    appName = 'WalletKit',
    appIcon,
    appDescription,
    appUrl,

    walletConnectProjectId = WALLET_CONNECT_PROJECT_ID,
    alchemyId,
    infuraId,

    chains = defaultChains,
    connectors: customizedWallets,

    autoConnect = true,
    publicClient,
    webSocketPublicClient,
    enableWebSocketPublicClient,
    stallTimeout,
  } = props;

  setGlobalData({
    appName,
    walletConnectProjectId,
    appIcon,
    appDescription,
    appUrl,
  });

  const providers: ChainProviderFn[] = [];
  if (alchemyId) {
    providers.push(alchemyProvider({ apiKey: alchemyId }));
  }

  if (infuraId) {
    providers.push(infuraProvider({ apiKey: infuraId }));
  }

  providers.push(
    jsonRpcProvider({
      rpc: (c) => {
        return { http: c.rpcUrls.default.http[0] };
      },
    }),
  );

  providers.push(publicProvider());

  const {
    publicClient: configuredPublicClient,
    chains: configuredChains,
    webSocketPublicClient: configuredWebSocketPublicClient,
  } = configureChains(chains, providers, { stallTimeout });

  const wallets = customizedWallets ?? getDefaultWallets();
  const configuredConnectors = createConnectors(wallets, configuredChains);

  createGlobalWalletConnect(configuredConnectors, configuredChains);

  return {
    autoConnect,
    connectors: configuredConnectors,
    publicClient: publicClient ?? configuredPublicClient,
    webSocketPublicClient: enableWebSocketPublicClient // Removed by default, breaks if used in Next.js – "unhandledRejection: Error: could not detect network"
      ? webSocketPublicClient ?? configuredWebSocketPublicClient
      : undefined,
  };
};

function createConnectors(wallets: WalletProps[], chains: Chain[]) {
  const connectors = wallets.map((w) => {
    const c = w.createConnector(chains);
    c._wallet = w;

    // If we disable a wallet but still let it show up in the list,
    // we should clear the cache to prevent `autoConnect` from automatically connecting to the wallet.
    if (w.isDisabled && typeof window !== 'undefined') {
      localStorage.removeItem(`wagmi.${w.id}.shimDisconnect`);
    }

    return c;
  });
  return connectors;
}

// !!! notice
// Try to keep only one walletConnect connector in a project
// or multiple walletConnect connectors may lead some competition issues.
function createGlobalWalletConnect(connectors: Connector[], chains: Chain[]) {
  let wc = connectors.find((c) => isWalletConnectConnector(c));
  if (!wc) {
    // for hiding in the wallet list, there is no need to mount the `_wallet`
    wc = walletConnect().createConnector(chains);
    connectors.push(wc);
  }

  setGlobalData({
    walletConnectConnector: wc,
  });
}
