import { BscIcon } from './icons/BscIcon';
import { ComboIcon } from './icons/ComboIcon';

const chainsConfig = [
  {
    id: 56,
    name: 'BSC',
    logo: <BscIcon width={24} height={24} />,
  },
  {
    id: 97,
    name: 'BSC Testnet',
    logo: <BscIcon width={24} height={24} />,
  },
  {
    id: 91715,
    name: 'Combo Testnet',
    logo: <ComboIcon />,
  },
];

export function getSupportedChains() {
  return chainsConfig;
}
