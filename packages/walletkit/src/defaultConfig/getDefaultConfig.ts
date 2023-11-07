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
import { getWalletById, isMetaMaskConnector } from '../wallets';

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
  connectors?: Array<WalletProps | Connector>;

  autoConnect?: boolean;
  provider?: any;
  webSocketProvider?: any;
  enableWebSocketProvider?: boolean;
  stallTimeout?: number;
}

export interface ConnectWalletClientProps {
  autoConnect?: boolean;
  connectors?: Connector[];
  provider: any;
  webSocketProvider?: any;
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
    provider,
    webSocketProvider,
    enableWebSocketProvider,
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
    providers.push(alchemyProvider({ apiKey: alchemyId, stallTimeout }));
  }

  if (infuraId) {
    providers.push(infuraProvider({ apiKey: infuraId, stallTimeout }));
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
    provider: configuredProvider,
    chains: configuredChains,
    webSocketProvider: configuredWebSocketProvider,
  } = configureChains(chains, providers, { stallTimeout });

  const wallets = customizedWallets ?? getDefaultWallets();
  const configuredConnectors = createConnectors(wallets, configuredChains);

  return {
    autoConnect,
    connectors: configuredConnectors,
    provider: provider ?? configuredProvider,
    webSocketProvider: enableWebSocketProvider // Removed by default, breaks if used in Next.js – "unhandledRejection: Error: could not detect network"
      ? webSocketProvider ?? configuredWebSocketProvider
      : undefined,
  };
};

// 1. if item is a connector object, add the `_wallet` field directly
// 2. if item is a wallet config object, calling `createConnector` to get a new connector
//    and keeping the wallet config object to the `_wallet` field
function createConnectors(input: Array<WalletProps | Connector> = [], chains: Chain[]) {
  const connectors = input.map((w: any) => {
    if (w.createConnector) {
      const c = w.createConnector(chains);
      c._wallet = w;
      return withHackHandler(c);
    } else {
      w._wallet = getWalletById(w.id);
      return withHackHandler(w);
    }
  });
  return connectors;
}

// !!!hack
// sometimes provider isn't ready, requests will be pending and no responses,
function withHackHandler(c: Connector) {
  const provider = c?.options?.getProvider?.();

  if (provider && !provider.__hasWrappedRequest && isMetaMaskConnector(c)) {
    provider.__hasWrappedRequest = true;

    const originalReq = provider.request;

    const run = (duration = 0, timerArr: any = [], ...params: any) => {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          originalReq
            .call(provider, ...params)
            .then((res: any) => {
              // recovery
              provider.request = originalReq;
              timerArr.forEach((item: any) => {
                clearTimeout(item);
              });
              resolve(res);
            })
            .catch(reject);
        }, duration);

        timerArr.push(timer);
      });
    };

    provider.request = async function (...params: any) {
      const durationArr = [0, 500, 1000, 1500, 2000, 3000];
      const timerArr: any = [];
      return Promise.race(durationArr.map((t) => run(t, timerArr, ...params)));
    };
  }

  return c;
}
