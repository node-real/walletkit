import { http, createConfig, CreateConnectorFn, type CreateConfigParameters } from 'wagmi';
import { Chain, mainnet } from 'wagmi/chains';
import { EvmWallet, metaMask, safe, trustWallet, walletConnect } from '@/evm/wallets';
import { walletConnectConfig } from '@/core/configs/wallets/walletConnect';

export interface EvmConfig extends Omit<CreateConfigParameters, 'chains' | 'connectors'> {
  chains?: Chain[];
  wallets?: EvmWallet[];
}

export const getEvmConfig = (params: EvmConfig) => {
  const { chains = [mainnet], wallets: customizedWallets, client, ...restProps } = params;

  const transports: CreateConfigParameters['transports'] =
    params?.transports ?? Object.fromEntries(chains.map((chain) => [chain.id, http()]));

  const wallets = customizedWallets ?? getDefaultEvmWallets();

  const fns = getCreateConnectorFns(wallets);

  const config = createConfig({
    ...restProps,
    chains,
    connectors: fns,
    transports,
  } as CreateConfigParameters<any, any>);

  return config;
};

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
  if (wallets.find((w) => w.id === walletConnectConfig.id)) {
    return;
  }

  const fn = walletConnect().getCreateConnectorFn();
  fns.push(fn);
}

function getDefaultEvmWallets() {
  const shouldUseSafeConnector = !(typeof window === 'undefined') && window?.parent !== window;

  let wallets: EvmWallet[] = [];

  // If we're in an iframe, include the SafeConnector
  if (shouldUseSafeConnector) {
    wallets = [...wallets, safe()];
  }

  wallets = [...wallets, trustWallet(), metaMask(), walletConnect()];

  return wallets;
}
