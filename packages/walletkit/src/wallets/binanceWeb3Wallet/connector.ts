import { sleep } from '@/utils/common';
import { Chain, WindowProvider } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { BINANCE_WEB3_WALLET_ID, BINANCE_WEB3_WALLET_NAME } from '.';
import { isMobile } from '@/base/utils/mobile';

export type BinanceWeb3WalletConnectorOptions = Required<
  ConstructorParameters<typeof InjectedConnector>
>[0]['options'];

export interface CustomConstructorParams {
  chains?: Chain[];
  options?: BinanceWeb3WalletConnectorOptions;
}

export class BinanceWeb3WalletConnector extends InjectedConnector {
  public id = BINANCE_WEB3_WALLET_ID;
  protected shimDisconnectKey = `${this.id}.shimDisconnect`;

  constructor(props: CustomConstructorParams) {
    const { chains, options: _options } = props ?? {};

    const options = {
      name: BINANCE_WEB3_WALLET_NAME,
      shimDisconnect: true,
      getProvider,
      ..._options,
    };

    if (typeof window !== 'undefined') {
      (window.ethereum as any)?.enable?.();
    }

    super({
      chains,
      options,
    });
  }

  public async getProvider(): Promise<WindowProvider | undefined> {
    await sleep();
    return this.options.getProvider();
  }
}

function getProvider() {
  if (typeof window === 'undefined') return;

  if (isMobile()) {
    return window.ethereum;
  }
}
