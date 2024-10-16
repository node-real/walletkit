import { http, createConfig, CreateConnectorFn, type CreateConfigParameters } from 'wagmi';
import { Chain, mainnet } from 'wagmi/chains';
import { coinbaseWallet, EvmWallet, isWalletConnect, metaMask, walletConnect } from '@/evm/wallets';
import { Metadata } from '@/core/providers/WalletKitProvider/context';
import { setEvmGlobalData } from '../globalData';

interface CustomizedEvmConfig
  extends Omit<CreateConfigParameters, 'chains' | 'connectors' | 'multiInjectedProviderDiscovery'> {
  autoConnect?: boolean;
  metadata?: Metadata;
  walletConnectProjectId: string;
  initialChainId?: number;
  wallets: EvmWallet[];
  chains?: Chain[];
}

export type EvmConfig = ReturnType<typeof defaultEvmConfig>;

export function defaultEvmConfig(params: CustomizedEvmConfig) {
  const {
    autoConnect = false,
    metadata = { name: 'WalletKit' },
    walletConnectProjectId,
    initialChainId,
    wallets,
    chains = [mainnet],

    client,
    ...restProps
  } = params;

  setEvmGlobalData({
    metadata,
    walletConnectProjectId,
  });

  const transports: CreateConfigParameters['transports'] =
    params?.transports ?? Object.fromEntries(chains.map((chain) => [chain.id, http()]));

  const fns = getCreateConnectorFns(wallets);

  const wagmiConfig = createConfig({
    multiInjectedProviderDiscovery: false,
    ...restProps,
    chains,
    connectors: fns,
    transports,
  } as CreateConfigParameters<any, any>);

  // Manually modify the connector id:
  // 1. `metaMaskSDK` -> `metaMask`
  // 2. `coinbaseWalletSDK` -> `coinbaseWallet`
  wagmiConfig.connectors.forEach((connector) => {
    if (connector.id === 'metaMaskSDK') {
      (connector as any).id = metaMask().id;
    }
    if (connector.id === 'coinbaseWalletSDK') {
      (connector as any).id = coinbaseWallet().id;
    }
  });

  return {
    autoConnect,
    metadata,
    walletConnectProjectId,
    initialChainId,
    wallets,
    chains,
    wagmiConfig,
  };
}

function getCreateConnectorFns(wallets: EvmWallet[]) {
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
function createSingletonWalletConnect(wallets: EvmWallet[], fns: CreateConnectorFn[]) {
  if (wallets.find((w) => isWalletConnect(w.id))) {
    return;
  }

  const fn = walletConnect().getCreateConnectorFn();
  fns.push(fn);
}
