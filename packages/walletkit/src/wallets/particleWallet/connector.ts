import { PARTICLE_WALLET_ID } from '.';
import { ParticleProvider } from '@particle-network/provider';
import type { AuthType } from '@particle-network/auth';
import {
  Chain,
  ChainNotConfiguredError,
  Connector,
  ConnectorNotFoundError,
  WalletClient,
} from 'wagmi';
import {
  ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
  createWalletClient,
  custom,
  getAddress,
  numberToHex,
} from 'viem';

type ParticleAuth = ConstructorParameters<typeof ParticleProvider>[0];

export type ParticleConnectorOptions = {
  shimDisconnect?: boolean;
  auth?: ParticleAuth;
  authType?: AuthType;
};

export class ParticleConnector extends Connector<ParticleProvider, ParticleConnectorOptions> {
  readonly id: string = PARTICLE_WALLET_ID;
  readonly name: string = 'Particle';
  readonly ready: boolean;

  protected shimDisconnectKey = `${this.id}.shimDisconnect`;
  private provider?: ParticleProvider;

  constructor({
    chains,
    options: _options,
  }: {
    chains?: Chain[];
    options?: ParticleConnectorOptions;
  } = {}) {
    const options = {
      name: 'Particle',
      shimDisconnect: true,
      ..._options,
    };

    super({
      chains,
      options,
    });

    this.name = options.name ?? this.name;
    this.ready = true;

    this.onAccountsChanged = this.onAccountsChanged.bind(this);
    this.onChainChanged = this.onChainChanged.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
  }

  async connect({ chainId }: { chainId?: number } = {}) {
    if (!this.options.auth) {
      throw new Error('Please init Particle first');
    }

    try {
      const provider = await this.getProvider();
      if (!provider) throw new ConnectorNotFoundError();

      provider.on('accountsChanged', this.onAccountsChanged);
      provider.on('chainChanged', this.onChainChanged);
      provider.on('disconnect', this.onDisconnect);

      this.emit('message', { type: 'connecting' });

      if (!this.options.auth.isLogin()) {
        await this.options.auth.login({
          preferredAuthType: this.options.authType,
        });
      }

      let id = await this.getChainId();
      let unsupported = this.isChainUnsupported(id);
      if (chainId && id !== chainId) {
        const chain = await this.switchChain(chainId);
        id = chain.id;
        unsupported = this.isChainUnsupported(id);
      }

      const account = await this.getAccount();
      return {
        account,
        chain: { id, unsupported },
      };
    } catch (error) {
      if ((error as ProviderRpcError).code === 4001) {
        throw new UserRejectedRequestError(error as Error);
      }
      throw error;
    }
  }

  async disconnect() {
    const provider = await this.getProvider();
    await provider.disconnect();

    provider.removeListener('accountsChanged', this.onAccountsChanged);
    provider.removeListener('chainChanged', this.onChainChanged);
    provider.removeListener('disconnect', this.onDisconnect);
  }

  async getAccount() {
    const provider = await this.getProvider();
    const accounts = await provider.request({ method: 'eth_accounts' });
    return getAddress(accounts[0]);
  }

  async getChainId() {
    const provider = await this.getProvider();
    const chainId = await provider.request({ method: 'eth_chainId' });
    return Number(chainId);
  }

  async getProvider() {
    if (!this.options.auth) {
      throw new Error('Please init Particle first');
    }
    if (!this.provider) {
      this.provider = new ParticleProvider(this.options.auth);
    }
    return this.provider;
  }

  async getWalletClient({ chainId }: { chainId?: number } = {}) {
    const [provider, account] = await Promise.all([this.getProvider(), this.getAccount()]);
    const chain = this.chains.find((x) => x.id === chainId);

    if (!provider) throw new Error('provider is required.');

    return createWalletClient({
      account,
      chain,
      transport: custom(provider),
    }) as WalletClient;
  }

  async isAuthorized() {
    if (!this.options.auth) {
      throw new Error('Please init Particle first');
    }
    return this.options.auth.isLogin() && this.options.auth.walletExist();
  }

  async switchChain(chainId: number) {
    const provider = await this.getProvider();
    if (!provider) throw new ConnectorNotFoundError();
    const id = numberToHex(chainId);

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id }],
      });

      return (
        this.chains.find((x) => x.id === chainId) ?? {
          id: chainId,
          name: `Chain ${id}`,
          network: `${id}`,
          nativeCurrency: { name: 'Ether', decimals: 18, symbol: 'ETH' },
          rpcUrls: { default: { http: [''] }, public: { http: [''] } },
        }
      );
    } catch (error) {
      const chain = this.chains.find((x) => x.id === chainId);
      if (!chain) {
        throw new ChainNotConfiguredError({ chainId, connectorId: this.id });
      }
      throw new SwitchChainError(error as Error);
    }
  }

  protected onAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      this.emit('disconnect');
    } else {
      this.emit('change', { account: getAddress(accounts[0]) });
    }
  }

  protected onChainChanged(chainId: number | string) {
    const id = Number(chainId);
    const unsupported = this.isChainUnsupported(id);
    this.emit('change', { chain: { id, unsupported } });
  }

  protected onDisconnect() {
    this.emit('disconnect');
  }
}
