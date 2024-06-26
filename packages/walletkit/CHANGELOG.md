# @node-real/walletkit

## 1.1.2

### Patch Changes

- 4725a51: Add `openModalOnWrongNetwork` option to customize whether display SwitchNetworkModal if
  on the wrong network

## 1.1.1

### Patch Changes

- b11c309: Fixed binance web3 wallet disconnect after refresh page.
- b11c309: Remove unused code

## 1.0.13-alpha.0

### Patch Changes

- 237726b: Fixed binance web3 wallet disconnect after refresh page.
- 8b9e4fe: Remove unused code

## 1.0.12

### Patch Changes

- f81777b: Support embedding modal into page.
- f81777b: Fixed ssr issue

## 1.0.12-alpha.1

### Patch Changes

- 3a9e8f0: Fixed ssr issue

## 1.0.12-alpha.0

### Patch Changes

- 2e73c6b: Support embedding modal into page.

## 1.0.11

### Patch Changes

- 3279ead: Add a new wallet option `render` to support customize the content of each option.
- 3279ead: feat: Add `isDisabled` option to wallet.

## 1.0.11-alpha.0

### Patch Changes

- 06ecbd6: Add a new wallet option `render` to support customize the content of each option.
- 06ecbd6: feat: Add `isDisabled` option to wallet.

## 1.0.10

### Patch Changes

- 792d346: Fixed automatic disconnection issue caused by WalletConnect.
- 792d346: Update docs
- 792d346: Support binance web3 wallet on mobile
- 792d346: Add bitget wallet
- 792d346: Add upgrade tips for binance web3 wallet.

## 1.0.10-alpha.3

### Patch Changes

- 83d9533: Add upgrade tips for binance web3 wallet.

## 1.0.10-alpha.2

### Patch Changes

- d24d147: Fixed automatic disconnection issue caused by WalletConnect.
- d24d147: Update docs

## 1.0.10-alpha.1

### Patch Changes

- d86926f: Add bitget wallet

## 1.0.10-alpha.0

### Patch Changes

- 991d126: Support binance web3 wallet on mobile

## 1.0.9

### Patch Changes

- 65c4817: Modify walletkit scope.

## 1.0.9-alpha.4

### Patch Changes

- e06d4b3: refactor: Add env variables.

## 1.0.9-alpha.3

### Patch Changes

- a9a34af: Add particle wallet

## 1.0.9-alpha.2

### Patch Changes

- a6de228: Add `closeModalAfterSwitchingNetwork`.

## 1.0.9-alpha.1

### Patch Changes

- f3ebc1b: Setting `reloadOnDisconnect` = false in default for CoinbaseWallet.

## 1.0.9-alpha.0

### Patch Changes

- 53b65ec: Fixed switching network failure in coinbaseWallet.

## 1.0.8

### Patch Changes

- ebae213: Fixed modal flickering issue in grid layout.

## 1.0.7

### Patch Changes

- 084a397: Fixed theme configuration naming error issue
- 084a397: Fixed TrustWallet will automatically reconnect after reloading the page.
- 084a397: refactor: update the `installed` field that detect whether wallet is installed to a
  function
- 084a397: Fixed multiple wallets conficts resulting in undetectable issues.
- 084a397: Fixed `WalletConnect` automatic connection issue in the follow scenario: connect the
  WalletConnect -> close browser -> reopen browser -> disconnect -> select WalletConnect, will
  automatically connect.
- 084a397: Fixed trustwallet losing account status after refreshing
- 084a397: Fixed conflict issue between trustwallet and metaMask.
- 084a397: Add `action` prop to WalletKitButton & WalletKitButton.Custom to support the case of
  adding network.

## 1.0.7-alpha.6

### Patch Changes

- c431545: Add `action` prop to WalletKitButton & WalletKitButton.Custom to support the case of
  adding network.

## 1.0.7-alpha.5

### Patch Changes

- f851750: Fixed TrustWallet will automatically reconnect after reloading the page.

## 1.0.7-alpha.4

### Patch Changes

- 78c9fc8: Fixed multiple wallets conficts resulting in undetectable issues.

## 1.0.7-alpha.3

### Patch Changes

- e418a56: Update the `installed` field that detect whether wallet is installed to a function
- e418a56: Fixed conflict issue between trustwallet and metaMask.

## 1.0.7-alpha.2

### Patch Changes

- 52e9976: Fixed trustwallet losing account status after refreshing

## 1.0.7-alpha.1

### Patch Changes

- 3dd2578: Fixed `WalletConnect` automatic connection issue in the follow scenario: connect the
  WalletConnect -> close browser -> reopen browser -> disconnect -> select WalletConnect, will
  automatically connect.

## 1.0.6

### Patch Changes

- 9fd73b8:
  - Add chains type declaration for `dev example`
- 9fd73b8:
  - Fixed typescript declaration files export path error, remove `dev` from tsconfig.json includes
    field

## 1.0.5

### Patch Changes

- 12ebee8:

  - Add Binance Web3 Wallet & Coinbase Wallet & OKX Wallet & MathWallet support.

  - Add showQRCode & getQRCodeUri configuration items to support display a QR code when a wallet is
    not installed.

  - UI adapted to mobile end and multiple wallets.

  - Fixed the hover effect did not disappear after clicking button on the mobile end.

  - Fixed walletConnect popup and QR code display being very slow issue.

  - Disabled page scrolling when opening walletkit modal.

  - For a smoother development experience, remove `examples/test` and create a dev demo in
    `packages/walletkit`.

  - Update walletConnect `relayUrl` to `wss://relay.walletconnect.org`.

- 4a88b07:
  - Remove default `initialChainId` to support the case only connecting a wallet and not switching a
    network.
