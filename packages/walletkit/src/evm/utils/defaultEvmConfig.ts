import { http, createConfig, CreateConnectorFn, type CreateConfigParameters } from 'wagmi';
import { Chain, mainnet } from 'wagmi/chains';
import {
  binanceWallet,
  coinbaseWallet,
  EvmWallet,
  EvmWalletBehavior,
  isWalletConnect,
  metaMask,
  walletConnect,
} from '@/evm/wallets';
import { Metadata } from '@/core/providers/WalletKitProvider/context';
import { setEvmGlobalData } from '../globalData';
import { codexFieldWallet } from '../wallets/codexFieldWallet';
import { ChainDisplayConfig } from '@/evm/chains/types';
import { getChainDisplayConfigs } from '../chains';
import { getWalletBehaviorOnPlatform } from '@/core/utils/common';

interface CustomizedEvmConfig
  extends Omit<CreateConfigParameters, 'chains' | 'connectors' | 'multiInjectedProviderDiscovery'> {
  autoConnect?: boolean;
  metadata?: Metadata;
  walletConnectProjectId: string;
  initialChainId?: number;
  wallets: EvmWallet[];
  chains?: Chain[];
  chainDisplayConfigs?: ChainDisplayConfig[];
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
    chainDisplayConfigs = getChainDisplayConfigs(),

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
    if (connector.id === 'codex-field-wallet') {
      (connector as any).id = codexFieldWallet().id;
    }
    if (connector.id === 'wallet.binance.com') {
      (connector as any).id = binanceWallet().id;
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
    chainDisplayConfigs,
  };
}

function getCreateConnectorFns(wallets: EvmWallet[]) {
  const fns = wallets
    .map((w) => {
      // If we disable a wallet but still let it show up in the list,
      // we should clear the cache to prevent `autoConnect` from automatically connecting to the wallet.
      if (w.isDisabled && typeof window !== 'undefined') {
        localStorage.removeItem(`wagmi.${w.id}.shimDisconnect`);
      }

      const behavior = getWalletBehaviorOnPlatform<EvmWalletBehavior>(w);
      if (behavior?.getCreateConnectorFn) {
        return behavior.getCreateConnectorFn();
      }
    })
    .filter((e) => !!e);

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

  const fn = walletConnect().behaviors?.[0]?.getCreateConnectorFn?.();
  if (fn) {
    fns.push(fn);
  }
}
