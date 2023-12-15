# @totejs/walletkit

## 0.2.7

### Patch Changes

- 2864f90: Fixed theme configuration naming error issue
- c32a465: Fixed modal flickering issue in grid layout.
- b91e401: Add `action` prop to WalletKitButton & WalletKitButton.Custom to support the case of
  adding network.

## 0.2.6

### Patch Changes

- 2fe18ba: Fixed theme configuration naming error issue
- Fixed TrustWallet will automatically reconnect after reloading the page.
- 204e807: refactor: update the `installed` field that detect whether wallet is installed to a
  function
- 26d87fb: Fixed multiple wallets conficts resulting in undetectable issues.
- 3dd2578: Fixed `WalletConnect` automatic connection issue in the follow scenario: connect the
  WalletConnect -> close browser -> reopen browser -> disconnect -> select WalletConnect, will
  automatically connect.
- 80e356d: Fixed trustwallet losing account status after refreshing
- c47f3a6: Fixed conflict issue between trustwallet and metaMask.
- 57d9f7f: Add `action` prop to WalletKitButton & WalletKitButton.Custom to support the case of
  adding network.

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
