import '@node-real/walletkit-ui/styles.css';

import VConsole from 'vconsole';
import { WagmiExample } from './exmaples/WagmiExample';
import SolanaExample from './exmaples/SolanaExample';

new VConsole();

export default function App() {
  return (
    <>
      <WagmiExample />
      <SolanaExample />
    </>
  );
}
