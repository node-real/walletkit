import '@node-real/walletkit-wagmi/styles.css';
// import '@node-real/walletkit-solana/styles.css';

import VConsole from 'vconsole';
import { WagmiExample } from './exmaples/WagmiExample';
import { SolanaExample } from './exmaples/SolanaExample';

new VConsole();

export default function App() {
  return (
    <>
      <WagmiExample>
        <SolanaExample />
      </WagmiExample>
    </>
  );
}
