import { Chain } from 'viem';
import { WalletKitOptions } from '../components/WalletKitProvider/context';
import { mergeList, UnknownChainIcon } from '@node-real/walletkit-ui';
import { chainsConfig } from '@/chains';

export function getDefaultChainsConfig(
  options: WalletKitOptions,
  chains: readonly [Chain, ...Chain[]],
) {
  const mergedChainsConfig = mergeList(chainsConfig, options.chainsConfig);

  const customizedChains = chains.map((item) => {
    const config = mergedChainsConfig.find((c) => c.id === item.id);
    return {
      id: item.id,
      name: item.name ?? config?.name,
      logo: config?.logo ?? <UnknownChainIcon />,
    };
  });

  return customizedChains;
}