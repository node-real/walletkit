import { Chain } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export type CustomConnectorOptions = Required<
  ConstructorParameters<typeof InjectedConnector>
>[0]['options'];

export interface CustomConstructorParams {
  id: string;
  chains?: Chain[];
  options?: CustomConnectorOptions;
}

export class CustomConnector extends InjectedConnector {
  public id: string;
  public shimDisconnectKey;

  constructor(props: CustomConstructorParams) {
    const { id, chains, options } = props ?? {};

    super({
      chains,
      options,
    });

    this.id = id;
    this.shimDisconnectKey = `${this.id}.shimDisconnect`;
  }

  public async getProvider() {
    return this.options.getProvider();
  }
}
