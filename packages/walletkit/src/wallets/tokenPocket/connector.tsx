import { Chain } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { TOKEN_POCKET_ID } from '.';

export type TokenPocketConnectorOptions = {
  shimDisconnect?: boolean;
};

export class TokenPocketConnector extends InjectedConnector {
  readonly id: any = TOKEN_POCKET_ID;
  protected shimDisconnectKey = `${this.id}.shimDisconnect`;

  constructor({
    chains,
    options: _options,
  }: {
    chains?: Chain[];
    options?: TokenPocketConnectorOptions;
  } = {}) {
    const options = {
      name: 'Token Pocket',
      shimDisconnect: true,
      getProvider: getTokenPocketProvider,
      ..._options,
    };

    super({
      chains,
      options,
    });
  }
}

function getTokenPocketProvider() {
  if (typeof window === 'undefined') return;

  if (window?.ethereum?.isTokenPocket) {
    return window.ethereum;
  }

  return window?.tokenpocket;
}
