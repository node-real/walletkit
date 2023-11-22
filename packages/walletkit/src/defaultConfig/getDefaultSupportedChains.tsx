import { getSupportedChains } from '@/chains';
import { UnknownChainIcon } from '@/chains/icons/UnknownChainIcon';
import { mergeList } from '@/utils/common';
import { Chain } from 'wagmi';
import { WalletKitOptions } from '..';

export function getDefaultSupportedChains(options: WalletKitOptions, chains: Chain[]) {
  const chainsConfig = mergeList(getSupportedChains(), options.chainsConfig);

  const appChains = chains.map((item) => {
    const config = chainsConfig.find((c) => c.id === item.id);
    return {
      id: item.id,
      name: item.name ?? config?.name,
      logo: config?.logo ?? <UnknownChainIcon />,
    };
  });

  return appChains;
}
