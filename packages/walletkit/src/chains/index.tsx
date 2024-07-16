import { BscIcon } from './icons/BscIcon';
import { ComboIcon } from './icons/ComboIcon';
import { EthereumIcon } from './icons/EthereumIcon';
import { ChainProps } from './types';

export const chainsConfig: ChainProps[] = [
  {
    id: 1,
    name: 'Ethereum',
    logo: <EthereumIcon width={24} height={24} />,
  },
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
    logo: <ComboIcon width={24} height={24} />,
  },
  {
    id: 204,
    name: 'opBNB',
    logo: <BscIcon width={24} height={24} />,
  },
  {
    id: 1017,
    name: 'BNB Greenfield',
    logo: <BscIcon width={24} height={24} />,
  },
  {
    id: 5600,
    name: 'BNB Greenfield Testnet',
    logo: <BscIcon width={24} height={24} />,
  },
  {
    id: 9000,
    name: 'BNB Greenfield Devnet',
    logo: <BscIcon width={24} height={24} />,
  },
];
