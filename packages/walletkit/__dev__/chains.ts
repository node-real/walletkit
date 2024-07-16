import { bsc, bscTestnet, mainnet, opBNB } from 'wagmi/chains';

export const chains = [
  {
    id: 1017,
    name: 'BNB Greenfield',
    nativeCurrency: {
      name: 'tBNB',
      symbol: 'tBNB',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [`https://greenfield-chain-us.bnbchain.org`],
      },
      public: {
        http: [`https://greenfield-chain-us.bnbchain.org`],
      },
    },
    blockExplorers: {
      etherscan: { name: 'Greenfield Scan', url: `https://greenfieldscan.com` },
      default: { name: 'Greenfield Scan', url: `https://greenfieldscan.com` },
    },
  },
  opBNB,
  bscTestnet,
  bsc,
  mainnet,
];
