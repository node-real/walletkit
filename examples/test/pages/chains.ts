import { bsc, mainnet } from 'wagmi/chains';

export const chains = [
  {
    id: 5600,
    name: 'Greenfield Mekong Testnet',
    network: 'Greenfield Mekong Testnet',
    nativeCurrency: {
      name: 'tBNB',
      symbol: 'tBNB',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [`https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org`],
      },
      public: {
        http: [`https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org`],
      },
    },
    blockExplorers: {
      etherscan: { name: 'Greenfield Mekong Testnet Scan', url: `https://greenfieldscan.com` },
      default: { name: 'Greenfield Mekong Testnet Scan', url: `https://greenfieldscan.com` },
    },
  },
  {
    id: 97,
    name: 'BNB Smart Chain Testnet',
    network: 'BNB Smart Chain Testnet',
    nativeCurrency: {
      name: 'tBNB',
      symbol: 'tBNB',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [`https://data-seed-prebsc-1-s1.binance.org:8545`],
      },
      public: {
        http: [`https://data-seed-prebsc-1-s1.binance.org:8545`],
      },
    },
    blockExplorers: {
      etherscan: { name: 'BNB Smart Chain Testnet Scan', url: `https://testnet.bscscan.com` },
      default: { name: 'BNB Smart Chain Testnet Scan', url: `https://testnet.bscscan.com` },
    },
  },
  bsc,
  mainnet,
];
