import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: {
    index: 'src/index.ts',
    'wallets/index': 'src/wallets/index.ts',
  },
  output: {
    dir: 'dist',
  },
  external: ['react', 'react-dom', 'viem', 'wagmi', 'qrcode'],
  plugins: [
    vanillaExtractPlugin(),
    peerDepsExternal(),
    nodeResolve(),
    typescript({
      useTsconfigDeclarationDir: true,
      exclude: 'node_modules/**',
    }),
  ],
};
