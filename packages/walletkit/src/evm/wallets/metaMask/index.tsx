import { metaMaskConfig } from '@/core/configs/metaMask';
import { hasEvmInjectedProvider } from '../../utils/getEvmInjectedProvider';
import { EvmWallet } from '../types';
import { MetaMaskParameters, metaMask as metaMaskSDk } from 'wagmi/connectors';
import { openLink } from '@/core/utils/common';

export interface MetaMaskOptions extends Partial<EvmWallet> {
  connectorOptions?: MetaMaskParameters;
}

export function metaMask(props: MetaMaskOptions = {}): EvmWallet {
  const { connectorOptions, ...restProps } = props;

  const getCreateConnectorFn = () => {
    return metaMaskSDk({
      useDeeplink: false,
      headless: true,
      openDeeplink(arg) {
        openLink(arg);
      },
      ...connectorOptions,
    });
  };

  return {
    ...metaMaskConfig,
    id: 'metaMask',
    walletType: 'evm',
    behaviors: [
      // {
      //   platforms: ['tg-android', 'tg-ios'],
      //   connectType: 'uri',
      //   getCreateConnectorFn,
      // },
      // {
      //   platforms: ['tg-pc'],
      //   connectType: 'qrcode',
      //   getCreateConnectorFn,
      // },
      {
        platforms: ['browser-android', 'browser-ios', 'browser-pc'],
        connectType: 'default',
        isInstalled() {
          return hasEvmInjectedProvider('isMetaMask');
        },
        getAppLink() {
          const dappPath = window.location.href.replace(/^https?:\/\//, '');
          return `https://metamask.app.link/dapp/${dappPath}`;
        },
        getCreateConnectorFn,
      },
    ],
    ...restProps,
  };
}
