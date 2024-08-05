import { Chain } from 'viem';
import { WalletKitOptions } from '../components/WalletKitProvider/context';
import { chainsConfig } from '../chains';
import { mergeList } from '@/ui/utils/common';
import { UnknownChainIcon } from '@/ui/components/icons/chains';

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
