# WalletKit Contribution Guide

Thanks for your interest in contributing to WalletKit! Please take a moment to review this document
before submitting a pull request.

## Prerequisites

This project relies on [nodejs](https://nodejs.org/en), and uses [`pnpm`](https://pnpm.io) as a
package manager, make sure you have them installed:

- [node.js](https://nodejs.org/en/) v16 or higher
- [npm](https://pnpm.io) v8 or higher

Then simply clone the repository and enter the directory:

```sh
git clone https://github.com/node-real/walletkit.git
git cd walletkit
```

## Development environment

Install the dependencies and start the local development environment：

```sh
pnpm install
pnpm dev
```

In default, this will run the [test example](./examples/test/), you can use this example for
development and debugging. Any changes in `packages/walletkit` will trigger a refresh.

## Coding standards

We use `eslint` and our code formatting rules are defined in [.eslintrc.cjs](./.eslintrc.cjs), you
can check your code by running:

```sh
pnpm lint
```

Besides, before committing, git hook will automatically run eslint to check and fix errors.

## Tests

Any changes need a test, please make sure all your changes are tested before committing.

## Reporting a bug

Just submit an issue though [github issue page](https://github.com/node-real/walletkit/issues).

## Adding a new wallet

Before adding a new wallet, you need to collect some information:

| item               | description                                                                                         | e.g.                                | required |
| ------------------ | --------------------------------------------------------------------------------------------------- | ----------------------------------- | -------- |
| wallet name        | -                                                                                                   | Trust Wallet                        | yes      |
| short name         | If display space is insufficient, the short name will be displayed.                                 | Trust                               | optional |
| wallet logo        | logo in svg format.                                                                                 | -                                   | yes      |
| download url       | -                                                                                                   | https://trustwallet.com/download    | yes      |
| deeplink           | After clicking deeplink in the system browser, we can directly open dapp in the app's dapp browser. | trust://open_url?coin_id=60&url=xxx | yes      |
| WalletConnect link | If your app supports WalletConnect, please provides the WalletConnect uri.                          | trust://wc?uri=xxx                  | optional |

Then you can add it to project by following steps:

1. Create a new folder named with wallet name to the `src/wallets` directory, e.g. trustWallet
2. Create an icon file `icon.tsx`:

```tsx
export const TrustWalletLightIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52">
      ...
    </svg>
  )
```

3. Create wallet configuration file `index.tsx`:

```tsx
import { Chain } from 'wagmi';

import {
  TrustWalletDarkIcon,
  TrustWalletLightIcon,
  TrustWalletMobileDarkIcon,
  TrustWalletMobileLightIcon,
} from './icon';
import { PartialWalletProps, WalletProps } from '../types';
import { TrustWalletConnector, TrustWalletConnectorOptions } from '../trustWallet/connector';
import { hasInjectedProvider } from '../utils';

export const TRUST_WALLET_ID = 'trust';

export interface TrustWalletProps extends PartialWalletProps {
  connectorOptions?: TrustWalletConnectorOptions;
}

export function trustWallet(props: TrustWalletProps = {}): WalletProps {
  const { connectorOptions, ...restProps } = props;

  return {
    id: TRUST_WALLET_ID,
    name: 'Trust Wallet',
    logos: {
      default: {
        light: <TrustWalletLightIcon />,
        dark: <TrustWalletDarkIcon />,
      },
      mobile: {
        light: <TrustWalletMobileLightIcon />,
        dark: <TrustWalletMobileDarkIcon />,
      },
    },
    downloadUrls: {
      default: 'https://trustwallet.com/',
    },
    spinnerColor: '#1098FC',
    installed: isTrustWallet(),
    createConnector: (chains: Chain[]) => {
      return new TrustWalletConnector({
        chains,
        options: {
          shimDisconnect: true,
          ...connectorOptions,
        },
      });
    },
    getUri: () => {
      const dappPath = `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(
        window.location.href,
      )}`;
      return dappPath;
    },
    ...restProps,
  };
}

export function isTrustWallet() {
  if (typeof window === 'undefined') return false;

  return !!(
    hasInjectedProvider('isTrust') ||
    window?.trustwallet?.isTrust ||
    window?.trustWallet?.isTrust
  );
}
```

and the configuration type definition as follow, have a look:

```tsx
export interface WalletProps {
  id: string;
  name: string;
  logos: {
    default: ReactElement | { [x in ColorMode]: ReactElement };
    mobile?: ReactElement | { [x in ColorMode]: ReactElement };
  };
  downloadUrls: {
    default: string | undefined;
  };
  spinnerColor?: string;
  installed: boolean | undefined;
  createConnector: (chains: Chain[]) => Connector;
  getUri: () => string | undefined;
}
```

4. Export the new wallet in `src/wallets/index.ts`

```tsx
export * from './trustWallet';
```

5. Open `examples/test/pages/_app.tsx` to test the new wallet

```tsx
import {
  trustWallet, // import new wallet
  metaMask,
  walletConnect,
} from '@totejs/walletkit/wallets';
import { useState } from 'react';

const config = createConfig(
  getDefaultConfig({
    autoConnect: false,
    appName: 'WalletKit',

    // WalletConnect 2.0 requires a projectId which you can create quickly
    // and easily for free over at WalletConnect Cloud https://cloud.walletconnect.com/sign-in
    walletConnectProjectId: 'xxx',

    chains,
    connectors: [
      trustWallet(), // Add to wallet list
      metaMask(),
      walletConnect(),
    ],
  }),
);
```

## Release notes

A complete development workflow like following:

1. Create a new branch out of `main` branch
2. Make some changes, fix bugs or add new features
3. Run `pnpm changeset` to create a new changeset
4. Commit the code, code review is required, after code review, we can merge the code to `main`
   branch
5. Then [github action](https://github.com/node-real/walletkit/actions) will automatically execute
   and create a new [release PR](https://github.com/node-real/walletkit/pulls), merge this PR, a new
   version will be released
