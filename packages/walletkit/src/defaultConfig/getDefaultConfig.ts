import {
  ChainProviderFn,
  Connector,
  PublicClient,
  WebSocketPublicClient,
  configureChains,
} from 'wagmi';
import { Chain, mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { WalletProps } from '../wallets/types';
import { WALLET_CONNECT_PROJECT_ID } from '../constants/common';
import { setGlobalData } from '../globalData';
import { getDefaultWallets } from './getDefaultWallets';

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

export interface ConnectWalletClientProps {
  autoConnect?: boolean;
  connectors?: Connector[];
  publicClient: PublicClient;
  webSocketPublicClient?: WebSocketPublicClient;
}

const defaultChains = [mainnet];

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
    walletConnectDefaultOptions: {
      walletConnectProjectId,
      appName,
      appIcon,
      appDescription,
      appUrl,
    },
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

  return {
    autoConnect,
    connectors: configuredConnectors,
    publicClient: publicClient ?? configuredPublicClient,
    webSocketPublicClient: enableWebSocketPublicClient // Removed by default, breaks if used in Next.js – "unhandledRejection: Error: could not detect network"
      ? webSocketPublicClient ?? configuredWebSocketPublicClient
      : undefined,
  };
};

function createConnectors(input: WalletProps[], chains: Chain[]) {
  const connectors = input.map((w) => {
    const c = w.createConnector(chains);
    c._wallet = w;
    return c;
  });
  return connectors;
}
