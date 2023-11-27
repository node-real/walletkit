import { PartialWalletProps, WalletProps } from '../types';
import { CustomConnectorOptions } from './connector';

export interface PartialCustomProps extends PartialWalletProps {
  connectorOptions?: CustomConnectorOptions;
}

export interface CustomProps extends WalletProps {
  connectorOptions?: CustomConnectorOptions;
}

export function custom(props: CustomProps): WalletProps {
  const { ...restProps } = props ?? {};

  return {
    ...restProps,
  };
}
