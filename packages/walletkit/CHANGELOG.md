# @totejs/walletkit

## 0.2.6-alpha.3

### Patch Changes

- 57d9f7f: Add `action` prop to WalletKitButton & WalletKitButton.Custom to support the case of
  adding network.

## 0.2.6-alpha.2

### Patch Changes

- Fixed TrustWallet will automatically reconnect after reloading the page.
- 204e807: refactor: update the `installed` field that detect whether wallet is installed to a
  function
- 26d87fb: Fixed multiple wallets conficts resulting in undetectable issues.
- c47f3a6: Fixed conflict issue between trustwallet and metaMask.

## 0.2.6-alpha.1

### Patch Changes

- 80e356d: Fixed trustwallet losing account status after refreshing

## 0.2.6-alpha.0

### Patch Changes

- 3dd2578: Fixed `WalletConnect` automatic connection issue in the follow scenario: connect the
  WalletConnect -> close browser -> reopen browser -> disconnect -> select WalletConnect, will
  automatically connect.

## 0.2.4

### Patch Changes

- 0fa8683: Add walletConnect recommanded wallets.
