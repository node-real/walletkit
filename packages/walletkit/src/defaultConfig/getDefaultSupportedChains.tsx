import { Chain } from 'wagmi';
import { UnknownChainIcon } from '../chains/icons/UnknownChainIcon';
import { WalletKitOptions } from '../components/WalletKitProvider/context';
import { mergeList } from '../utils/common';
import { getSupportedChains } from '../chains';

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
