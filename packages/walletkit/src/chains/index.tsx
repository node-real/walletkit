import { BscIcon } from './icons/BscIcon';
import { ComboIcon } from './icons/ComboIcon';

const chainsConfig = [
  {
    id: 56,
    name: 'BSC',
    logo: <BscIcon />,
  },
  {
    id: 97,
    name: 'BSC Testnet',
    logo: <BscIcon />,
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
