# @totejs/walletkit

## 1.0.7-alpha.1

### Patch Changes

- 1341665: Fixed `WalletConnect` automatic connection issue in the follow scenario: connect the
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
