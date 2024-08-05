import './style.css';
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
